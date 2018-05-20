"use strict";

import React, { Component } from 'react';

/** Class for accounts settings react component. */
class AccountsSettings extends Component {

	componentWillMount() {
		this.setState({user: this.props.user});
	}

	render() {
		if (this.state.user !== undefined)
			return (
				<div className="accounts-settings">
					Accounts settings<br/>
					Work in progress
				</div>
			);
		else return(
			<div>
				User is not defined
			</div>
		);
	}

}

export default AccountsSettings;
