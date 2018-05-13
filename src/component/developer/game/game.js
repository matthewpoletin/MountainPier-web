"use strict";

import React, { Component } from 'react';
import DeveloperMenu from '../dev-menu/dev-menu'

/** Class for DeveloperGame react component. */
class DeveloperGame extends Component {

	render() {
		return (
			<div className="developer-game">
				<DeveloperMenu/>
				DeveloperGame<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperGame;
