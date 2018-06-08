"use strict";

/**
 * Class for Error Controller
 * @author Matthew Poletin
 */
class ErrorController {

	/**
	 * get404 -
	 * @param req -
	 * @param res -
	 */
	static get404(req, res) {
		res.render("index", {});
	}

}

module.exports = ErrorController;