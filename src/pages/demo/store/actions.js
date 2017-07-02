/**
 * 事件分发
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 接收与 store 实例具有相同方法和属性的 context 对象
 *
 * @example
 * export const APP_CLICK = ({ commit, state }, payload) => {
 *   commit(TYPES.APP_CLICK, payload)
 * };
 */
import * as types from './mutation-types';

export const APP_CLICK = ({ commit, state }, payload) => {
  // console.log(payload)
  commit(types.APP_CLICK, payload)
}