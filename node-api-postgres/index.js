const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get('/products', cors(), db.getProducts);
app.get('/products/:id', cors(), db.getProductById);
app.post('/products/create', cors(), db.createProduct);
app.delete('/products/delete/:id', cors(), db.deleteProduct);
