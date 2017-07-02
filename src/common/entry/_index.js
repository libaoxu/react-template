import 'common/less/base'

// import flexible from 'utils/flexible'
import $common from 'utils/common'
import loading from 'components/loading'
import Vue from 'vue'
import S from 'service'
// import vueProtoMix from './vueProtoMix'
// import shareInit from './shareInit'
// import userInit from './userInit'
// alert(lib.flexible.dpr)
const wx = window.wx

// 开始loading
loading.show('entry')

// Vue配置文件
Vue.config.productionTip = false

// 注册 VueResource
Vue.use(VueResource)

// 支持跨域
Vue.http.options.corssOrigin = true

// 初始化service
// S.$service.setReqInstance('VueResource'.toUpperCase(), Vue.http)

// 初始化用户信息
const userInfo = userInit()

// 注册Vue.prototype的混合
vueProtoMix(Vue)

// 异步绑定fastclick
require.ensure([], function (require) {
  require('fastclick').attach(document.body)
})

// 页面加载完成监听
document.addEventListener('DOMContentLoaded', (e) => {
  // 结束loading
  loading.hide('entry')
})

const defaultOpts = {
  /**
   * 默认为null, 需要VueRouter的实例对象
   */
  router: null,

  /**
   * 默认为null, 需要Vuex.Store的实例对象
   */
  store: null,
  beforeInstance: $common.noop
}

/**
 * 
 */
export default (App, Options) => {
  Options = Object.assign(defaultOpts, Options)
  const { router, store, shareOpts, clientRightButtonOpts } = Options
  
  // 初始化分享
  // shareInit({ shareOpts, clientRightButtonOpts })

 
}