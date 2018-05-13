"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperApps react component. */
class DeveloperApps extends Component {

	render() {
		return (
			<div className="developer-apps">
				<DeveloperMenu/>
				DeveloperApps<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperApps;
