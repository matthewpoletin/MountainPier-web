"use strict";

import {get, post, patch, del} from "../util/http-utils";

/**
 * Class for request on statistical data
 * @author Matthew Poletin
 */
class ChartService {

	/**
	 * getLogins - Get latest logins
	 * @return {Promise}
	 */
	static getLogins() {
		return get("/logins", true);
	}

}

export default ChartService;
