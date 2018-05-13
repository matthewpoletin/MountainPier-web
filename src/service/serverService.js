"use strict";

import { get, post } from "./../util/http-utils";

/** Class for request on servers. */
class ServerService {

	/**
	 * getServers - Get paginated list of all servers
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>}
	 */
	static getServers(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/servers?page=${option.page}&size${option.size}`, true);
	}

	/**
	 * create Server - Based on given data creates new server
	 * @param data - Data to create server of
	 * @return {Promise<object>}
	 */
	static createServer(data) {
		// TODO:
		return post(`/servers`, data, true)
	}

	/**
	 * getServerById - Get user from api by id
	 * @param {object} serverId - Id of required user
	 * @return {Promise<object>}
	 */
	static getServerById(serverId) {
		// TODO: Add checks for serverId  existence and being a number
		return get(`/servers/${serverId}`, true);
	}

	/**
	 * getChannelOfServerById - Retrieves a channel of required by id server
	 * @param serverId - Id of required server
	 * @return {Promise}
	 */
	static getChannelOfServerById(serverId) {
		// TODO: Add checks for serverId  existence and being a number
		return get(`/servers/${serverId}/channels`, true)
	}

}

export default ServerService;
