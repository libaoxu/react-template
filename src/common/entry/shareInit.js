/**
 * @file 执行wx jsapi 默认应用
 */

import weixin from 'weixin'
import $bridge from 'bridge'
import user from 'user'

const _shareOpts = {
  title: '上映客 直播我',
  desc: '映客直播，实时、高清、快捷、流畅的视频直播平台，中国全新的视频社交媒体，明星大咖、网络红人、时尚娱乐、视频交友、高颜值等尽在映客直播app。',
  imgUrl: 'http://img2.libaoxu.cn/MTQ4NzE2NjY1Mzc4OSMxNDYjanBn.jpg',
  link: 'https://3g.libaoxu.cn'
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
