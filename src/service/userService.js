"use strict";

import { get, post, del } from "./../util/http-utils";

/** Class for request on users. */
class UserService {

	/**
	 * getUsers - Get paginated list of all users
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>} - Paginated list of users
	 */
	static getUsers(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/users?page=${option.page}&size${option.size}`, true);
	}

	/**
	 * getUsersWith - Get a paginated list of users with parameter
	 * @param option - Optional data
	 * @param option.username - Username of user
 	 * @return {Promise<object>} - Paginated list of users
	 */
	static getUsersWith(option) {
		// TODO: Raise error if username && email not set
		// TODO: Check for username correctness
		return get(`/users?username=${option.username}`, true);
	}

	/**
	 * createUser - Create new user with specified parameters
	 * @param data - Optional data
	 * @param data.email - Email
	 * @param data.username - Username
	 * @param data.password - Password
	 * @return {Promise<object>} - Representation of created user
	 */
	static createUser(data) {
		// TODO: check if data correct and specified
		console.log(data);
		return post(`/users`, data, false)
	}

	/**
	 * createUser - Create new user with specified parameters
	 * @param {string} code -
	 * @return {Promise<object>} - Representation of created user
	 */
	static authUserByTwitch(code) {
		// TODO: check if data correct and specified
		return post(`/users/twitch`, {code}, false)
	}

	/**
	 * getUserById - Get user from api by id
	 * @param {object} userId - Id of required user
	 * @return {Promise<object>} - Representation of user
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
	 * @return {Promise<object>} - Representation of user
	 */
	static getUserBy(option) {
		// TODO: Add checks for username for existence being a string
		return get(`/users/by?username=${option.username}`, true);
	}

	/**
	 * updateUserById - Updates user information based on the given data
	 * @param option - Data to update user with
	 * @return {Promise} - New representation of user
	 */
	//TODO: implement
	static updateUserById(option) {
		throw new Error("Method not implemented yet")
	}

	/**
	 * deleteUser - Deletes user
 	 * @param userId - Id of requested user
	 * @return {Promise<void>} - Promise by the end of request
	 */
	static deleteUser(userId) {
		// TODO: check for userId being valid uuid
		return del(`/users/${userId}`, true);
	}

	/**
	 * getFriendsOfUserById - Retrieves paginated list of friends of user with id
	 * @param {number} userId - Id of requested user
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>} - Paginated list of friends of user
	 */
	static getFriendsOfUserById(userId, option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/users/${userId}/friends?page=${option.page}&size=${option.size}`, true);
	}

	/**
	 * addFriend - Add one user to others friends
	 * @param userId - Id of requesting user
	 * @param friendId - Id of target user
	 */
	static addFriend(userId, friendId) {
		return post(`/users/${userId}/friends/${friendId}`, null, true)
	}

}

export default UserService;
