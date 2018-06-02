"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types"
import UserService from "../../../service/userService";
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import AppService from "../../../service/appService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/** Class for DeveloperApps react component. */
class DeveloperApps extends Component {

	constructor(props) {
		super(props);

		this.state = {
			apps: undefined,
			authUser: undefined,
		};
	}

	componentWillMount() {
		if (this.props.authUser !== undefined) {
			this.setState({
				authUser: this.props.authUser,
			});
			UserService.getApps(this.props.authUser.id)
				.then((appsResponse) => {
					this.setState({
						apps: appsResponse,
					});
				});
		}
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
				<tr className="app" key={index} align="center">
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
				<table className="apps-list" width="100%">
					<thead>
						<tr>
							<th>Name</th>
							<th>Id</th>
							<th>Redirect URI</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{apps}
					</tbody>
				</table>
			)
		}
	}

	deleteApp(appId, index) {
		console.debug(`Deleting app ${appId} on ${index}`);
		if (window.confirm(`Delete app ${this.state.apps[index].name}?`)) {
			AppService.deleteApp(appId)
				.then(() => {
					const apps = this.state.apps;
					apps.splice(index, 1);
					this.setState({
						apps: apps,
					});
				});
		}
	}

}

DeveloperApps.propTypes = propTypes;
DeveloperApps.defaultProps = defaultProps;

export default DeveloperApps;
