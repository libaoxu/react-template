<!--
  页面跳转hash值
  不依赖 vue-router
  libx@libaoxu.cn 2017-06-17
-->

<script>
import $common from 'utils/common'

export default {
  
  mixins: [],

  props: {  
    host: {
      type: String
    },
    to: {
      type: String | Object
    }
  },

  computed: {
    path () {
      const to = this.to
      return typeof to === 'string' ? to : (typeof to === 'object' && to.path) || ''
    },

    query () {
      const to = this.to
      return to && typeof to === 'object' && to.query || {}
    }
  },

  render (h) {
    const defaultHost = location.origin + location.pathname
    const path = '#/' + this.path
    const query = $common.stringifyParams(this.query || {})
    // 因为ios 会将hash值转码, 所以首次出现的链接中, 不能出现 #hash
    // 普通hash值处理顺序 location.href = origin + pathname + hash +  search
    // 本链接处理的顺序 location.href = origin + pathname + search + hash
    const href = (this.host || defaultHost) + (query ? `?${query}` : '') + path

    return <a on-click={(e) => { this.$emit('on-click', e) }} href={href}>{this.$slots.default}</a>
  }
}

</script>
