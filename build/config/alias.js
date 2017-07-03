/**
 * 文件别名集合
 * 文件统一用别名方式, 尽量不用 ../../这种相对路径, 使用别名, 方便使用、维护和移植
 * 
 * @example
 * js
 * good:  
 *  import srcConfig from 'src/config' 
 *  import NAPIConfig from 'nadapter/config' 
 * 
 * bad: 
 *  import srcConfig from '../../config' 
 *  import NAPIConfig from '../config' 
 * 
 * less:
 * good:  
 * @import '~assets/less/variable.less';
 * 
 * bad: 
 * @import '../../assets/less/variable.less';
 * 
 * @author libx@libaoxu 2017-05-22
 */

var path = require('path')

/**
 * src的相对根路径
 * @type {String}
 */ 
var SRC_PATH_STR = '../../src/';
var SRC_RELATIVE_PATH = path.resolve(__dirname, SRC_PATH_STR)
var isDev = process.env.NODE_ENV !== 'production'

module.exports = function (srcConfig) {
  var srcAlias = srcConfig.ALIAS || {}
  var debugs = srcConfig.debugs

  return {
    'vue$': 'vue/dist/vue.esm.js',
    'src': path.resolve(SRC_RELATIVE_PATH),
    // 页面逻辑页
    'pages': path.resolve(SRC_RELATIVE_PATH, 'pages'),
    '@': path.resolve(SRC_RELATIVE_PATH, 'pages/index'),
    // 资源文件
    'assets': path.resolve(SRC_RELATIVE_PATH, 'assets'),
    'views': path.resolve(SRC_RELATIVE_PATH, 'views'),
    // 公共目录
    "common": path.resolve(SRC_RELATIVE_PATH, 'common'), 
    // mock数据
    "mocks": path.resolve(SRC_RELATIVE_PATH, (isDev && srcConfig.IS_MOCK ? 'mocks' : 'mocks/null')),
    // 页面逻辑组件相关
    'modules': path.resolve(SRC_RELATIVE_PATH, 'common/modules'),
    // common 模块下的modules
    'comModules': path.resolve(SRC_RELATIVE_PATH, 'common/modules'),
    // 入口文件
    'entry': path.resolve(SRC_RELATIVE_PATH, 'common/entry'),
    // 轻量entry入口
    'entry-mini': path.resolve(SRC_RELATIVE_PATH, 'common/entry-mini'),
    // 基础组件
    "components": path.resolve(SRC_RELATIVE_PATH, 'common/components'),
    // 工具页
    'utils': path.resolve(SRC_RELATIVE_PATH, 'common/utils'),
    // 用户信息
    'user': path.resolve(SRC_RELATIVE_PATH, 'common/modules/user'),
    // http请求封装
    'service': path.resolve(SRC_RELATIVE_PATH, 'common/service'),
    // 指令
    'directives': path.resolve(SRC_RELATIVE_PATH, 'common/directives'),
    // 混合
    'mixins': path.resolve(SRC_RELATIVE_PATH, 'common/mixins'),
    // 微信相关
    'weixin': path.resolve(SRC_RELATIVE_PATH, 'common/weixin'),
    // 适配层
    'adapter': path.resolve(SRC_RELATIVE_PATH, 'common/adapter'),
    // 桥接到客户端
    'bridge': path.resolve(SRC_RELATIVE_PATH, 'common/bridge'),
    // element ui框架
    "element": path.resolve(SRC_RELATIVE_PATH, 'common/element'),
    "mint-ui": path.resolve(SRC_RELATIVE_PATH, 'common/element/mint-ui'),
    // talking-data 的 pc端ui组件目录
    "iview": path.resolve(SRC_RELATIVE_PATH, 'common/element/iview'),
    // pc端 ui 主题色
    "iview-theme": path.resolve(SRC_RELATIVE_PATH, 'common/element/iview-theme'),
    // 具体实现组件, 按需引用时候用
    "iview-ui": path.resolve(SRC_RELATIVE_PATH, 'common/element/iview/src/components'),
    // handle debugs for source code
    'redux': debugs.redux ?  path.resolve(SRC_RELATIVE_PATH, 'debug/redux') : 'redux',
    'react-redux': debugs['react-redux'] ?  path.resolve(SRC_RELATIVE_PATH, 'debug/react-redux') : 'react-redux'
  }

}
