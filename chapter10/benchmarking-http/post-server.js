import express from 'express';
const app = express();
import { json, urlencoded } from 'body-parser';

app.use(json());
app.use(urlencoded({ extended: false }));

app.post('/', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
