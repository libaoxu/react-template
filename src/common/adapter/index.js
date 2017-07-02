import android from './android'
import ios from './ios'
import mock from './mock'
import $common from 'utils/common'
import decorator from './decorator'

let API

if ($common.ua.android && window.libaoxuJs) {
  API = android
} else if ($common.ua.ios && window.webkit && window.webkit.messageHandlers) {
  API = ios
} else {
  API = mock
}
 
export default decorator(API)