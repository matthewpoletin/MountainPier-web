"use strict";

import {deleteCookie, getCookie, setCookie} from "./cookie-utils";
import {getAppUrl} from "./environment-utils";
import UserService from "./../service/userService"
import AuthService from "./../service/authService"

/**
 * login - Authenticate a user with an email and password
 * @param {object} credentials - Login credentials (username, password)
 * @param {string} credentials.username - Username of user
 * @param {string} credentials.password - Password of user
 * @param {string} [desiredPath] - Path to redirect after
 */
export const login = (credentials, desiredPath) => {
	AuthService.login(credentials)
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
 * @param {string} data.regEmail - Email of user
 * @param {string} data.username - Username of user
 * @param {string} data.password - Password of user
 * @param {string} [desiredPath] - Path to redirect after
 */
export const register = (data, desiredPath) => {
	// TODO: check for data validity
	UserService.createUser(data)
		.then(response => {
			login({
				username: response.username,
				password: data.password,
			});
		})
		.catch(error => console.log(error));
};

/**
 * finishOauthRegister - Finishes oauth registration
 * @param {string} userId - Id of user
 * @param {string} password - Password of user
 * @param {string} [desiredPath] - Path to redirect after
 */
export const finishOauthRegister = (userId, password, desiredPath) => {
	AuthService.updateCredentials(userId, password)
		.then(response => {
			login({username: response.username, password: password});
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
};

/**
 * getAuthenticatedUser - Retrieves the logged in user's information
 * @returns {Promise<object>}
 */
export const getAuthenticatedUser = () => {
	return new Promise((resolve, reject) => {
		const accessToken = getCookie("access-token");
		if (accessToken !== undefined)
			return AuthService.checkToken(accessToken)
				.then(userResponse => {
					resolve(userResponse);
				})
				.catch(error => {
					reject(error);
				});
		else {
			// TODO: respond with error
		}
	});
};
