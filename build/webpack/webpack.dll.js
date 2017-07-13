var config = require('../config')
const path = require('path')
const webpack = require('webpack')
const ENV = process.env.NODE_ENV || 'production'
const vendorName = 'vendor' + (ENV === 'development' ? '_dev' : '')

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux'
]

module.exports = {
  entry: {
    [vendorName]: vendors
  },
  output: {
    path: path.resolve(config.dev.staticRoot, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ]
}
