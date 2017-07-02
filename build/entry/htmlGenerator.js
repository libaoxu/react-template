/**
 * html生成器, 会根据src/views/views.js中的文件夹进行匹配, 生成对应的key.html
 * 访问时直接在域名后面输入key.html
 * @author libx@libaoxu.cn 20160525
 * 
 * @example
 * http://localhost:8081/demo.html
 */

var fs = require('fs')
var path = require('path')
var config = require('../config')
var srcConfig = config.srcConfig
var HtmlWebpackPlugin = require('html-webpack-plugin')
var argv = process.argv.splice(2)

var views = config.views;
// 根据不同的开发环境, 进行一些assetPath 等配置
var onlineConfig;
if (process.env.NODE_ENV === 'production') {
	onlineConfig = config.build;
} else {
	onlineConfig = config.dev;
}


var htmlGenerator = function (update) {

	// for (var key in views) {
	// 	var re = new RegExp("(.{" + key.lastIndexOf('/') + "})");

	// 	var jsFile = key;//.replace(re, 'src/pages/$1');
	// 	console.log(key, jsFile);
	// 	setHtmlWebpackPlugin(key, jsFile)	
	// }
	
	/**
	 * 获得具有 HtmlWebpackPlugin 的入口集合
	 * 
	 * @param {Object} views src/pages下的路由配置对象
	 * @param {String} superKey 上一层目录key名, 如果没有默认为空字符串
	 * @return {Array} result 每个页面的HtmlWebpackPlugin组成的数组
	 */
	function getHTMLPulginsEntrys(views, superKey, result) {
		superKey = superKey || '';
		result = result || [];
		for (var key in views) {
			// 每个key标识src文件目录
			var val = views[key];
			if (val.views && val.views.constructor === Object) {
				// superKey没有值, 说明没有上层目录,
				getHTMLPulginsEntrys(val.views, superKey + key + '/', result);
			} else {
				result.push(getHtmlWebpackPluginInstance(superKey, key, val));
			}
		}
		return result;
	}

	/**
	 * 获得该页面配置信息的 HtmlWebpackPlugin 实例对象
	 * 
	 * @param {String} superKey 上一层目录key名, 如果没有默认为空字符串
	 * @param {String} key 当前页面key
	 * @param {Object} curView 当前页面的配置信息
	 * @return {HtmlWebpackPlugin} HtmlWebpackPlugin实例对象
	 */
	function getHtmlWebpackPluginInstance(superKey, key, curView) {
		var curkey = (superKey || '') + key;
		var conf = {
			// html 文件也加戳, 防止缓存
			filename: curkey + '.html?v=' + new Date().getTime(),
			template: path.join(__dirname, './entry.ejs'),
			inject: true,
			chunks: [curkey, 'vendor', 'common',, 'lib', 'manifest'],
			minify: {
				removeAttributeQuotes: true,
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				collapseWhitespace: true,
			},
			chunksSortMode: 'dependency',
			params: Object.assign({
				id: curkey,
				update: update,
				env: process.env.NODE_ENV,
				argv: argv,
				onlineConfig: onlineConfig,
				srcConfig: srcConfig
			}, curView)
		}

		return new HtmlWebpackPlugin(conf);
	}

	return getHTMLPulginsEntrys(views)
};

module.exports = htmlGenerator;