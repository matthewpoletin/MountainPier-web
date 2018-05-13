"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperApp react component. */
class DeveloperApp extends Component {

	render() {
		return (
			<div className="developer-app">
				<DeveloperMenu/>
				DeveloperApp<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperApp;
