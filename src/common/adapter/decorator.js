/**
 * 适配层代理, 拦截android 或 ios 暴露出来的方法, 处理统一逻辑
 */


const decoratorTables = {
  /**
   * 给客户端发送信息
   * @param {Object | String} msg 客户端通信信息
   * 1 默认是字符串, 如果是对象, 需要转为字符串
   * 2 根据不同的action, 会有不同的data
   * {
   *  action: 'shareUrl',
   *  data: {
   *    url: '',
   *    title: '',
   *    msg: '',
   *    desc: '',
   *  }
   * }
   */
  postmessage (msg) {
    if (!msg) return

    if (msg && typeof msg === 'object') {
      msg = JSON.stringify(msg)
    }
    
    decoratorTables.postmessage.__origin(msg)
  }
}

export default (API) => {
  Object.keys(decoratorTables).forEach((fnName) => {
    const _func = API[fnName]
    const _decorator = decoratorTables[fnName]

    if (_func) {
      _decorator.__origin = API[fnName]
      API[fnName] = _decorator
    }
  })

  return API
}