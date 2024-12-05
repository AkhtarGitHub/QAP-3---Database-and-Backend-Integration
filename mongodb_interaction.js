const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'library';

const runMongoQueries = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const booksCollection = db.collection('books');

        // Task 1: Insert data into books collection
        const sampleBooks = [
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960 },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 },
        ];

        await booksCollection.insertMany(sampleBooks);
        console.log('Sample books inserted.');

        // Task 2: Retrieve titles of all books
        const titles = await booksCollection.find({}, { projection: { _id: 0, title: 1 } }).toArray();
        console.log('Book Titles:', titles);

        // Task 3: Find all books by J.R.R. Tolkien
        const tolkienBooks = await booksCollection.find({ author: 'J.R.R. Tolkien' }).toArray();
        console.log('Books by J.R.R. Tolkien:', tolkienBooks);

        // Task 4: Update genre of "1984" to "Science Fiction"
        await booksCollection.updateOne({ title: '1984' }, { $set: { genre: 'Science Fiction' } });
        console.log('"1984" genre updated.');

        // Task 5: Delete "The Hobbit"
        await booksCollection.deleteOne({ title: 'The Hobbit' });
        console.log('"The Hobbit" deleted.');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};

runMongoQueries();
