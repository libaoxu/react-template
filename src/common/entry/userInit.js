import $common from 'utils/common'
import user from 'user'


export default () => {
  const userInfo = {
    uid: $common.getUrlQuery('uid'),
    sid: $common.getUrlQuery('sid'),
    publisher: $common.getUrlQuery('publisher'),
    from: $common.getUrlQuery('from'),
    zhubo: false,
    yonghu: false,
    isLogin: false,
    userType: null
  }

  const { uid, sid, publisher, from } = userInfo

  if (uid && sid) {
    userInfo.isLogin = true
    
    if (uid === publisher) {
      userInfo.userType = 'zhubo'
    } else {
      userInfo.userType = 'yonghu'
    }
    
    if (userInfo.userType) {
      userInfo[userInfo.userType] = true
    }
  } 

  if (from) {
    userInfo[from] = true
  }

  user.set(userInfo)

  return userInfo
}