"use strict";

import { get, post, patch, del } from "./../util/http-utils";

/**
 * Class for request on users
 * @author Matthew Poletin
 */
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
	 * @param {object} option - Optional data
	 * @param {string} [option.username] - Username of user
 	 * @return {Promise<object>} - Paginated list of users
	 */
	static getUsersWith(option) {
		// TODO: Raise error if username && email not set
		// TODO: Check for username correctness
		return get(`/users?username=${option.username}`, true);
	}

	/**
	 * createUser - Create new user with specified parameters
	 * @param userRequest - Optional data
	 * @param {string} userRequest.username - Username
	 * @param {string} userRequest.regEmail - Registration email
	 * @param {string} userRequest.password - Password
	 * @param {number} [userRequest.regDate] - Password
	 * @return {Promise<object>} - Representation of created user
	 */
	static createUser(userRequest) {
		// TODO: check if data correct and specified
		userRequest.regDate = userRequest.regDate || Date.now().valueOf();
		return post(`/users`, userRequest, false)
	}

	/**
	 * createUser - Create new user with specified parameters
	 * @param {string} code - OAuth2 authorization code
	 * @return {Promise<object>} - Representation of created user
	 */
	static authUserByTwitch(code) {
		// TODO: check if data correct and specified
		// TODO: set regDate
		return post(`/users/twitch`, {code, regDate: Date.now().valueOf()}, false)
	}

	/**
	 * getUserById - Get user from api by id
	 * @param {string} userId - Id of required user
	 * @return {Promise<object>} - Representation of user
	 */
	static getUserById(userId) {
		// TODO: Add checks for userId  existence and being a number
		return get(`/users/${userId}`, true);
	}

	/**
	 * getUserBy - Get user from api by username or email
	 * @param {object} option - Data for request
	 * @param {string} [option.username] - username of desired user
	 * @param {string} [option.email] - email of desired user
	 * @return {Promise<object>} - Representation of user
	 */
	static getUserBy(option) {
		// TODO: Add checks for username for existence being a string
		if (option.username) {
			return get(`/users/by?username=${option.username}`, true);
		} else if (option.email) {
			return get(`/users/by?email=${option.email}`, true);
		}
	}

	/**
	 * updateUserById - Updates user information based on the given data
	 * @param {string} userId - Id of user
	 * @param {object} userRequest - Data to update user with
	 * @return {Promise} - New representation of user
	 */
	static updateUserById(userId, userRequest) {
		return patch(`/users/${userId}`, userRequest, true);
	}

	/**
	 * deleteUser - Deletes user
 	 * @param {string} userId - Id of requested user
	 * @return {Promise<void>} - Promise by the end of request
	 */
	static deleteUser(userId) {
		// TODO: check for userId being valid uuid
		return del(`/users/${userId}`, true);
	}

	/**
	 * getFriendsOfUserById - Retrieves paginated list of friends of user with id
	 * @param {string} userId - Id of requested user
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
	 * @param {string} userId - Id of requesting user
	 * @param {string} friendId - Id of target user
	 */
	static addFriend(userId, friendId) {
		return post(`/users/${userId}/friends/${friendId}`, null, true);
	}

	/**
	 * removeFriend - Remove one user from others friends
	 * @param {string} userId - Id of requesting user
	 * @param {string} friendId - Id of target user
	 * @return {Promise}
	 */
	static removeFriend(userId, friendId) {
		return del(`/users/${userId}/friends/${friendId}`, true);
	}

	/**
	 * getRelation - Finds relation between two users
	 * @param {string} userAId - Id of requesting user
	 * @param {string} userBId - Id of relating user
	 * @return {Promise} - Relation response
	 */
	static getRelation(userAId, userBId) {
		return get(`/users/${userAId}/relation/${userBId}`, true);
	}

	/**
	 * createDeveloper - Creates developer of user
	 * @param {string} userId - Id of user
	 * @param {object} data - Data of new developer
	 * @param {string} data.name - Name of new developer
	 * @return {Promise} - Developer response
	 */
	static createDeveloper(userId, data) {
		return post(`/users/${userId}/developer`, data, true);
	}

	/**
	 * getDeveloper - Get developer of user
	 * @param {string} userId - Id of user
	 * @return {Promise<object>}
	 */
	static getDeveloper(userId) {
		return get(`/users/${userId}/developer`, true);
	}

	/**
	 * getApps - Get apps of user
	 * @param {string} userId - Id of user
	 * @param {object} [options] - Optional data
	 * @param {number} [options.page] - Page of response
	 * @param {number} [options.size] - Size of response
	 * @return {Promise} - Paginated list of apps
	 */
	static getApps(userId, options) {
		return get(`/users/${userId}/apps`, true);
	}

	/**
	 * getDeveloperGames - Get games of developer
	 * @param {string} userId - Id of user
	 * @return {Promise} - List of developed games
	 */
	static getDeveloperGames(userId) {
		return get(`/users/${userId}/developer/games`, true);
	}

}

export default UserService;
