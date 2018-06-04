"use strict";

import { get, post, del } from "./../util/http-utils";
import {patch} from "../util/http-utils";

/** Class for request on apps. */
class AppService {

	/**
	 * getApps - Get paginated list of all apps
	 * @param {object} [option] - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>} - Paginated list of apps
	 */
	static getApps(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/auth/oauth/apps?page=${option.page}&size${option.size}`, true);
	}

	/**
	 * createApp - Creates app by data
	 * @param data
	 * @param data.userId - Id of owner
	 * @param data.name - Name
	 * @param data.redirectUri - Redirect URI
	 * @return {Promise<object>}
	 */
	static createApp(data) {
		return post(`/auth/oauth/apps`, data, true);
	}

	/**
	 * getApp - Gets app by id
	 * @param appId - Id of app
	 * @return {Promise<object>}
	 */
	static getApp(appId) {
		return get(`/auth/oauth/apps/${appId}`, true);
	}

	/**
	 * updateApp - Update app
	 * @param option - Optional data
	 * @param option.appId - App id
	 * @param option.data - App request
	 * @return {Promise<object>} - App response
	 */
	static updateApp(option) {
		return patch(`/auth/oauth/apps/${option.appId}`, option.data, true);
	}

	/**
	 * deleteChannel - Deletes application
	 * @param appId - Id of application
	 * @return {Promise<void>}
	 */
	static deleteApp(appId) {
		return del(`/auth/oauth/apps/${appId}`, true);
	}

}

export default AppService;
