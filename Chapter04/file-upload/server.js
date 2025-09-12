import { readFileSync } from 'fs';
import { createServer, STATUS_CODES } from 'http';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const form = readFileSync(join(__dirname, 'public', 'form.html'));

import { formidable } from 'formidable';

createServer((req, res) => {
    if (req.method === 'GET') {
      get(res);
      return;
    }
    if (req.method === 'POST') {
      post(req, res);
      return;
    }

    error(405, res);
  })
  .listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
  });

function get (res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
}

function error (code, res) {
  res.statusCode = code;
  res.end(STATUS_CODES[code]);
}

function post (req, res) {
  if (!/multipart\/form-data/.test(req.headers['content-type'])) {
    error(415, res);
    return;
  }

  const form = formidable({
    multiples: true,
    uploadDir: './uploads'
  });

  form.parse(req, (err, fields, files) => {
    if (err) return err;

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({ fields, files }));
  });
}
