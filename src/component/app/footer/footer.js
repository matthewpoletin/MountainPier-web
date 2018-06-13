"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./footer.css";

/**
 * Class for footer react component
 * @author Matthew Poletin
 */
class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<footer>
					<div className="footer-links">
						<Link to="/about">About</Link>
						<Link to="/blog">Blog</Link>
						<Link to="/dev">Developers</Link>
						<Link to="/mobile">Mobile</Link>
						<Link to="/jobs">Jobs</Link>
						<Link to="/terms">Terms</Link>
						<Link to="/privacy-policy">Privacy Policy</Link>
					</div>
					<div className="copyright">
						© 2018, Mountain Pier, Inc. All rights reserved.
					</div>
				</footer>
			</div>
		);
	}

}

export default Footer;
