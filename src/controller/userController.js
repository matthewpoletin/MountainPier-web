"use strict";

/**
 * Class for User Controller
 * @author Matthew Poletin
 */
class UserController {

	/**
	 * getUsers -
	 * @param req -
	 * @param res -
	 */
	static getUsers(req, res) {
		// res.cookie('accessToken', this.accessToken, { /*domain: this.domain,*/ expires: new Date(Date.now() + 900000) });
		res.render("index", {});
	}

	/**
	 * getAbout -
	 * @param req -
	 * @param res -
	 */
	static getAbout(req, res) {
		res.render("about", {});
	}

}

module.exports = UserController;
