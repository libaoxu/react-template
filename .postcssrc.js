// postcss 相关的坑, 原来在这里, 感谢由大神已经建好了这个文件, 不然只能干捉急了
// https://github.com/michael-ciniawsky/postcss-load-config

/**
 * @example https://www.npmjs.com/package/px2rem
 */

var px2remOpts = {
  // 1rem -> 75px
  remUnit: 75,
  // 是否根据  dpr 产生三种font-size 选择器
  threeVersion: true,
  // device pixel ratio 基准
  baseDpr: 2,
  // rem精度
  remPrecision: 3
}

module.exports = {
  // parser: 'sugarss',
  'plugins': {
    // 'postcss-import': {},
    // 'cssnext': {},
    // 'cssnano': {},
    'autoprefixer': {},
    'postcss-px2rem': px2remOpts
  }
}