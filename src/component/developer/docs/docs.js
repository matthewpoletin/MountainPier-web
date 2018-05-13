"use strict";

import React, { Component } from 'react';
import DeveloperMenu from "../dev-menu/dev-menu";

/** Class for DeveloperDocs react component. */
class DeveloperDocs extends Component {

	render() {
		return (
			<div className="dev-docs">
				<DeveloperMenu/>
				DeveloperDocs<br/>
				Work in progress
			</div>
		);
	}
}

export default DeveloperDocs;
