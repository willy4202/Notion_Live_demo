const express = require('express');
const dbmethods = require('./src/utils/dbmethods');
const pagemethods = require('./src/utils/pagemethods');

const port = 8000;
const app = express();

app.use(express.static('public'));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/data', async (req, res) => {
  const data = await dbmethods.getDatabase();
  res.json(data);
});

app.post('/submit-form', async (req, res) => {
  const place = req.body.place;
  const address = req.body.address;
  await pagemethods.createPageToDatabase(place, address);
  res.redirect('/');
  res.end();
});

app.listen(port, console.log(`Server started on ${port}`));
