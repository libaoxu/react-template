import config from './config'
import commonUtil from 'utils/common'
import loading from 'components/loading'
// import Loading from 'components/loading'

/**
 * 加载动画实例对象
 */
// const loading = new loading()

const IS_DEV = process && process.env.NODE_ENV === 'development'
const SHORT_PARAMS_LIST = config.SHORT_PARAMS_LIST

/**
 * 生成Service单例
 */
let __instance__ = (function () {
  let instance

  return (newInstance) => {
    // 第一步 传入null, 不进行赋值, 第一次返回null, 根据该返回, 判断没有实例
    // 第二部 传入单例值, 进行实例赋值
    // 之后 每次调用之前传入null值, 如果传null, 不进行赋值, 返回上一次的实例值, 根据该返回, 判断是否已有实例
    if (newInstance) {
      instance = newInstance
    }
    return instance
  }
}())

const requestFnMap = {
  AJAX: 'ajaxRequest',
  ['vueResource'.toUpperCase()]: 'vueResourceRequest'
}

export default class Service {
  constructor (options = {}) {
    if (__instance__(null)) {
      return __instance__(null)
    }
    __instance__(this)

    this.isMock = options.isMock
    this.mocks = options.mocks
    this.beforeSend = options.beforeSend
    this.afterSend = options.afterSend
  }

  setReqInstance (xhrType, reqInstance) {
    this.xhrType = xhrType
    this.reqInstance = reqInstance
  }

  request (...rest) {
    const reqestFnName = requestFnMap[this.xhrType]
    const request = this[reqestFnName]
    
    if (typeof request === 'function') {
      return request.call(this, ...rest) 
    } else {
      console.error('xhrType错误, 未初始化正确 request 函数')
    }
  }

  // todo zepto ajax 兼容处理
  ajaxRequest ({ serviceParams, data }) {
    const { type } = serviceParams
    this.reqInstance({
      url,
      type,
      data,
      dataType,
      jsonp
    })
  }

  vueResourceRequest ({ serviceParams, data }) {
    if (!this.reqInstance) throw new Error('Service hasn\'t setReqInstance, Pelease var service = new Service() and service.setReqInstance(Vue.http)')

    let { type, url, options } = serviceParams
    const resourceFunc = this.reqInstance[type]

    // 两个参数的请求
    const isShort = SHORT_PARAMS_LIST.indexOf(type) > -1

    if (isShort) {
      let query = commonUtil.stringifyParams(data)
      url = url + (query ? `?${query}` : '')
      data = options
    }

    if (typeof resourceFunc === 'function') {
      return new Promise((resolve, reject) => {
        resourceFunc.call(this.reqInstance, url, data, options)
        .then((response) => {
          if (response.status === 200) {
            // 响应成功回调
            resolve(response);
          } else {
            reject(response);
          }
        }, reject)
      })
    } else {
      console.warn('this vue-resouce http function is not possible : ' + resourceFunc);
    }
  }

  getApiCollection (apiConfig) {
    const apiCollections = {}

    Object.keys(apiConfig).map((serviceName) => {
      const serviceParams = apiConfig[serviceName]

      apiCollections[serviceName] = (data = {}, options = {}, settings = {}) => {
        // 合并 应用层 options
        commonUtil.copy(true, serviceParams.options || {}, options)

        // 合并 应用层 settings
        Object.assign(serviceParams.settings || {}, settings)
        
        if (IS_DEV && this.isMock) this.mocks.intercept(serviceName, serviceParams)

        return this.requestDecorator(this.request)({ serviceParams, data })
      }
    })

    return apiCollections
  }

  requestDecorator (target) {
    const _request = target.bind(this)

    return ({ serviceParams, data }) => {
      const { autoLoading, errToast, beforeSend, afterSend } = serviceParams.settings

      typeof beforeSend === 'function' && beforeSend(serviceParams)
      this.beforeSend({ serviceParams, data })

      autoLoading && loading.show()

      return _request({ serviceParams, data })
        .then((response) => {
          autoLoading && loading.hide()

          typeof afterSend === 'function' && afterSend({ response })
          this.afterSend({ response })

          // dm_error等于0位成功
          if (+(response.body.dm_error) === 0) {
            return Promise.resolve(response.body)
          } else {
            const msg = response.body.error_msg
            assert('log', serviceParams.url, msg)

            return Promise.reject(response.body)
          }
        }, (err) => {
          autoLoading && loading.hide()

          assert('error', serviceParams.url, err)
          return Promise.reject(err)
        })
    }
  }

}

function assert (logType, requestUrl, msg) {
  console[logType](`[service request]: url -> ${requestUrl} , msg -> ${msg}`)
}