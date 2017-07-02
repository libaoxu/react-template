import loading from 'components/loading'
import { MessageBox, Toast } from 'mint-ui'
import weixin from 'weixin'
import $bridge from 'bridge'
import $common from 'utils/common'
import $log from 'utils/log'
import $user from 'user'
import S from 'service'

const staicMixMap = {
  // 基础必备ui组件们
  $messagebox: MessageBox,
  $toast: Toast,
  $loading: loading,

  // 用户信息
  $user: $user,

  // 数据通信层
  $S: S,

  // 客户端桥阶层
  $bridge: $bridge,

  // 通用工具方法
  $common: $common,

  // 埋点统计
  $log: $log
}

export default (Vue, more = {}) => {
  const mixMap = {
    ...staicMixMap,

    // 微信jsapi
    $wx: weixin()
  }

  const mix = (source, key, val) => {
    if (source[key]) {
      mix(source, `_${key}`, val)
    } else {
      source[key] = val
    }
  }

  Object.keys(mixMap).map((key) => {
    let val = mixMap[key]
    mix(Vue, key, val)
    mix(Vue.prototype, key, val)
  })
}