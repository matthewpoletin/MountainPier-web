"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperNewApp react component. */
class DeveloperNewApp extends Component {

	render() {
		return (
			<div className="developer-app-new">
				<DeveloperMenu/>
				DeveloperNewApp<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperNewApp;
