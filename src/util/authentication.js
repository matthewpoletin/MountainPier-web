"use strict";

import {deleteCookie, getCookie, setCookie} from "./cookie-utils";
import {getAppUrl} from "./environment-utils";
import UserService from "./../service/userService"

/**
 * login - Authenticate a user with an email and password
 * @param {object} credentials - Login credentials (username, password)
 * @param {string} credentials.username - Username of user
 * @param {string} credentials.password - Password of user
 * @param {string} desiredPath - Path to redirect after logging in
 */
export const login = (credentials, desiredPath) => {
	UserService.login(credentials)
		.then(response => {
			if (response) {
				// TODO: fix accessExpires to be correct in browsers
				setCookie('access-token', response.accessToken, { maxAge: response.accessExpires });
				if (desiredPath) {
					window.location.href = `${getAppUrl()}${desiredPath}`;
				} else {
					window.location.href = `${getAppUrl()}/dashboard`;
				}
			}
		});
};

/**
 * register - Creates a new account for a user
 * @param {object} data - User's form data
 * @param {string} data.email - Email of user
 * @param {string} data.username - Username of user
 * @param {string} data.password - Password of user
 */
export const register = (data) => {
	// TODO: check for data validity
	UserService.createUser(data)
		.then(response => {
			UserService.login(data)
				.then(response => {
					// TODO: fix accessExpires to be correct in browsers
					setCookie('access-token', response.accessToken, { maxAge: response.accessExpires });
					if (typeof desiredPath !== 'undefined') {
						window.location.href = `${getAppUrl()}${desiredPath}`;
					} else {
						window.location.href = `${getAppUrl()}/dashboard`;
					}
				});
		});
};

/**
 * logoutUser - Log user out by clearing token cookie
 */
export const logoutUser = () => {
	deleteCookie('access-token');
	window.location.href = `${getAppUrl()}/`;
};

/**
 * isAuthenticated - Responds with authentication state
 * @return {boolean}
 */
export const isAuthenticated = () => {
	return Boolean(getCookie("access-token"));
} ;

/**
 * getAuthenticatedUser - Retrieves the logged in user's information
 * @returns {Promise<object>}
 */
export const getAuthenticatedUser = () => {
	return new Promise((resolve, reject) => {
		const accessToken = getCookie("access-token");
		if (accessToken !== undefined)
			return UserService.checkToken(accessToken)
				.then(user => {
					return UserService.getUserById(user.id)
						.then(user => {
							resolve(user);
						})
						.catch(error => {
							reject(error);
						});
				})
				.catch(error => {
					reject(error);
				});
		else {
			// TODO: respond with error
		}
	});
};
