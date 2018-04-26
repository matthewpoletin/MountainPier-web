"use strict";

const config = require("./../../config");

/**
 * getEnvironment - Returns the current environment, or development by default
 * @returns {string}
 */
export const getEnvironment = () => {
	return process.env.NODE_ENV
		? process.env.NODE_ENV
		: 'development';
};

/**
 * getApiUrl  - Returns the URL for the api, given the current environment
 * @returns {string}
 */
export const getApiUrl = () => {
	switch (getEnvironment()) {
		case 'production':
			return config.prod.apiUrl;
		case 'development':
		default:
			return config.dev.apiUrl;
	}
};

/**
 * getAppUrl  - Returns the URL for the app, given the environment
 * @returns {string}
 */
export const getAppUrl = () => {
	switch (getEnvironment()) {
		case 'production':
			return config.prod.appUrl;
		case 'development':
		default:
			return config.dev.appUrl;
	}
};
