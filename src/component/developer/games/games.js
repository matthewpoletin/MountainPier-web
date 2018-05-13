"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperGames react component. */
class DeveloperGames extends Component {

	render() {
		return (
			<div className="developer-games">
				<DeveloperMenu/>
				DeveloperGames<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperGames;
