"use strict";

import {get, post, patch, del} from "../util/http-utils";

/** Class for request on games. */
class GameService {

	/**
	 * getGames - Get paginated list of all games
	 * @param {object} option - Optional data
	 * @param {number} [option.page] - Page to start from (e.g., 0, 1, ...)
	 * @param {number} [option.size] - Amount of entries per page
	 * @return {Promise<object>}
	 */
	static getGames(option) {
		option = typeof option === "object" ? option : {page: 0, size: 25};
		return get(`/games?page=${option.page}&size=${option.size}`, true);
	}

	/**
	 * createGame - Create a new game based on given data
	 * @param {object} data - Data to create game by
	 * @param {string} data.name - Name
	 * @param {string} data.description - Description
	 * @return {Promise<object>}
	 */
	static createGame(data) {
		return post(`/games`, data, true);
	}

	/**
	 * getGameBy - Get game by game specific information
	 * @param {object} [option] - Optional data
	 * @param {string} [option.name] - Name of desired game
	 * @return {Promise<object>}
	 */
	static getGameBy(option) {
		// TODO: Add checks for username for existence being a string
		return get(`/games/by?name=${option.name}`, true);
	}

	/**
	 * getGameById - Get game by id
	 * @param {number} gameId - Id of desired game
	 * @return {Promise<object>}
	 */
	static getGameById(gameId) {
		// TODO: Add checks for gameId  existence and being a number
		return get(`/games/${gameId}`, true);
	}

	/**
	 * updateGameById - Update game with specified id based on data
	 * @param gameId - Id of game to update
	 * @param data - Data to update game by
	 * @return {Promise<object>}
	 */
	// TODO: Implement method GameService.updateGameById
	static updateGameById(gameId, data) {
		return patch(`/games/${gameId}`, data, true);
	}

	/**
	 * deleteGameById - Delete game with specified id
	 * @param gameId - Id of game to delete
	 * @return {Promise<void>}
	 */
	static deleteGameById(gameId) {
		return del(`/games/${gameId}`, true);
	}

	/**
	 * setDeveloper - Set developer of game
	 * @param {string} gameId - Id of game
	 * @param {number} developerId - Id of developer
	 * @return {Promise}
	 */
	static setDeveloper(gameId, developerId) {
		return post(`/games/${gameId}/developers/${developerId}`, null, true);
	}

}

export default GameService;
