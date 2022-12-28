const express = require('express');
const moduleToFetch = require('./index');
const getDatabase = require('./src/utils/dbmethods');

const port = 8000;
const app = express();

app.use(express.static('public'));

app.get('/data', async (req, res) => {
  const data = await getDatabase();
  res.json(data);
});

app.listen(port, console.log(`Server started on ${port}`));

console.log(getDatabase);
