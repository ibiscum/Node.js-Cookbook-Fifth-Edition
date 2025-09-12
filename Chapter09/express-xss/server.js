const express = require('express');
const escape = require('escape-html');

const app = express();

app.get('/', (req, res) => {
  const { previous, lang, token } = req.query;

  getServiceStatus((status) => {
    res.send(` 
      <h1>Service Status</h1> 
      <div id=status> 
        ${status} 
      </div> 
      <div> 
      <a href="${escape(previous)}${escape(token)}/${escape(lang)}">Back</a> 
      </div> 
    `);
  });
});

const getServiceStatus = (callback) => {
  const status = 'All systems are running.';

  callback(status);
};

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
