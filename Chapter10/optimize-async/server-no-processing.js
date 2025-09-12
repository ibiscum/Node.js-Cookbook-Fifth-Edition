const { MongoClient } = require('mongodb');
const express = require('express');
const rateLimit = require('express-rate-limit');

const URL = 'mongodb://localhost:27017/';
const app = express();

// Set up rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

async function main () {
  const client = new MongoClient(URL);

  try {
    await client.connect();
    const db = client.db('data');
    const average = db.collection('averages');

    app.get('/', async (req, res) => {
      try {
        const data = await average.findOne({});
        res.send(`Average of all values is ${data.value}.`);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching average');
      }
    });

    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);
