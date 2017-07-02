// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var sourcePath = path.resolve(__dirname, '../../src/')
// var srcConfig = require('../../src/config')
var srcConfig = require('../../src/config/build')
var prodViews = require('../../src/pages/views');
var devViews = require('../../src/pages/views/dev-views')

var views = process.env.NODE_ENV === 'development' ? devViews : prodViews

module.exports = {
  build: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../../dist/prod/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist/prod'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // build:w执行 时候出现的目录, 方便watch 和 map local使用
    // watchingIndex: path.resolve(__dirname, '../../dist/dev/index.html'),
    watchingAssetsRoot: path.resolve(__dirname, '../../dist/dev'),
    staticRoot: path.resolve(__dirname, '../../src/assets/static/'),
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: srcConfig.PORT,
    autoOpenBrowser: false,
    staticRoot: path.resolve(__dirname, '../../src/assets/static/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: srcConfig.PROXY_TABLE,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 跟 postcss-px2rem 中的 /*px*/ /*no*/ 有冲突
    cssSourceMap: false
  },

  sourcePath: sourcePath,
  
  views: views,

  alias: require('./alias')(srcConfig),

  srcConfig
}
