const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/script/main.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'var',
    library: 'MoodI'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                ["@babel/preset-env", {
                    "useBuiltIns": "usage"
                }],
            ]
          }
        }
      }
    ]
  }
};
