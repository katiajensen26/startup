const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

let users = [];
let bookshelfByUser = {
    "user@email.com": {
        name: "",
        books: []
    }
};

let apiRouter = express.Router();
app.use(cookieParser());
app.use('/api', apiRouter);

const authCookieName = 'token';

app.use(express.static('public'));

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);
        bookshelfByUser[user.email] = { name: '', books: []};
        setAuthCookie(res, user.token);

        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
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
    res.send(bookshelfByUser[user.email] || { name: '', books: []});
});

//Stores bookshelf for authenticated user
apiRouter.post('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userBookshelf = bookshelfByUser[user.email] || [];
    bookshelfByUser[user.email] = updateBookshelf(req.body, userBookshelf);
    res.send(bookshelfByUser[user.email]);
});

//deletes book from bookshelf
apiRouter.delete('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies['token']);
    const userBookshelf = bookshelfByUser[user.email] || [];
    bookshelfByUser[user.email] = deleteFromBookshelf(req.body, userBookshelf);
    res.send(bookshelfByUser[user.email])
})

apiRouter.put('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userBookshelf = bookshelfByUser[user.email] || { name: '', books: [] };

    const updateName = req.body.name ? req.body.name : userBookshelf.name;
    const newBook = req.body.book;

    let updateBooks = [...userBookshelf.books];

    if (newBook) {
        const index = updateBooks.findIndex(b => b.id === newBook.id);
        if (index !== -1) {
            updateBooks[index] = newBook;
        } else {
            updateBooks.push(newBook);
        }
    }

    bookshelfByUser[user.email] = { name: updateName, books: updateBooks };
    res.send(bookshelfByUser[user.email]);
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function updateBookshelf(newBook, userBookshelf) {
    const books = userBookshelf.books || [];
    let found = false;
    for(const [i, prevBook] of books.entries()) {
        if (prevBook.id === newBook.id) {
            books[i] = newBook;
            found = true;
            break;
        }
    }

    if (!found) {
        books.push(newBook);
    }

    return {
        name: userBookshelf.name || '',
        books: books
    };
}

function deleteFromBookshelf(reqBook, userBookshelf) {
    const books = userBookshelf.books || [];
    return {... userBookshelf, books: books.filter(book => book.id !== reqBook.id) };
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

//change this before deploying
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});