"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import AppService from "./../../../../service/appService";

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
		this.setState({
			authUser: this.props.authUser,
			connections: undefined,
		});

		// AuthService.getConnectionsOfUser(authUser.id);
	}

	render() {
		if (this.state.connections === undefined) {
			return (
				<div className="error-block">
					Error in request
				</div>
			);
		} else {
			return (
				<div className="accounts-settings">
					<table width="100%">
						<thead>
							<tr>
								<th>App name</th>
								<th>Date established</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{this.state.servers.map((connection, index) => { return (
								<tr className="connection" key={index} align="center">
									<td>
										*name*
									</td>
									<td>
										*date*
									</td>
									<td onClick={() => this.revokeConnection(connection.id)}>
										Revoke
									</td>
								</tr>
							)})}
						</tbody>
					</table>
				</div>
			);
		}
	}

	/**
	 * revokeConnection - Remove connection of auth user with specified app
	 * @param connectionId - Id of connection
	 * @param index - Index in list
	 */
	revokeConnection(connectionId, index) {
		console.debug(`Attempting to revoke connection #{index} with ${connectionId}`);
		if (window.confirm("Revoke connection ")) {
			AppService.revokeConnection(connectionId)
				.then(() => {

				}).catch(error => {
					console.error(error);
				});
		}
	}

}

AccountsSettings.propTypes = propTypes;
AccountsSettings.defaultProps = defaultProps;

export default AccountsSettings;
