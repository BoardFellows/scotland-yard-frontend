const path = require('path');

let PATHS = {
  entry:  __dirname + 'frontend/app/entry.js',
  output: __dirname + 'frontend/build'
};

module.exports = {
  entry: PATHS.entry,
  output: {
    path: PATHS.output,
    filename: 'bundle.js'
  }, 
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loaders: ['babel'],
        include: __dirname + '/frontend/app'
      }, 
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: __dirname + '/frontend/app'
      }
    ]
  }
};
