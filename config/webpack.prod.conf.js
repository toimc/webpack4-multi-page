const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigProd = {
	mode: 'production', // 通过 mode 声明生产环境

	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: 'js/[name].[hash].js',
		publicPath: '../'
	},
	
	// devtool: 'cheap-module-eval-source-map',	// 就是这行代码导致注释无法去除

	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					warnings: false,
					compress: {
						warnings: false,
						// 是否注释掉console
						drop_console: false,
						dead_code: true,
						drop_debugger: true,
					},
					output: {
						comments: false,
						beautify: false,
					},
					mangle: true,
				},
				parallel: true,
				sourceMap: false,
			}),
			//压缩css
			new OptimizeCSSPlugin({
				cssProcessorOptions: {
					safe: true
				}
			}),
		],
	},

	plugins: [
		//删除dist目录
		new CleanWebpackPlugin({
			verbose: true, //开启在控制台输出信息
		}),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
		}),
		// 分离css插件参数为提取出去的路径
		new extractTextPlugin({
			filename: 'css/[name].[hash:8].min.css',
		}),
	]

}

module.exports = merge(webpackConfigBase, webpackConfigProd)