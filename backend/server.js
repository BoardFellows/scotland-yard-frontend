'use strict';

const express       = require('express');
const app           = express();
// const bodyParser    = require('body-parser');
// const API_URL       = process.env.API_URL || 'localhost:8080';
// console.log(API_URL);

// Define request proxy options
// const requestProxy  = require('express-request-proxy');

// TODO: implement the proxy requests
// app.use('/requestProxy/:path', requestProxy({
//   url: `${API_URL}/:path`
// }));
// app.use(bodyParser);
// app.use('/requestProxy/:path', (req, res) => {
//   console.log('REQUEST MADE TO /requestProxy');
//   console.log(API_URL);
//   console.log(req.params.path);
//   console.log(req.params);
//   res.status(200).end();
// });

app.use('/', express.static(__dirname + '/../frontend/build'));

app.listen(3000, () => {
  console.log('App listening on 3000');
});
