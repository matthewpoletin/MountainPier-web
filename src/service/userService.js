"use strict";

import { get, post } from "./../util/http-utils";

/** Class for request on users. */
class UserService {

	/**
	 * Get paginated list of all users
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>}
	 */
	static getUsers(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/users?page=${option.page}&size${option.size}`, true);
	}

	/**
	 * getUserById - Get user from api by id
	 * @param {object} userId - Id of required user
	 * @return {Promise<object>}
	 */
	static getUserById(userId) {
		// TODO: Add checks for userId  existence and being a number
		return get(`/users/${userId}`, true);
	}

	/**
	 * getUserBy - Get user from api by username or email
	 * @param {object} [option] - Data for request
	 * @param {string} [option.username] - username of desired user
	 * @param {string} [option.email] - email of desired user
	 * @return {Promise<any>}
	 */
	static getUserBy(option) {
		// TODO: Add checks for username for existence being a string
		return get(`/users/by?username=${option.username}`, true);
	}

	/**
	 * getFriendsOfUserById - Retrieves paginated list of friends of user with id
	 * @param {number} userId - Id of requested user
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 */
	static getFriendsOfUserById(userId, option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/users/${userId}/friends?page=${option.page}&size=${option.size}`, true);
	}

	/**
	 * login - Authorizes user in web application
	 * @param {object} credentials - Data of user
	 * @param {string} credentials.username - Username of user
	 * @param {string} credentials.password - Password of user
	 * @return {Promise}
	 */
	//TODO: Move to auth specific service
	static login(credentials) {
		// TODO: Check if credentials set
		return post(`/auth/login`, credentials, false)
	}

	/**
	 * checkToken - Get user based on his accessToken
	 * @param accessToken - Access Token of user
	 * @return {Promise}
	 */
	//TODO: Move to auth specific service
	static checkToken(accessToken) {
		// TODO: Check access token being correct
		const data = {
			accessToken: accessToken
		};
		return post(`/auth/check`, data, true);
	}

}

export default UserService;
