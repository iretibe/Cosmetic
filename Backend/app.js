// console.log("Hello Chacour Cosmetic!");

const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const http = require('http');

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

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hairdresser',
        Image: 'some_url'
    }

    // res.send('Hello Chacour Cosmetic API!');
    res.send(product);
})

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// })

http.createServer((request, response) => { 
    if(request.url === '/favicon.ico') {
      response.writeHead(200, {
        'Content-Type': 'image/x-icon'
      });
      return response.end();
    }
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.write('Some requested resource');
    response.end();
    
  }).listen(3000);