const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
	entry: './src/main.ts',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		host: 'localhost',
		port: '3333'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'three.js'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					name: 'chunk-common',
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0,
					priority: 1,
					reuseExistingChunk: true,
					enforce: true
				},
				vendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					priority: 2,
					reuseExistingChunk: true,
					enforce: true
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	}
}
