// console.log("Hello Chacour Cosmetic!");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true
  }
  // countInStock: Number
})

const Product = mongoose.model('Product', productSchema);

// const favicon = require('serve-favicon');
// const http = require('http');

require('dotenv/config');

const api = process.env.API_URL;

// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(favicon(__dirname + '/favicon.ico'));
// // app.use("/public", express.static('public'));

// app.use(express.static('public'));

// app.get(api+'/products', (req, res) => {
//     res.send('Hello Chacour Cosmetic API!');
// })

// app.get('/', (req, res) => {
//     res.sendFile('public/index.html');
//   });

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
      res.status(500).json({success: false})
    }

    res.send(productList);
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock
    })

    product.save().then((createdProduct => {
      res.status(201).json(createdProduct)
    })).catch((err) => {
      res.status(500).json({
        error: err,
        success: false
      })
    })
})

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cosmetic-database'
})
.then(() => {
  console.log('Database Connection is ready...')
})
.catch((err) => {
  console.log(err)
})

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// })