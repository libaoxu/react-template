/**
 * 存储用户信息
 * 
 * @example 
 * import user from 'user'
 * 
 * const userInfo = user.get()
 * 
 * userInfo.sid
 * userInfo.uid
 * 
 * user.isLogin
 * 
 * user.set({ sid: '', uid: '' })
 */

// let userInfo = {
//   sid: '',
//   uid: ''
// }

let userInfo

const user = {
  get () {
    return userInfo
  },

  set (info) {
    if (info && info.constructor === Object) {
      if (userInfo) {
        // 不改变地址引用
        Object.assign(userInfo, info)
      } else {
        userInfo = info
      }
    }

    if (userInfo.sid && userInfo.uid) {
      user.isLogin = true
    }
  },

  getMock () {
    return {
      uid: '262960',
      sid: '20m3503a2wgUMAoNi20LGkCnj5um0xVWNgXjRjd51vR7z1i1'
    }
  },

  isLogin: false
}


export default user