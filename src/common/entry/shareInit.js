/**
 * @file 执行wx jsapi 默认应用
 */

import weixin from 'weixin'
import $bridge from 'bridge'
import user from 'user'

const _shareOpts = {
  title: 'title',
  desc: 'desc',
  imgUrl: '',
  link: 'https://github.com/libaoxu'
}

const shareMap = {
  /**
   * @params {Object} options 客户端右上角分享按钮的参数
   */
  client (...rest) {
    $bridge.setTitleRightButton(...rest)
  },

  wx (options) {
    const $wx = weixin()
    
    $wx.onMenuShareAppMessage(options)
    $wx.onMenuShareTimeline(Object.assign({}, options, {
      title: options.desc,
      desc: options.title
    }))
    $wx.onMenuShareQQ(options)
    $wx.onMenuShareQZone(options)
  }
}

export default ({ shareOpts, clientRightButtonOpts }) => {
  // 默认分享信息
  if (shareOpts) {
    shareOpts = Object.assign(_shareOpts, shareOpts)
  } else {
    shareOpts = _shareOpts
  }

  // 用户登录状态
  if (user.isLogin) {
    // 登录, 设置客户端右上角按钮
    if (shareOpts || clientRightButtonOpts) {
      // 分享 || 按钮
      $bridge.setShareOpts(shareOpts)
      shareMap.client(clientRightButtonOpts)
    }
  } else {
    // 退出, 微信二次分享
    if (Object.keys(weixin()).length) {
      // 分享
      shareMap.wx(shareOpts)
    }
  }
}
