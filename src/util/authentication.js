"use strict";

import {deleteCookie, getCookie, setCookie} from "./cookie-utils";
import {post} from "./http-utils";
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
 * @param {string} data.username - Username of user
 * @param {string} data.email - Email of user
 * @param {string} data.password - Password of user
 */
// TODO: finish implementation
export const register = data => () => {
	try {
		const userResponse =  post(`/users`, data, false);
		const authResponse =  post(`/auth/login`, data, false);
		if (userResponse) {
			setCookie('access-token', userResponse.accessToken, { maxAge: userResponse.tokenExpiration });
			window.location.href = `${getAppUrl()}/dashboard`;
		}
	} catch (error) {
		console.log(error);
	}
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
