import config from './config'
import srcConfig from 'src/config'
import * as utils from './utils'
import mocks from 'mocks'
import $common from 'utils/common'

import Service from './service'

/** 返回api集合
 * import S from 'service'
 * S.login({password:'xxx', username:'damon'})
 *  .then(ret => {console.log(ret)})
 *  .catch(err => {console.log(err)})
 */

const service = new Service({
  isMock: srcConfig.build.IS_MOCK,

  mocks,
  
  beforeSend ({ serviceParams, data }) {
    const { settings } = serviceParams
    const _data = {}

    /**
     * 与服务端名称统一, 所以用s_sg 非驼峰
     */
    const { uid, sid, s_sg } = settings
    const urlParams = $common.getUrlParams()

    const mixIds = (arr) => {
      arr.forEach((id) => {
        if (urlParams[id] != null) {
          _data[id] = urlParams[id]
        }
      })
    }

    /**
     * 获取用户信息
     * 不传 uid => 自动获取 url 中 uid & sid
     */
    if (uid && sid && !data.uid) {
      mixIds([uid, sid])
    }
    
    // s_sg => 防刷处理 config.js
    // eslint-disable-next-line
    if (s_sg) {
      mixIds(s_sg)
    }

    // 修改data, 通过地址引用
    Object.assign(data, _data)
  },

  afterSend ({ serviceName, data }) {

  }
})

Object.defineProperties(Service, {
  $service: {
    ...config.definePropertySet,
    value: service
  },
  $extend: {
    ...config.definePropertySet,
    value: function $extend (obj) {
      return Object.assign(this, service.getApiCollection(obj))
    }
  }
})


export default Service