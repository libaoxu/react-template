/**
 * pages 业务层配置信息
 * @author libx@libaoxu
 * @date 2017-05-23
 */
import build from './build'

const IS_DEV = build.IS_DEV
const HOST = location.host
const ORIGIN = location.origin

const prodRootMap = {
  'boc.libaoxu.cn': {
    root: '//actapi.busi.libaoxu.cn/',
    webRoot: '//webapi.busi.libaoxu.cn/',
    brokerRoot: '//broker.busi.libaoxu.cn/'
  },
  'betaboc.libaoxu.cn': {
    root: '//betaactapi.busi.libaoxu.cn/',
    webRoot: '//betawebapi.busi.libaoxu.cn/',
    brokerRoot: '//betabroker.busi.libaoxu.cn/'
  },
  'testboc.libaoxu.cn': {
    root: '//testact.libaoxu.cn:668/',
    webRoot: '//testact.libaoxu.cn:666/',
    brokerRoot: '//testact.libaoxu.cn:999/'
  }
}

const rootObj = prodRootMap[Object.keys(prodRootMap).find((key) => HOST.indexOf(key) === 0)]

var PROD = {
  APIS: {
    root: (typeof rootObj === 'object' ? rootObj.root : rootObj) || '/',
    webRoot: (typeof rootObj === 'object' ? rootObj.webRoot : rootObj) || '/',
    brokerRoot: (typeof rootObj === 'object' ? rootObj.brokerRoot : rootObj) || '/'
  }
}

const DEV = {
  APIS: {
    root: '/'
  }
}

export default {
  IS_DEV,

  build,

  /**
   * 图片跟路径
   */
  IMG_HOST: 'https://img2.libaoxu.cn/',

  ...IS_DEV ? DEV : PROD
}
