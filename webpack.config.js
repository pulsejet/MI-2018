const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/script/main.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'MoodI'
  }
};
