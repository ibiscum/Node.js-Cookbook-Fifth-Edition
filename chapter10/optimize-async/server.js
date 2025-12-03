const { MongoClient } = require('mongodb');
const express = require('express');
const rateLimit = require('express-rate-limit');

const URL = 'mongodb://localhost:27017/';
const app = express();

// Set up rate limiter: maximum of 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
(async () => {
  try {
    const client = new MongoClient(URL);
    await client.connect();

    const db = client.db('data');
    const values = db.collection('values');

    app.get('/', async (req, res) => {
      try {
        const data = await values.find({}).toArray();

        const average =
          data.reduce((accumulator, value) => accumulator + value.value, 0) /
          data.length;

        res.send(`Average of all values is ${average}.`);
      } catch (err) {
        console.error(err); // Log the error (including stack trace) server-side
        res.status(500).send("An internal server error occurred."); // Send safe error message to user
      }
    });

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error(err);
  }
})();
