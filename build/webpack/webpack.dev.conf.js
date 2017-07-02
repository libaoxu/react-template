var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var entry = require('../entry')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var HappyPack = require('happypack')
var getHappyPackConfig = require('./happypack.conf')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var resolve = utils.rootPathResolve

/**
 * 只有dev 环境时候 才增加eslint, 减少prod环境构建时间, 采用happypack, 进行多线程
 */
// baseWebpackConfig.module.rules.unshift(
//   {
//     test: /\.(js|jsx)$/,
//     loader: 'happypack/loader?id=eslint',
//     enforce: 'pre',
//     include: [resolve('src')],
//     exclude: [/node_modules/, resolve('src/assets'), resolve('src/common/element'), resolve('src/mocks')]
// })

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // source-map debugger 更友好
  devtool: '#cheap-module-eval-source-map',
  // devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),

    new HappyPack(getHappyPackConfig({
      id: 'eslint',
      loaders: [{
        loader: 'eslint-loader',
        query: {
          formatter: require('eslint-friendly-formatter'),
          cacheDirectory: './webpack_cache/'
        }
      }]
    }))
  ].concat(entry.htmlGenerator()),

})
