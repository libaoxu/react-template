
<script>
import S from 'service'
import './app.less'

export default {
  name: 'app',

  methods: {
    APP_USER_INFO () {
      return S.APP_USER_INFO({
        sid: '20m3503a2wgUMAoNi20LGkCnj5um0xVWNgXjRjd51vR7z1i1',
        uid: '262960'
      }) 
    },

    serviceRequest (e) {
      this.$store.dispatch('APP_CLICK', e)

      this.$messagebox.confirm('are you ready?')
      .then(() => {
        return this.APP_USER_INFO()   
      })
      .then((data) => {
        // this.$toast
        this.$toast({
          message: data.username,
          duration: 3000
        })
        console.log('APP_USER_INFO', data)
      })
    },

    onBridge () {
      const bridge = this.$bridge
      bridge.subscribe(bridge.actionTypes.ON_TITLE_RIGHT_BUTTON_CLICK, (info) => {
        console.log('bridge ON_TITLE_RIGHT_BUTTON_CLICK: ', info)
      })
    }
  },

  mounted () {
    // this.APP_USER_INFO({target: 'service'})

    this.onBridge()
  },

  render (h) {
    return <div class="app">
      <img src={require('assets/images/demo/logo.png')}/>
      <router-view on-hello-vue={(e) => { console.log(e) }}></router-view>
      <br/>
      <div class="box-outer">
        <div class="box" on-click={this.serviceRequest}>serviceRequest</div>
      </div>
      <br/>
      <div class="border-test">
        border-test
      </div>
    </div>
  }
}
</script>

