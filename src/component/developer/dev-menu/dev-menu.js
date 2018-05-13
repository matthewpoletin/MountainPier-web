"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './dev-menu.css';

/** Class for DeveloperMenu react component. */
class DeveloperMenu extends Component {

	render() {
		return (
			<div className="developer-menu">
				<div className={"pure-g"}>
					<div className={"pure-u-1-3 dev-menu-item"}>
						<Link to={"/developers/docs"}>
							Docs
						</Link>
					</div>
					<div className={"pure-u-1-3 dev-menu-item"}>
						<Link to={"/developers/games"}>
							Games
						</Link>
					</div>
					<div className={"pure-u-1-3 dev-menu-item"}>
						<Link to={"/developers/apps"}>
							Apps
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default DeveloperMenu;
