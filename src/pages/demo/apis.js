import srcConfig from 'src/config'
import { getCurryUrl } from 'service/utils'
import serviceConfig from 'service/config'

/**
 * 请求类型
 * @type {Object}
 */
const { REQ_TYPE } = serviceConfig

/**
 * api请求 相关根路径配置
 * @type {Object}
 */
const APIS_CONFIG = srcConfig.APIS

/**
 * 请求根路径
 * @type {String}
 */
const ROOT_URL = APIS_CONFIG.root

/**
 * root地址 的 get 请求函数,
 * @type {Function}
 */
const getRoot = getCurryUrl(ROOT_URL, REQ_TYPE.GET)

/**
 * root地址 的 post 请求函数, 次函数执行后得到 apiConfig需要的json对象
 * @type {Function}
 */
const postRoot = getCurryUrl(ROOT_URL, REQ_TYPE.POST)

/**
 * 给postRoot 增加默认的参数, 变成x-www-form-urlencoded形势
 */
const postRootXForm = function (url, options, settings) {
  return postRoot(url, {
    ...options,
    // 以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
    emulateJSON: true,
    headres: {
      'Content-Type': 'multipart/form-data'
    }
  }, settings)
}

const autoLoading = true

export const APP_USER_INFO = postRootXForm('goddess/user_info', {}, {
  autoLoading
})
