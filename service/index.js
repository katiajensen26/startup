const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { shelfProxy } = require('./shelfProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

let apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);
        
        const startBookshelf = {
            shelfName: 'My Bookshelf',
            books: [],
            isPublic: true,
        };
        await DB.createOrUpdateBookshelf(user, startBookshelf);

        setAuthCookie(res, user.token);

        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    try {
        const user = await findUser('token', req.cookies['token']);
        if (user) {
            delete user.token;
        }
        res.clearCookie(authCookieName);
        res.status(204).end();
    } catch (Error) {
        res.status(500).send[{Error}];
    }
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies['token']);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

//Gets user-specific bookshelf for authenticated user
apiRouter.get('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const currentBookshelf = await DB.getBookshelfByUser(user);
    res.send(currentBookshelf || { shelfName: '', books: [] });
});

//Stores bookshelf for authenticated user
apiRouter.post('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const currentBookshelf = await updateBookshelf(user, req.body);

    broadcastToShelf(user.shareId, currentBookshelf);
    res.send(currentBookshelf);
});

//deletes book from bookshelf
apiRouter.delete('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies['token']);
    const currentBookshelf = await deleteFromBookshelf(user, req.body);

    broadcastToShelf(user.shareId, currentBookshelf);
    
    res.send(currentBookshelf);
})

apiRouter.put('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (!user) {
        res.status(401).send({ msg: 'unauthorized'});
    }
    

    const bookshelfData = {
        shelfName: req.body.shelfName,
        books: Array.isArray(req.body.books) ? req.body.books : [],
        isPublic: req.body.isPublic,
    };

    await DB.createOrUpdateBookshelf(user, bookshelfData);
    const updatedShelf = await DB.getBookshelfByUser(user);

    broadcastToShelf(user.shareId, updatedShelf);

    res.send(updatedShelf);

})

apiRouter.get('/bookshelf/share/:shareID', async (req, res) => {
    const friendShelf = await DB.getBookshelfbyShareId(req.params.shareID);
    res.send(friendShelf);
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function updateBookshelf(user, newBook) {
    let bookshelf = await DB.getBookshelfByUser(user);

    if (!bookshelf) {
        bookshelf = { shelfName: 'My Bookshelf', books: [], isPublic: true };
    }

    const books = bookshelf.books || [];
    const index = books.findIndex(b => b.id === newBook.id);

    if (index !== -1) {
        books[index] = newBook;
    } else {
        books.push(newBook);
    }

    const updatedBooks = { ...bookshelf, books };
    await DB.createOrUpdateBookshelf(user, updatedBooks);

    return updatedBooks;
}

async function deleteFromBookshelf(user, reqBook) {
    const bookshelf = await DB.getBookshelfByUser(user);

    const books = bookshelf.books || [];
    const updatedBooks = { ...bookshelf, books: books.filter(book => book.id !== reqBook.id)};
    
    await DB.createOrUpdateBookshelf(user, updatedBooks);

    return updatedBooks;
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = { email: email, password: passwordHash, token: uuid.v4(), };
    await DB.addUser(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const { socketServer, broadcastToShelf } = shelfProxy(httpService);