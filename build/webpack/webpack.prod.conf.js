var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var entry = require('../entry')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let os = require('os');

var rootPathResolve = utils.rootPathResolve

var nodeModulePath = rootPathResolve('node_modules')
var srcCommonPath = rootPathResolve('src/common')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var baseEntries = baseWebpackConfig.entry
var baseEntriesLen = Object.keys(baseEntries).length
var SCHEME = config.srcConfig.SCHEME

var getRadio = function (entries, base) {
  var radio = entries / base 
  return (radio + 2) / (radio + 3)
}

var radio = getRadio(baseEntriesLen, 10)

var cmmonsChunkConfig = {
  'inmyworld.cn': function (resource) {
    if (/\.js$/.test(resource)) {
      return resource.indexOf(nodeModulePath) === 0 || resource.indexOf(srcCommonPath) === 0 
    }
  },
  'boc.libaoxu.cn': function (resource, count) {
    return /\.js$/.test(resource) &&
      (
        resource.indexOf(nodeModulePath) === 0 ||
        // src/common下 的模块
        // 1 每个页面都引用的 count === baseEntries
        // 2 非每个页面都引用, 引用次数/entires总数, 要和预设比例更接近
        (
          resource.indexOf(srcCommonPath) === 0 && (
            // 手机端 额外处理
            count === baseEntriesLen || utils.close(count / baseEntriesLen, radio)
          ) 
        )
      )
  }
}

var cmmonsChunkHandle = cmmonsChunkConfig[SCHEME]

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    // 开启多线程进行丑化
    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: './webpack_cache/',
      uglifyJS: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        comments: false,
        sourceMap: true,
        mangle: true
      }
    }),

    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: process.env.NODE_ENV === 'testing'
    //     ? 'index.html'
    //     : config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common'],
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return cmmonsChunkHandle(module.resource, count)
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor', 'common'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: config.build.staticRoot,// path.resolve(__dirname, '../static'),
        to: path.resolve(config.build.assetsRoot, 'static'),
        ignore: ['.*']
      }
    ]),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor-manifest.json')
    })
  ].concat(entry.htmlGenerator())
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
