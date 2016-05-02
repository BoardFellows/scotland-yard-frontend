'use strict';

const express = require('express');
const app     = express();

app.use('/', express.static(__dirname + '/../frontend/build'));

app.listen(3000, () => {
  console.log('App listening on 3000');
});
