const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

let users = [];
let bookshelfByUser = {};

let apiRouter = express.Router();
app.use(cookieParser());
app.use('/api', apiRouter);

const authCookieName = 'token';

app.use(express.static('public'));

// apiRouter.post('/auth/create', async (req, res) => {
//     console.log('Request body:', req.body);
//     try {
//         if (await findUser('email', req.body.email)) {
//             res.status(409).send({msg: 'Existing user'});
//         } else {
//             const user = await createUser(req.body.email, req.body.password);
//             //bookshelfByUser[user.email] = [];
//             setAuthCookie(res, user.token);
//             res.send({ email: user.email });
//         }
//     } catch (err) {
//         console.error('Create user error:', err);
//         return res.status(500).send({ msg: 'Internal server error' });
//     }

// });


//temporary code to help debug
apiRouter.post('/auth/create', async (req, res) => {
    console.log('Reached the create backend.');
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);
        bookshelfByUser[user.email] = [];
        setAuthCookie(res, user.token);
        console.log("Successful create");

        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    console.log('Reached the login backend');
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      console.log("Successful login");
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    try {
        console.log("Reached the logout backend");
        const user = await findUser('token', req.cookies['token']);
        if (user) {
            delete user.token;
            console.log("Successful logout");
        }
        res.clearCookie(authCookieName);
        res.status(204).end();
    } catch (Error) {
        res.status(500).send[{Error}];
    }
});

const verifyAuth = async (req, res, next) => {
    console.log("Reached the verifyAuth backend");
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
        console.log("Successful verification");
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

//Gets user-specific bookshelf for authenticated user
apiRouter.get('/bookshelf', verifyAuth, async (req, res) => {
    console.log("Reached get bookshelf backend");
    const user = await findUser('token', req.cookies[authCookieName]);
    res.send(bookshelfByUser[user.email] || []);
});

//Stores bookshelf for authenticated user
apiRouter.post('/bookshelf', verifyAuth, async (req, res) => {
    console.log("reached the store bookshelf backend");
    const user = await findUser('token', req.cookies[authCookieName]);
    const userBookshelf = bookshelfByUser[user.email] || [];
    bookshelfByUser[user.email] = updateBookshelf(req.body, userBookshelf);
    res.send(bookshelfByUser[user.email]);
});

//deletes book from bookshelf
apiRouter.delete('/bookshelf', verifyAuth, async (req, res) => {
    console.log("reached delete book backend");
    const user = await findUser('token', req.cookies[authCookieName]);
    const userBookshelf = bookshelfByUser[user.email] || [];
    bookshelfByUser[user.email] = deleteFromBookshelf(req.body, userBookshelf);
    console.log('successful delete');
    res.send(bookshelfByUser[user.email])
})

apiRouter.put('/bookshelf', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userBookshelf = bookshelfByUser[user.email] || [];
    bookshelfByUser[user.email] = updateBookshelf(req.body, userBookshelf);
    res.send(bookshelfByUser[user.email]);
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function updateBookshelf(newBook, userBookshelf) {
    let found = false;
    for(const [i, prevBook] of userBookshelf.entries()) {
        if (prevBook.id === newBook.id) {
            userBookshelf[i] = newBook;
            found = true;
            break;
        }
    }

    if (!found) {
        userBookshelf.push(newBook);
    }

    return userBookshelf;
}

function deleteFromBookshelf(reqBook, userBookshelf) {
    return userBookshelf.filter(book => book.id !== reqBook.id);
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = { email: email, password: passwordHash, token: uuid.v4(), };
    users.push(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

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