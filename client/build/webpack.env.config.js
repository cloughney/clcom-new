const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const ENV_DEVELOPMENT = 'development';
const ENV_TESTING = 'test';
const ENV_PRODUCTION = 'production';

const isDevelopment = ENV === ENV_DEVELOPMENT;
const isTesting = ENV === ENV_TESTING;
const isProduction = ENV === ENV_PRODUCTION;

export default {
	name: ENV,
	isDevelopment,
	isTesting,
	isProduction
};
