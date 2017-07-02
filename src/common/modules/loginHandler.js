export default {
  methods: {
    beforeClickHandler (e) {
      const isLogin = this.$user.get().isLogin
      // 如果用户 未登录状态
      if (!isLogin) {
        this.$messagebox.confirm('在“映客”中打开').then(() => {
          window.location.href = this.$bridge.downloadUrl
        })
        e && e.preventDefault()
      }
      return isLogin
    }
  }
}