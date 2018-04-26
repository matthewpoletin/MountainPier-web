"use strict";

import { POST, PUT, PATCH, GET, DELETE } from './methods';
import { getApiUrl, getEnvironment } from './environment-utils';
import { getCookie } from "./cookie-utils";

/**
 * logError - Log error without UI display
 * @param {object} error - Error object caught in catch block
 * @param {string} type - Action type that caused error
 * @returns {Promise}
 */
export const logError = (error, type) => {
	if (getEnvironment() === 'development') {
		console.error(`Error type: ${type}.`);
		console.error(error);
	}
	const errorMessage = error && error.response
		? error.response.data
		: error;
	return Promise.reject(errorMessage);
};

/**
 * httpUtils - Generic action to make an http request with fetch
 * @param {string} requestType - Type of http request to make (e.g., GET, POST, PATCH, DELETE)
 * @param {string} path - Api endpoint to hit (e.g., '/auth/login')
 * @param {object} opts - Object of options
 * @param {object} [opts.data] - Data to be posted to the api
 * @param {object} [opts.headers] - Headers to append to request
 * @param {object} [opts.requiresAuth] - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
const httpUtils = (requestType = GET, path, opts = {}) => {
	return new Promise((resolve, reject) => {
		const headers = new Headers();
		if (opts.requiresAuth) {
			const accessToken = getCookie("access-token");
			headers.append("Access-Token", accessToken);
		}
		// headers.append("Accept", "application/json");
		if (opts.data !== {}) {
			headers.append("Content-Type", "application/json");
		}
		return fetch(getApiUrl() + path, {method: requestType, headers: headers, mode: "cors", body: JSON.stringify(opts.data) })
			.then(response => {
				if (response.status.toString(10)[0] !== "2") {
					console.error(requestType.toUpperCase() + "request to " + getApiUrl() + " , option " + JSON.stringify(opts) + " failed, status " + response.status);
					return reject(new Error(""));
				}
				return response.json();
			})
			.then(body => resolve(body))
			.catch(error => reject(error));
	});
};

/**
 * get - Generic action to make a GET request with fetch
 * @param {string} path - Api path to hit (e.g., '/user')
 * @param {boolean} requiresAuth - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
export const get = (path, requiresAuth) =>
	httpUtils(GET, path, { requiresAuth });

/**
 * post - Generic action to make a POST request with fetch
 * @param {string} path - Api path to hit (e.g., '/auth/login')
 * @param {object} data - Data to be posted to the api
 * @param {boolean} requiresAuth - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
export const post = (path, data, requiresAuth) =>
	httpUtils(POST, path, { data, requiresAuth });

/**
 * put - Generic action to make a PUT request with fetch
 * @param {string} path - Api path to hit (e.g., '/user/:userId')
 * @param {object} data - Data to be posted to the api
 * @param {boolean} requiresAuth - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
export const put = (path, data, requiresAuth) =>
	httpUtils(PUT, path, { data, requiresAuth });

/**
 * patch - Generic action to make a PATCH request with fetch
 * @param {string} path - Api path to hit (e.g., '/user/:userId')
 * @param {object} data - Data to be posted to the api
 * @param {boolean} requiresAuth - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
export const patch = (path, data, requiresAuth) =>
	httpUtils(PATCH, path, { data, requiresAuth });

/**
 * del - Generic action to make a DELETE request with fetch
 * @param {string} path - Api endpoint to hit (e.g., '/user/:userId')
 * @param {boolean} requiresAuth - Whether or not request needs to be authenticated
 * @returns {Promise}
 */
export const del = (path, requiresAuth) =>
	httpUtils(DELETE, path, { requiresAuth });
