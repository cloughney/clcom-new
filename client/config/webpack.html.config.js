import HtmlWebpackPlugin from 'html-webpack-plugin';

export function getPlugins(env) {
	return [
		createPagePlugin('html/index.hbs', ['libs', 'index'], env, { options: { pageName: 'showcase' } }),
		createPagePlugin('html/resume.hbs', [], env, { options: { pageName: 'resume' } })
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
			'showcase': { href: '/', isActive: pageName === 'showcase' },
			'resume': { href: createEnvironmentLink('/resume.html', env), isActive: pageName === 'resume' },
			'blog': { href: '//blog.chrisloughney.com' },
			'github': { href: '//github.com/cloughney' },
			'linkedin': { href: '//www.linkedin.com/pub/christopher-loughney/5a/363/6b/' },
			'download-resume': { href: 'https://cloud.krik.co/s/5QUvghOZiUD3uUe' }
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
