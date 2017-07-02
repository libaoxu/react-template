export default {
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
    window.libaoxuJs.sendlibaoxuNativeInfo(msg)
  }
}