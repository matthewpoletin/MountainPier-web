"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperNewGame react component. */
class DeveloperNewGame extends Component {

	render() {
		return (
			<div className="developer-game-new">
				<DeveloperMenu/>
				DeveloperNewGame<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperNewGame;
