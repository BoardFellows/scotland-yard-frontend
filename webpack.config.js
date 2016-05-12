const path = require('path');

let PATHS = {
  entry:  path.join(__dirname, 'frontend/entry.js'),
  output: path.join(__dirname, 'frontend/build')
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
        include: __dirname + '/app'
      }
    ]
  }
};
