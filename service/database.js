const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('MyBookshelf');
const userCollection = db.collection('users');
const bookshelves = db.collection('bookshelves');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function getBookshelfByUser(user) {
    return await bookshelves.findOne({ email: user.email });
}

async function getBookshelfbyShareId(shareID) {
    return await bookshelves.findOne({ shareID });
}

async function createOrUpdateBookshelf(user, bookshelfData) {
    const update = {
        $set: {
            shelfName: bookshelfData.name || "My Bookshelf",
            books: bookshelfData.books || [],
            isPublic: bookshelfData.isPublic ?? true
        },
        $setOnInsert: {
            email: user.email,
            shareID: bookshelfData.shareID || generateShareId()
        }
    };

    await bookshelves.updateOne({ email: user.email }, update, { upsert: true });
}

function generateShareId() {
    result = '';
    while (result.length < 10) {
        result += Math.random().toString(36).substring(2);
    }

    return result.substring(0, 10);
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getBookshelfByUser,
    getBookshelfbyShareId,
    createOrUpdateBookshelf
};