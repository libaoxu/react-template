var path = require('path')
var utils = require('./utils')
var config = require('../config')
var entry = require('../entry')
var webpack = require('webpack')
var HappyPack = require('happypack')
var getHappyPackConfig = require('./happypack.conf')

var postcssConf = require('../../.postcssrc.js')
var srcConfig = config.srcConfig
var SCHEME = srcConfig.SCHEME

var resolve = utils.rootPathResolve

var defaultExternals = {
  
}

var defaultIncludePath = [resolve('src'), resolve('test')]

var defaultExcludePath = [/node_modules/, resolve('src/assets'), resolve('src/common/element')]

var defaultVendors = []

var externalsMap = {
  'inmyworld.cn': {}
}

var excludeMap = {
  'inmyworld.cn': [/node_modules/, resolve('src/assets')]
}

var vendorMap = {
  'inmyworld.cn': [resolve('src/vendor')]
}

// 映天下 不能排除 element根目录, 因为用的是iview组件
var jsExcludePath = excludeMap[SCHEME] || defaultExcludePath
var externals = /*externalsMap[SCHEME] || */defaultExternals

var vendors = vendorMap[SCHEME] || []

var entries = entry.getEntries()

module.exports = {
  entry: vendors && vendors.length ? Object.assign(entries, {
    vendor: vendors
  }): entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.web.js', '.jsx', '.js', '.css', '.vue', '.html', '.less', '.postcss', '.json'],
    alias: config.alias
  },  
  
  /**
   * key: import 的路径别名, 如: import React from 'React'
   * value: window.React 的全局变量
   */
  externals: externals,

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: defaultIncludePath,
      //   exclude: [/node_modules/, resolve('src/mocks'), resolve('src/assets')],
      //   use: [{
      //     loader: 'happypack/loader?id=jsx',
      //   }]      
      // },
      {
        test: /\.(js|jsx)$/,
        include: defaultIncludePath,
        exclude: jsExcludePath,
        loader: 'happypack/loader?id=jsX',
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. svg files of antd-mobile
          // path.resolve(__dirname, 'src/my-project-svg-foler'),  // folder of svg files in your project
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new HappyPack(getHappyPackConfig({
      id: 'jsX',
      loaders: [{
        path: 'babel-loader',
        query: {
          // plugins: [
          //   ['import', { libraryName: 'antd-mobile', style: 'css' }],
          // ],
          // presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: './webpack_cache/'
        },
      }]
    })),

    // new HappyPack(getHappyPackConfig({
    //   id: 'js',
    //   loaders: [{
    //     loader: 'babel-loader',
    //     query: {
    //       cacheDirectory: './webpack_cache/'
    //     }
    //   }]
    // })),

    // less 配置目前已由函数封装, 再次配置比较繁琐, 暂时不考虑
    new HappyPack(getHappyPackConfig({
      id: 'less',
      loaders: ['css-loader', 'less-loader']
    })),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor-manifest.json')
    })

    // new webpack.LoaderOptionsPlugin({
    //   options: { 
    //     vue: {
    //       // use custom postcss plugins, 已在 .postcssrc.js 里配置
    //       // postcss: [require('postcss-px2rem')(postcssConf.plugins['postcss-px2rem'])]
    //     },
    //   }
    // })
  ]  
}
