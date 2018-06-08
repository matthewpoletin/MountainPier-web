"use strict";

/**
 * Class for index controller
 * @author Matthew Poletin
 */
class IndexController {

	/**
	 * getIndex -
	 * @param req -
	 * @param res -
	 */
	static getIndex(req, res) {
		res.render("index", {});
	}

}

module.exports = IndexController;
