module.exports = {
  output: {
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
