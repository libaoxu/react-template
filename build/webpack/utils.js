var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var srcConfig = config.srcConfig
var SCHEME = srcConfig.SCHEME

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  function loaderFactory(loaderName, factoryOptions) {
    return {
      loader: loaderName + '-loader',
      options: Object.assign({
        sourceMap: options.sourceMap
      }, factoryOptions)
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [
      loaderFactory('css', Object.assign({
        minimize: process.env.NODE_ENV === 'production',
        // importLoaders: 3
      }, loaderOptions)),
      // loaderFactory('style')
    ]

    if (loader) {
      if (typeof loader === 'string') {
        loaders.push(loaderFactory(loader, loaderOptions))
      } else if (loader instanceof Array) {
        loader.forEach(function (item, i) {
          // 字符串直接通过工厂创建
          if (typeof item === 'string') {
            loaders.push(loaderFactory(item))
          } else if (typeof item === 'object' && item.loaderName) {
            // 支持对象, 有自己的loaderOptions
            loaders.push(loaderFactory(item.loaderName, item.loaderOptions))
          }
        })
      }
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders([{
      loaderName: 'postcss',
      loaderOptions: {
        // 目前只有 boc.libaoxu.cn , 因为px2rem问题, prod环境保留sourceMap
        sourceMap: SCHEME === 'boc.libaoxu.cn'
      }
    }, {
      loaderName: 'less',
      loaderOptions: {
        // sourceMap: true
        // strictMath: true,
        // noIeCompat: true
      }
    }]),
    postcss: generateLoaders('postcss'),
    /**
     * https://www.npmjs.com/package/postcss-loader
     * 顺序很重要, 改一下顺序就可以用 less 相关方法了
     * Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader
     */
    less: generateLoaders([{
      loaderName: 'postcss',
      loaderOptions: {
        // 目前只有 boc.libaoxu.cn , 因为px2rem问题, prod环境保留sourceMap
        sourceMap: SCHEME === 'boc.libaoxu.cn'
      }
    }, {
      loaderName: 'less',
      loaderOptions: {
        // sourceMap: true
        // strictMath: true,
        // noIeCompat: true
      }
    }]),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.rootPathResolve = function rootPathResolve (dir) {
  return path.join(__dirname, '../..', dir)
}

exports.close = function close (num1, num2) {
  var average =  (num1 + num2) / 2 
  return (num1 / average >= 0.97) && (num2 / average >= 0.97)
}