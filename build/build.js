require('./check-versions')()
require('shelljs/global')

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var webpackConfig = require('./webpack/webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var isWatch = false

var assetsRoot = isWatch 
  ? config.build.watchingAssetsRoot
  : config.build.assetsRoot;

var assetsPath = path.join(assetsRoot, config.build.assetsSubDirectory)
// console.log('assetsRoot', assetsRoot)
// rm('-rf', assetsPath)

if (isWatch) {
  webpackConfig.watch = true
  webpackConfig.progress = true
  webpackConfig.devtool = '#source-map'
}

rm(assetsPath, err => {
  // mkdir('-p', assetsPath)
  
  // 静态目录的文件和文件夹, 和assetsPath里面文件同级
  // cp('-R', config.build.staticRoot, path.resolve(assetsPath, '../'))

  if (err) throw err
  
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
