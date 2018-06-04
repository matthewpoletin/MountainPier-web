"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for accounts settings react component
 * @author Matthew Poletin
 */
class AccountsSettings extends Component {

	componentWillMount() {
		this.setState({authUser: this.props.authUser});

		// AuthService.getConnectionsOfUser(authUser.id);
	}

	render() {
		if (this.state.authUser !== undefined)
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

	connection(data) {
		return (
			<div className="connection">
				<div>
					*Name*
				</div>
				<div>
					*Date established*
				</div>
				<div>
					<button onClick={() => this.revokeConnection(data.id)}>
						*Revoke
					</button>
				</div>
			</div>
		)
	}

	/**
	 * revokeConnection -
	 * @param id -
	 */
	revokeConnection(id) {

	}
}

AccountsSettings.propTypes = propTypes;
AccountsSettings.defaultProps = defaultProps;

export default AccountsSettings;
