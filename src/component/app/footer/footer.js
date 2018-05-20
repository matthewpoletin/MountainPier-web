"use strict";

import React, { Component } from 'react';
import './footer.css'
import {Link} from "react-router-dom";

/** Class for footer react component. */
class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<footer>
					<div className="footer-links">
						<Link to="/about">About</Link>
						<Link to="/blog">Blog</Link>
						<Link to="/developers">Developers</Link>
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
