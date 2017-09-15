process.env.NODE_ENV = 'test';

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],

    files: [
      'test/**/*.ts',
      'test/**/*.tsx'
    ],

    exclude: [],

    preprocessors: {
      '**/*.ts': ['webpack'],
      '**/*.tsx': ['webpack']
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,

    webpack: require('./webpack.config')
  })
}
