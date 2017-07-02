var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = function (opts){
  return {
    id: opts.id,
    threadPool: happyThreadPool,
    // cache: true,
    verbose: true,
    loaders: opts.loaders
  }
}
