"use strict";

/** ? */
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
