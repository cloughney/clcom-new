import HtmlWebpackPlugin from 'html-webpack-plugin';

export function getPlugins(env) {
	return [
		createPagePlugin('html/index.hbs', ['libs', 'index'], env),
		createPagePlugin('html/showcase.hbs', ['libs', 'showcase'], env, { options: { compressBanner: true } }),
		createPagePlugin('html/resume.hbs', [], env, { options: { compressBanner: true } })
	];
}

function createEnvironmentLink(link, env) {
	if (!env.isProduction) {
		return link;
	}

	if (/.html$/.test(link)) {
		return link.substring(0, link.lastIndexOf('.'));
	}
}

function getPageConfig(env, {
	compressBanner = false
} = {}) {
	return {
		compressBanner,
		includeDevServer: env.isDevelopment,
		links: {
			'home': '/',
			'blog': '//blog.chrisloughney.com',
			'showcase': createEnvironmentLink('/showcase.html', env),
			'resume': createEnvironmentLink('/resume.html', env),
			'github': '//github.com/cloughney',
			'linkedin': '/www.linkedin.com/pub/christopher-loughney/5a/363/6b/'
		}
	};
}

function createPagePlugin(template, chunks, env, {
	title = 'Chris Loughney',
	filename,
	options
} = {}) {
	if (!filename) {
		let matches = template.match(/(.*\/)?(.*)\.hbs$/);
		filename = matches.pop() + '.html';
	}

	return new HtmlWebpackPlugin({
		title,
		filename,
		template,
		chunks,
		chunksSortMode: 'dependency',
		pageOptions: getPageConfig(env, options)
	});
}
