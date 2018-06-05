"use strict";

import { get, post, patch, del } from "./../util/http-utils";

/** Class for request on game. */
class ChannelService {

	/**
	 * getChannels - Get paginated list of channels
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>} - Paginated list of apps
	 */
	static getChannels(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/channels?page=${option.page}&size${option.size}`, true);
	}


	static createChannel(channelRequest) {
		return post(`/channels`, channelRequest, true);
	}

	/**
	 * updateChannel - Update game
	 * @param {number} channelId - Id of game
	 * @param {object} channelRequest - Data to update
	 * @return {Promise<object>}
	 */
	static updateChannel(channelId, channelRequest) {
		return patch(`/channels/${channelId}`, channelRequest, true);
	}

	/**
	 * getChannel - Get game
	 * @param channelId - Id of game
	 * @return {Promise<object>} - Channel response
	 */
	static getChannel(channelId) {
		return get(`/channels/${channelId}`, true);
	}

	/**
	 * deleteChannel - Delete game
	 * @param {number} channelId - Id of game
	 * @return {Promise<void>}
	 */
	static deleteChannel(channelId) {
		return del(`/channels/${channelId}`, true);
	}

}

export default ChannelService;
