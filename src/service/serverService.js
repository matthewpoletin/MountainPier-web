"use strict";

import { post, get, patch, del} from "./../util/http-utils";

/**
 * Class for request on servers
 * @author Matthew Poletin
 */
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
	 * updateServer - Update server
	 * @param serverId - Id of server
	 * @param serverRequest - Server data
	 * @return {Promise} - Server response
	 */
	static updateServer(serverId, serverRequest) {
		return patch(`/servers/${serverId}`, serverRequest, true);
	}

	/**
	 * deleteServer - Delete server
	 * @param serverId
	 * @return {Promise}
	 */
	static deleteServer(serverId) {
		return del(`/servers/${serverId}`, true);
	}

	/**
	 * getChannelOfServerById - Retrieves a game of required by id server
	 * @param serverId - Id of required server
	 * @return {Promise}
	 */
	static getChannelOfServerById(serverId) {
		// TODO: Add checks for serverId  existence and being a number
		return get(`/servers/${serverId}/channels`, true)
	}

}

export default ServerService;
