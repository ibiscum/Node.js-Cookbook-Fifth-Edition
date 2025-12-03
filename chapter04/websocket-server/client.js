import { readFileSync } from 'fs';
import { createServer } from 'http';

const index = readFileSync('public/index.html');

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(index);
});

server.listen(8080);
