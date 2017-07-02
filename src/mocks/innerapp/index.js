import Mock from 'mockjs'
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// console.log(data)

const PROXYGET = {
  url: /\/service\/proxy/,
  type: 'get',
  template: {
    'dm_error': 0,
    'error_msg': '操作成功',
    'data': {
      'err_code': 0,
      'ack_time': 10,
      'end_time': 10,
      'max_bonus': 100,
      'progress': '0/6',
      'alert_msg': '哈哈'
    }
  }
}


export default {
  PROXYGET
}