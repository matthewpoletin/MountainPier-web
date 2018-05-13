"use strict";

import React, { Component } from 'react';
import DeveloperMenu from '../dev-menu/dev-menu'

/** Class for DeveloperHome react component. */
class DeveloperHome extends Component {

	render() {
		return (
			<div className="developer-home">
				<DeveloperMenu/>
				DeveloperHome<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperHome;
