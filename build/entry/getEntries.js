var path = require('path')
var fs = require('fs')
var glob = require('glob')
var config = require('../config')
var views = config.views

function getDevEntries(hotMiddlewareScript) {

	/**
	 * 获取入口对象
	 * @param {Object} views src/pages下的路由配置对象
	 * @param {String} superKey 上一层目录key名, 如果没有默认为空字符串
	 * @return {Object} 入口信息的map集合
	 */
	function getEntriesFromViews(views, superKey, entries) {
		// superKey没有值, 说明没有上层目录,
		superKey = superKey || ''
    entries = entries || {}

		for (var key in views) {
			// 每个key标识src文件目录
			var val = views[key]
			if (val.views && val.views.constructor === Object) {
				getEntriesFromViews(val.views, superKey + key + '/', entries)
			} else {
				setKeyToEntries(superKey + key, entries)
			}
		}

		return entries
	}

	/**
	 * 将当前路由文件设置到入口集合中
	 * @param {String} curKey 当前路由文件路径
	 * @param {Object} entries 入口集合map值
	 */
	function setKeyToEntries (curKey, entries) {
		var pattern = config.sourcePath + '/pages/' + curKey + '/index.js'
		// var newObj = {}

		if (hotMiddlewareScript) {
			entries[curKey] = [pattern, hotMiddlewareScript]
		} else {
			entries[curKey] = pattern
		}
		// return newObj
	}

	return getEntriesFromViews(views)
}

module.exports = getDevEntries