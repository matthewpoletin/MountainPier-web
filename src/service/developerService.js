"use strict";

import { get, post, patch, del } from "./../util/http-utils";

/** Class for request on developers. */
class DeveloperService {

	/**
	 * getDevelopers - Get paginated list of developers
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>} - Paginated list of apps
	 */
	static getDevelopers(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/developers?page=${option.page}&size${option.size}`, true);
	}

	/**
	 * updateDeveloper - Update developer
	 * @param {number} developerId - Id of developer
	 * @param {object} developerRequest - Data to update
	 * @return {Promise<object>}
	 */
	static updateDeveloper(developerId, developerRequest) {
		return patch(`/developers/${developerId}`, developerRequest, true);
	}

	/**
	 * getDeveloper - Get developer
	 * @param developerId - Id of developer
	 * @return {Promise<object>} - Developer response
	 */
	static getDeveloper(developerId) {
		return get(`/developers/${developerId}`, true);
	}

	/**
	 * deleteChannel - Delete developer
	 * @param {number} developerId - Id of developer
	 * @return {Promise<void>}
	 */
	static deleteDeveloper(developerId) {
		return del(`/developers/${developerId}`, true);
	}

	/**
	 * getGames - Get games
	 * @param {number} developerId - Id of developer
	 * @return {Promise<object>}
	 */
	static getGames(developerId) {
		return get(`/developers/${developerId}/games`, true);
	}

}

export default DeveloperService;
