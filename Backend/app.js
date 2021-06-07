// console.log("Hello Chacour Cosmetic!");

const express = require('express');
const app = express();
// var csp = require('express-csp');

// app.use(function(req, res, next){
//     res.header("Content-Security-Policy", "default-src 'self' *.ico;script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
//     next();
// });

// csp.extend(app, {
//     policy: {
//         directives: {
//             'default-src': ['self', 'http://localhost:3000/favicon.ico'],
//             'script-src': ['*.apis.bar.com']
//         }
//     },
//     reportPolicy: {
//         useScriptNonce: true,
//         useStyleNonce: true,
//         directives: {
//             'default-src': ['self', 'http://localhost:3000/favicon.ico' ],
//             'script-src': ['*.apis.bar.com'],
//             'plugin-types': ['application/pdf']
//         }
//     }
// });

const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(expressCspHeader({
    directives: {
        'default-src': ["'self'", "http://localhost:3000/favicon.ico"],
        // 'script-src': [SELF, INLINE, 'somehost.com'],
        // 'style-src': [SELF, 'mystyles.net'],
        // 'img-src': ['data:', 'images.com'],
        // 'worker-src': [NONE],
        // 'block-all-mixed-content': true
    }
}));

require('dotenv/config');

const api = process.env.API_URL;

// app.get(api+'/products', (req, res) => {
//     res.send('Hello Chacour Cosmetic API!');
// })

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hairdresser',
        Image: 'some_url'
    }

    // res.send('Hello Chacour Cosmetic API!');
    res.send(product);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})