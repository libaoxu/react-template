import API from 'adapter'
import * as types from './action-types'
import observer from 'utils/observer'

const moduleName = 'bridge:'

let _shareOpts

const map = function (data, filter) {
  const target = {}
  for (var key in data) {
    let result = filter.call(this, key, data[key])
    if (result != null) {
      target[result] = data[key]
    } else {
      target[key] = data[key]
    }
  }
  return target
}

const _clientRightButton = {
  buttonText: '',
  /**
   * 1 表示默认小图片, window.sendlibaoxuJsInfo 执行分享功能
   * 0 表示自定义文字, window.sendlibaoxuJsInfo 执行回调函数逻辑
   */
  buttonImageType: 1,
  callback: function (response) {
    
  }
}

const events = {
  [types.ON_TITLE_RIGHT_BUTTON_CLICK]: []
}

const bridge = {
  actionTypes: types,

  setShareOpts (shareOpts) {
    _shareOpts = shareOpts
  },

  share (options) {
    const reflectKeys = {
      desc: 'msg',
      imgUrl: 'image',
      link: 'url'
    }
    
    const message = {
      action: types.SHARE_URL,
      data: map(options && typeof options === 'object' ? options : _shareOpts, (key) => {
        return reflectKeys[key]
      })
    }

    API.postmessage(message)
  },

  setTitleRightButton (clientRightButton) {
    const message = {
      action: types.SET_TITLE_RIGHT_BUTTON,
      data: Object.assign(_clientRightButton, clientRightButton)
    }

    API.postmessage(message)
  },

  rightButtonClick (info) {
    const response = typeof info === 'string' ? JSON.parse(info) : info

    switch (response.action) {
      case types.ON_TITLE_RIGHT_BUTTON_CLICK: 
        switch (_clientRightButton.buttonImageType) {
          /**
           * 用户自定义按钮, 走自己的callback逻辑
           */
          case 0:
            _clientRightButton.callback(response)
            break

          /**
           * 分享的逻辑
           */
          case 1:
            bridge.share(_shareOpts)
            break
        }

        break
      case types.PAGE_WAS_BACK_FORWARD: 
        window.location.reload(true)
        break
      default:
        console.log('msg.action is: ', msg.action)
    }

    observer.publish(moduleName + response.action, response)
  },

  /**
   * 对外暴露的订阅 客户端事件的 方法
   */
  subscribe (type, fn) {
    // 为observe增加命名空间, 防止多模块冲突
    observer.subscribe(moduleName + type, fn)
  },

  downloadUrl: 'https://api.busi.libaoxu.cn/open_app.html?pname=hallhot',

  getPersonalHomeUrlById (id) {
    return 'libaoxu://user=' + id + '&type=5&pname=personalhome'
  }
}


window.sendlibaoxuJsInfo = (info) => {
  /*
    *   初始化后，点击右上角按钮，客户端会自动调用此函数（必须是window的对象）
    *   info：客户端传回的参数，String json，如："{'action': 'setTitleRightButton'}"
    *
    *   1. 初始化后，点击右上角会返回：setTitleRightButton
    *
    *   2. 当发生页面跳转时，A→B，然后点击左上角返回，B→A，客户端并没有重新加载页面而是加载缓存的，
    *      客户端会监测页面是由点击了返回按钮出现的，重新调用此函数，返回：pageWasBackForward
    *
    * */
  bridge.rightButtonClick(info)
}

export default bridge