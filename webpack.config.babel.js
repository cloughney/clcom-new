'use strict';

import webpack from 'webpack';
import * as path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
//import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

import * as project from './package.json';

import env from './build/webpack.env.config';
import { getPlugins as getHtmlPlugins } from './build/webpack.html.config';

const paths = {
	root: path.resolve(),
	src: path.resolve('src'),
	out: path.resolve('dist')
};

const entries = env.isTesting ? undefined : {
	'style': ['./style/site.scss'],
	'showcase': ['./src/pages/showcase'],
	'react': [
		'react',
		'react-dom',
		'react-router-dom'
	]
};

const plugins = [
	new webpack.LoaderOptionsPlugin({
		debug: env.isDevelopment
	})
];

const externals = {};

if (env.isTesting) {
	externals['cheerio'] = 'window';
	externals['react/addons'] = 'react';
	externals['react/lib/ExecutionEnvironment'] = 'react';
	externals['react/lib/ReactContext'] = 'react';
} else {
	plugins.push.apply(plugins, [
		new webpack.ProvidePlugin({
			'regeneratorRuntime': 'regenerator-runtime'
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'react',
			minChunks: Infinity
		}),
		new CopyWebpackPlugin([
			//{ from: 'favicon.ico', to: 'favicon.ico' },
			{ from: 'images', to: 'images' }
		]),
		//new TsConfigPathsPlugin()
	]);

	plugins.push.apply(plugins, getHtmlPlugins(env));

	if (env.isProduction) {
		plugins.push.apply(plugins, [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin()
		]);
	}
}

module.exports = {
	entry: entries,
	plugins,
	externals,

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
					loader: 'css-loader',
					options: {
						minimize: true,
						sourceMap: env.isDevelopment
					}
				}, {
					loader: 'sass-loader',
					options: {
						includePaths: ['./node_modules']
					}
				}]
			})
		}, {
			test: /\.hbs$/,
			exclude: [path.resolve('node_modules')],
			use: {
				loader: 'handlebars-loader',
				options: {
					helperDirs: path.resolve('html/helpers')
				}
			}
		}, {
			test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)(\?.*)?$/,
			include: [
				path.resolve('node_modules/bootstrap'),
				path.resolve('node_modules/font-awesome'),
				path.resolve('images')
			],
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: '[name].[ext]'
				}
			}
		}]
	},

	devServer: {
		contentBase: 'dist/',
		compress: true,
		noInfo: true,
		inline: true,
		historyApiFallback: true
	}
};
