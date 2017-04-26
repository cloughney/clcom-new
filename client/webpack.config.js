'use strict';

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const project = require('./package.json');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const ENV_DEVELOPMENT = 'development';
const ENV_TESTING = 'testing';
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
	'react-router-dom',
	'redux',
	'react-redux'
];

const entries = isTesting ? {} : {
	'app': ['./src/index'],
	'bootstrap': bootstrapPackages
};

const corePlugins = [
	new webpack.LoaderOptionsPlugin({
		debug: isDevelopment
	}),
	new webpack.ProvidePlugin({
		'regeneratorRuntime': 'regenerator-runtime',
		//'Promise': 'bluebird', // because Edge browser has slow native Promise object
		//'$': 'jquery', // because 'bootstrap' by Twitter depends on this
		//'jQuery': 'jquery',
		//'window.jQuery': 'jquery' // this doesn't expose jQuery property for window, but exposes it to every module
	}),
	new HtmlWebpackPlugin({
		title: title,
		template: 'index.ejs',
		chunksSortMode: 'dependency'
	}),
	new ExtractTextPlugin({
		filename: 'style.css',
		allChunks: true
	}),
	new CopyWebpackPlugin([
		//{ from: 'favicon.ico', to: 'favicon.ico' },
		{ from: 'images', to: 'images' }
	]),
	new webpack.optimize.CommonsChunkPlugin({
		name: ['app', 'bootstrap']
	})
];

let envPlugins = [];
let devTools = [];

switch (ENV) {
	case ENV_DEVELOPMENT:
		envPlugins = [];
		devTools = ['#source-maps'];
		break;
	case ENV_TESTING:
		envPlugins = [];
		devTools = [];
		break;
	case ENV_PRODUCTION:
		envPlugins = [];
		devTools = [];
		break;
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
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.scss$/,
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
			use: 'url-loader?limit=100000&name=[name].[ext]'
		}]
	},

	plugins: corePlugins.concat(envPlugins),
	devtool: devTools.join(','),
	devServer: {
		contentBase: 'dist/',
		compress: false,
		noInfo: true,
		inline: true,
		historyApiFallback: true
	}
};
