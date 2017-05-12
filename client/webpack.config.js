'use strict';

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const project = require('./package.json');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const ENV_DEVELOPMENT = 'development';
const ENV_TESTING = 'test';
const ENV_PRODUCTION = 'production';

const isDevelopment = ENV === ENV_DEVELOPMENT;
const isTesting = ENV === ENV_TESTING;
const isProduction = ENV === ENV_PRODUCTION;

const title = 'Chris Loughney';
const baseUrl = '/';

const paths = {
	root: path.resolve(),
	src: path.resolve('src'),
	out: path.resolve('dist')
};

const bootstrapPackages = [
	'./style/site.scss',
	'react',
	'react-dom',
	'react-router-dom'
];

const entries = isTesting ? undefined : {
	'index': ['./src/index'],
	'playground': ['./src/playground'],
	'bootstrap': bootstrapPackages
};

const corePlugins = [
	new webpack.LoaderOptionsPlugin({
		debug: isDevelopment
	})
];

let envPlugins = [];
let devTools = [];
let externals = [];

if (!isTesting) {
	envPlugins = envPlugins.concat([
		new webpack.ProvidePlugin({
			'regeneratorRuntime': 'regenerator-runtime'
		}),
		new HtmlWebpackPlugin({
			title: title,
			filename: 'index.html',
			template: 'html/index.ejs',
			chunks: [ 'bootstrap', 'index' ],
			chunksSortMode: 'dependency',
			isDevelopment
		}),
		new HtmlWebpackPlugin({
			title: title,
			filename: 'playground.html',
			template: 'html/playground.ejs',
			chunks: [ 'bootstrap', 'playground' ],
			chunksSortMode: 'dependency',
			isDevelopment
		}),
		new HtmlWebpackPlugin({
			title: title,
			filename: 'resume.html',
			template: 'html/resume.ejs',
			chunks: [ 'bootstrap' ],
			chunksSortMode: 'dependency',
			isDevelopment
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'bootstrap']
		}),
		new CopyWebpackPlugin([
			//{ from: 'favicon.ico', to: 'favicon.ico' },
			{ from: 'images', to: 'images' }
		])
	]);

	if (isProduction) {
		envPlugins = envPlugins.concat([new webpack.optimize.UglifyJsPlugin()]);
	}
} else {
	externals = {
		'cheerio': 'window',
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react',
	}
}

module.exports = {
	entry: entries,

	output: {
		path: paths.out,
		filename: '[name].js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.html']
	},

	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: [path.resolve('node_modules')],
			use: 'awesome-typescript-loader'
		}, {
			test: /\.css$/,
			exclude: [path.resolve('node_modules')],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.scss$/,
			exclude: [path.resolve('node_modules')],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'sass-loader',
					options: {
						includePaths: ['./node_modules']
					}
				}]
			})
		}, {
			test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)(\?\S*)?$/,
			//exclude: [path.resolve('node_modules')],
			use: 'url-loader?limit=100000&name=[name].[ext]'
		}, {
			test: /\.ejs$/,
			exclude: [path.resolve('node_modules')],
			use: 'ejs-loader'
		}]
	},

	plugins: corePlugins.concat(envPlugins),
	devtool: devTools.join(','),
	externals,

	devServer: {
		contentBase: 'dist/',
		compress: true,
		noInfo: true,
		inline: true,
		historyApiFallback: true
	}
};
