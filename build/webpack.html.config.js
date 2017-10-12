import HtmlWebpackPlugin from 'html-webpack-plugin';

export function getPlugins(env) {
	return [
		createPagePlugin('html/resume.hbs', [], env, { filename: 'index.html', options: { pageName: 'resume' } }),
		createPagePlugin('html/showcase.hbs', ['react', 'showcase'], env, { options: { pageName: 'showcase' } })
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
	pageName = undefined
} = {}) {
	return {
		includeDevServer: env.isDevelopment,
		links: {
			'resume': { href: createEnvironmentLink('/', env), isActive: pageName === 'resume' },
			'showcase': { href: '/showcase.html', isActive: pageName === 'showcase' },
			'blog': { href: '//blog.chrisloughney.com' },
			'github': { href: '//github.com/cloughney' },
			'linkedin': { href: '//www.linkedin.com/pub/christopher-loughney/5a/363/6b/' },
			'download-resume': { href: 'https://cloud.krik.co/s/5QUvghOZiUD3uUe/download' }
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
