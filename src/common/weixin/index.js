import ready from './ready'

const wx = window.wx

let isResovleInstance = false
let initInstance = false
let _middleware

const getMiddleware = (wxConfigPromise, wx) => {
  const middleware = {}
  Object.keys(wx).forEach((method) => {
    middleware[method] = (...args) => {
      if (isResovleInstance) {
        wx[method](...args)
      } else {
        wxConfigPromise.then(() => {
          isResovleInstance = true
          wx[method](...args)
        })
      }
    }
  })
  
  return middleware
}


/**
 * 第一次加载时候, 去进行微信相关配置, 之后返回一个单例对象
 */
export default (...args) => {
  if (_middleware) {
    return _middleware
  }

  // 只有当wx存在时候才初始化
  if (wx) {
    /**
     * 微信配置项的promise对象
     * @type {Promise}
     */
    const wxConfigPromise = ready(...args);
    return (_middleware = getMiddleware(wxConfigPromise, wx))
  }

  return {}
}