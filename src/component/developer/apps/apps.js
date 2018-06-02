"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types"
import UserService from "../../../service/userService";
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/** Class for DeveloperApps react component. */
class DeveloperApps extends Component {

	componentWillMount() {
		this.setState({
			apps: undefined,
			authUser: undefined,
		});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
			UserService.getApps(props.authUser.id)
				.then((appsResponse) => {
					this.setState({
						apps: appsResponse,
					});
				});
		}
	}

	render() {
		return (
			<div className="developer-apps">
				<Link to="/developers/apps/new">
					<button className="pure-button">
						New app
					</button>
				</Link>
				{this.apps()}
			</div>
		);
	}

	apps() {
		if (this.state.apps !== undefined && this.state.apps.length > 0) {
			const apps = this.state.apps.map((app, index) =>
				<tr className="user" key={index}>
					<td>
						<Link to={`/developers/apps/${app.id}`}>
							{app.name}
						</Link>
					</td>
					<td>
						{app.id}
					</td>
					<td>
						{app.redirectUri}
					</td>
					<td>
						<Link to={`/developers/apps/${app.id}`}>
							<FontAwesomeIcon icon={faWrench} size={"2x"}/>
						</Link>
					</td>
					<td>
						<a href="" onClick={() => this.deleteApp(app.id, index)}>
							<FontAwesomeIcon icon={faTrash} size={"2x"}/>
						</a>
					</td>
				</tr>
			);

			return(
					<table border="1px" width="100%">
						<thead>
							<tr>
								<th>Name</th>
								<th>Id</th>
								<th>Redirect URI</th>
								<th> </th>
								<th> </th>
							</tr>
						</thead>
						<tbody>
							{apps}
						</tbody>
					</table>
			)
		}
	}

	deleteApp(id, index) {
		console.debug(`Deleting app ${id} on ${index}`);
		UserService.deleteApp(id)
			.then(() => {

			});
	}

}

DeveloperApps.propTypes = propTypes;
DeveloperApps.defaultProps = defaultProps;

export default DeveloperApps;
