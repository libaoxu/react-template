/**
 * 全局loading效果
 * 支持多模块loading
 * 
 * @example
 * 
 * import loading from 'components/loading'
 * loading.show('entry') | loading.show()
 * loading.hide('entry') | loading.hide()
 */

import flexible from 'utils/flexible'
import common from 'utils/common'

const dpr = flexible.dpr

const styles = {
  wrapper: `
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    z-index: 3888;`,

  outerChildStyle: (() => {
    let outerMarginSize = flexible.px2rem(35 * dpr)
    let outerWidthSize = flexible.px2rem(70 * dpr)
    
    return `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${outerWidthSize}rem;
      height: ${outerWidthSize}rem;
      margin-top: -${outerMarginSize}rem;
      margin-left: -${outerMarginSize}rem;
      background-color: rgba(0, 0, 0, .7);
      border-radius: ${flexible.px2rem(10 * dpr)}rem;
    `
  })(),

  innerChildStyle: (() => {
    let childMarginSize = flexible.px2rem(15 * dpr) + 'rem'
    let childWidthSize = flexible.px2rem(26 * dpr) + 'rem'
    
    return `
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -${childMarginSize};
      margin-left: -${childMarginSize};
      height: ${childWidthSize};
      width: ${childWidthSize};
      display: inline-block;
      border-radius: 999px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      border: ${2 * dpr}px solid #00d8c9;
      border-bottom-color: transparent;
      background-color: transparent;
      -webkit-animation: rotate 1.2s 0s linear infinite;
      animation: rotate 1.2s 0s linear infinite;
    `
  })()
}

const templateHTML = `<div style="${styles.wrapper}">
  <div style="${styles.outerChildStyle}">
    <div style="${styles.innerChildStyle}"></div>
  </div>
</div>`


// 单例
const __instance__ = (function () {
  let instance

  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance
  }
}())


const LOADING_ID = 'LOADING_ID'
const defaultLoadingMod = {
  /**
   * 等待队列
   * @type {Array}
   */
  queue: [],
  
  /**
   * 是否等待隐藏标识, 超时之后清空 
   * @type {Boolean}
   */
  isWait: false,

  /**
   * 超时定时器
   */
  timer: null
}

const _loadingMods = {
  [LOADING_ID]: common.copy(true, {}, defaultLoadingMod)
}

const TIME_OUT_NUM = 5000

// eslint-disable-next-line
export default new class AutoLoading {
  constructor () {
    if (__instance__(null)) return __instance__(null)
    __instance__(this)

    this.loadingElem = _createNode()

    document.body.appendChild(this.loadingElem)
    document.body.appendChild(_createStyle())
  }

  show (id) {
    id = typeof id === 'string' ? id : LOADING_ID
    const loadingMod = _loadingMods[id] || (_loadingMods[id] = common.copy(true, {}, defaultLoadingMod))
    const { queue, isWait } = loadingMod

    // 队里里面为0的时候, 开始阻止
    if (queue.length === 0) {
      this.preventDocumentDefault();
    }
    queue.push(1)
    this.loadingElem.style.display = 'block'

    if (!isWait) this.waitToHide(loadingMod);
  }

  waitToHide (loadingMod) {
    loadingMod.isWait = true

    clearTimeout(loadingMod.timer)

    loadingMod.timer = setTimeout(() => {
      clearTimeout(loadingMod.timer)

      // 隔5s如果, 队列还有长度, 标识请求超时等情况, 就清空队列并隐藏
      if (loadingMod.queue.length !== 0) {
        loadingMod.queue = []
        this.end(loadingMod);
      }
    }, TIME_OUT_NUM)
  }

  hide (id) {
    id = typeof id === 'string' ? id : LOADING_ID
    const loadingMod = _loadingMods[id]
    const { queue, isWait } = loadingMod

    queue.pop()

    if (queue.length > 0) {
      return false
    }

    this.end(loadingMod);
  }

  end (loadingMod) {
    loadingMod.isWait = false

    if (Object.keys(_loadingMods).every((key) => _loadingMods[key].queue.length === 0)) {
      this.removePreventDocument();
      this.loadingElem.style.display = 'none'
    }
  }

  returnFalse () {
    return false;
  }

  /**
   * 清除 页面中的默认事件 , 让你乱点
   */
  preventDocumentDefault () {
    let returnFalse = this.returnFalse;
    document.addEventListener('touchstart', returnFalse);
    document.addEventListener('touchmove', returnFalse);
    document.addEventListener('touchend', returnFalse);
  }

  removePreventDocument () {
    let returnFalse = this.returnFalse;
    document.removeEventListener('touchstart', returnFalse);
    document.removeEventListener('touchmove', returnFalse);
    document.removeEventListener('touchend', returnFalse);
  }

  getModById (id) {
    return _loadingMods[id]
  }
}


function _createNode () {
  const _node = document.createElement('div')

  _node.innerHTML = templateHTML

  _node.style.display = 'none'

  _node.addEventListener('touchstart', (e) => {
    e.preventDefault()
  })

  return _node
}

function _createStyle () {
  const _style = document.createElement('style')

  _style.innerText = `
    @-webkit-keyframes rotate {
      0% {-webkit-transform: rotate(0deg) scale(1);transform: rotate(0deg) scale(1);}
      50% {-webkit-transform: rotate(180deg) scale(1);transform: rotate(180deg) scale(1); }
      100% {-webkit-transform: rotate(360deg) scale(1);transform: rotate(360deg) scale(1); }
    }
  `

  return _style
}