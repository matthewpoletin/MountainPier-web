"use strict";

class UserController {
	/**
	 * @param {object} [option]
	 * @param {string} [option.domain]
	 */
	constructor(option) {
		if (!option || typeof option !== "object") option = {};
		this.domain = option.domain || "localhost";
		this.accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNYXR0aGV3UG9sZXRpbiIsImV4cCI6MTUyMzk2MTAwMH0.kdHrq5ogYXe0sRSzP2sNTEijN47tYIqR0P3Yf7d_c0X3i9Mi5HvFEyQcqgfNLv3wngz8zo2K0kqU3xGlZdWKcg";
	}

	getUsers(req, res) {
		res.cookie('accessToken', this.accessToken, { domain: this.domain, expires: new Date(Date.now() + 900000) });
		res.render("index");
	}
}

module.exports = UserController;