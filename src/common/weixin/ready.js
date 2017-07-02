import S from 'service'
import * as apis from './apis'
import user from 'user'

S.$extend(apis)

const wx = window.wx
let _resolve
let _reject

const promise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

/**
 * @example https://mp.weixin.qq.com/wiki
 */
const wxConfig = {
  /**
   * 是否调试
   */
  debug: false,

  /**
   * 需要使用的JS接口列表
   */
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo', 'getNetworkType'],

  /**
   * 公众号的唯一标识
   */
  appId: '',

  /**
   * 生成签名的时间戳
   */
  timestamp: '',

  /**
   * 生成签名的随机串
   */
  nonceStr: '',

  /**
   * 签名
   */
  signature: ''
}

export default (options) => {
  // 如果用户登录, 表示在客户端里, 不初始化微信
  if (user.isLogin) {
    return Promise.resolve()
  } else {
    return S.WX_GET_SHARE_CONFIG()
    .then(({ data }) => {
      wx.config(Object.assign(wxConfig, data, {
        appId: data.appid,
        nonceStr: data.noncestr
      }))

      wx.ready(_resolve)
      wx.error((err) => {
        console.error('weixin config error : ' + JSON.stringify(err))
      })

      return promise
    }, (err) => {
      if (err) {
        console.error('微信配置参数初始化失败')
      }
    })
  }
}