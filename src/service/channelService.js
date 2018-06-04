"use strict";

import { get, post, patch, del } from "./../util/http-utils";

/** Class for request on channel. */
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
	 * updateChannel - Update channel
	 * @param {number} channelId - Id of channel
	 * @param {object} channelRequest - Data to update
	 * @return {Promise<object>}
	 */
	static updateChannel(channelId, channelRequest) {
		return patch(`/channels/${channelId}`, channelRequest, true);
	}

	/**
	 * getChannel - Get channel
	 * @param channelId - Id of channel
	 * @return {Promise<object>} - Channel response
	 */
	static getChannel(channelId) {
		return get(`/channels/${channelId}`, true);
	}

	/**
	 * deleteChannel - Delete channel
	 * @param {number} channelId - Id of channel
	 * @return {Promise<void>}
	 */
	static deleteChannel(channelId) {
		return del(`/channels/${channelId}`, true);
	}

}

export default ChannelService;
