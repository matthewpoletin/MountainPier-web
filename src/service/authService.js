"use strict";

import { get, post, patch, del } from "./../util/http-utils";

/** Class for request on auth. */
class AuthService {

	/**
	 * login - Authorizes user in web application
	 * @param {object} credentials - Data of user
	 * @param {string} credentials.username - Username of user
	 * @param {string} credentials.password - Password of user
	 * @return {Promise} - Tokens and their expiration info
	 */
	static login(credentials) {
		// TODO: Check if credentials set
		return post(`/auth/login`, credentials, false)
	}

	/**
	 * updateCredentials
	 * @param userId - Id of user
	 * @param password - New password
	 */
	static updateCredentials(userId, password) {
		return patch(`/users/${userId}/credentials`, {password: password}, true)
	}

	/**
	 * checkToken - Get user based on his accessToken
	 * @param accessToken - Access Token of user
	 * @return {Promise<object>} - User representation
	 */
	static checkToken(accessToken) {
		// TODO: Check access token being correct
		return post(`/auth/check`, { accessToken }, true);
	}

	/**
	 * generateProviderToken -
	 * @param {string} code - code for generating access token on server
	 */
	static generateProviderToken(code) {
		return post(`/auth/providers/twitch/`, {provider: 'twitch', code: code}, false);
	}

	/**
	 * createProviderToken - Add token to user
	 * @param {string} userId - Id of user
	 * @param {object} token - Token information
	 * @param {string} token.accessToken - Access token
	 * @param {string} token.refreshToken - Refresh token
	 * @param {number} token.expiresIn - Time is seconds till token expires
	 * @param {string} token.scope - Scopes
	 * @return {Promise<object>} - Token representation
	 */
	static createProviderToken(userId, token) {
		return post(`/auth/providers/twitch/users/${userId}`, token, false);
	}

	/**
	 * getProviderToken - Finds token of specified user
	 * @param {string} userId - Id of user
	 * @return {Promise<object>} - Token representation
	 */
	static getProviderToken(userId) {
		return get(`/auth/providers/twitch/users/${userId}`, false);
	}

	/**
	 * getUserWithProviderToken - Finds user with specified token
	 * @param {string} accessToken - Access token
	 * @return {Promise<object>} - User representation
	 */
	static getUserWithProviderToken(accessToken) {
		return del(`/auth/providers/twitch/token/${accessToken}`, true);
	}

	/**
	 * deleteProviderToken - Removes token of specified user
	 * @param {string} userId - Id of user
	 * @return {Promise<void>}
	 */
	static deleteProviderToken(userId) {
		return del(`/auth/providers/twitch/users/${userId}`, true);
	}

}

export default AuthService;
