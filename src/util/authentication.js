"use strict";

import {deleteCookie, getCookie, setCookie} from "./cookie-utils";
import {getAppUrl} from "./environment-utils";
import UserService from "./../service/userService"
import AuthService from "./../service/authService"

import {getEnvironment} from "./environment-utils";

const config = require("../../config");
const mode = getEnvironment();

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
				setCookie({name: "access-token", value: response.accessToken});
				if (desiredPath) {
					window.location.href = `${getAppUrl()}${desiredPath}`;
				} else {
					window.location.href = `${getAppUrl()}/`;
				}
			}
		});
};

/**
 * register - Creates a new account for a user
 * @param {object} userRequest - User's form data
 * @param {string} userRequest.regEmail - Email of user
 * @param {string} userRequest.username - Username of user
 * @param {string} userRequest.password - Password of user
 * @param {string} userRequest.password - Password of user
 * @param {string} [desiredPath] - Path to redirect after
 */
export const register = (userRequest, desiredPath) => {
	// TODO: check for data validity
	UserService.createUser(userRequest)
		.then(userResponse => {
			const userLoginRequest = {
				username: userResponse.username,
				password: userRequest.password,
			};
			login(userLoginRequest);
		})
		.catch(error => {
			console.error(error);
		});
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
 * @param {string} [desiredPath] - Path to redirect after
 */
export const logoutUser = (desiredPath = "") => {
	deleteCookie({name: "access-token"});
	window.location.href = `${getAppUrl()}${desiredPath}`;
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
					// logout if token is wrong
					logoutUser();
					reject(error);
				});
		else {
			// TODO: respond with error
		}
	});
};
