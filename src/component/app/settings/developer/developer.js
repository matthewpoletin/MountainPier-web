"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";

/** Class for developer settings react component. */
class DeveloperSettings extends Component {

	componentWillMount() {
		this.setState({user: this.props.user});
	}

	render() {
		if (this.state.user !== undefined)
			return (
				<div className="developer-settings">
					<Link to="/developers" className="pure-button">Developers page</Link>
				</div>
			);
		else return(
			<div>
				User is not defined
			</div>
		);
	}

}

export default DeveloperSettings;
