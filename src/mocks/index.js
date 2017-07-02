import Mock from 'mockjs'

import demo from './demo'
import innerapp from './innerapp'

const mockObj = Object.assign({}, 
  demo,
  innerapp
)
// console.log(mockObj)
export default {
  intercept (key, params) {
    let mockItem = mockObj[key]
	
    mockItem && Mock.mock(mockItem.url, mockItem.type, function () {
      let template = mockItem.template

      return typeof template === 'function' ? template(params) : template
    })
  }
}