/**
 * build 层配置信息
 * 注意: build层是基于node的, 不能用import等语法, 不能对讲exports出去的对象给pages进行计算, 不能有window等对象,
 * @author libx@libaoxu
 * @date 2017-05-23
 */

const IS_DEV = process && process.env.NODE_ENV === 'development'


const PROD_CONF = {
  BUILD: {
    /**
     * 资源文件根路径
     */
    assetsPublicPath: '/'
  }
}

const DEV_CONF = {

}

const CONFIG = {
  IS_DEV,

  DEV: DEV_CONF,

  PROD: PROD_CONF,

  /**
   * 项目标识
   */
  SCHEME: 'boc.libaoxu.cn',

  /**
   * 项目名称
   */
  PROJECT_NAME: '',

  /**
   * 是否mock
   */
  IS_MOCK: false,

  /**
   * 别名
   */
  ALIAS: {

  },

  /**
   * 跨域代理
   * /activity/* -> 活动
   * /service/* -> 服务
   * /app/* -> 栈内
   * /goddess/* -> 樱花女神
   */
  PROXY_TABLE: [
    {
      path: ['/activity/*'],
      host: 'testact.libaoxu.cn:668'
    },
    {
      path: ['/service/*'],
      host: 'testact.libaoxu.cn:668'
    },
    {
      path: ['/app/*'],
      // host: 'testact.libaoxu.cn:668'
      host: 'actapi.busi.libaoxu.cn'
    },
    {
      path: ['/goddess/*'],
      host: 'testact.libaoxu.cn:668'
    }
  ],

  /**
   * 端口
   */
  PORT: 8082,

  debugs: {
    'redux': false,
    'react-redux': false
  }

}

module.exports = CONFIG
