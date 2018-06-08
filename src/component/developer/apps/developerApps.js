"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import AppService from "../../../service/appService";
import UserService from "../../../service/userService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for DeveloperApps react component
 * @author Matthew Poletin
 */
class DeveloperApps extends Component {

	componentWillMount() {
		this.state = {
			apps: undefined,
			authUser: undefined,
			loading: true,
		};

		this.loadApps(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadApps(props);
	}

	loadApps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
			UserService.getApps(props.authUser.id)
				.then((appsResponse) => {
					this.setState({
						apps: appsResponse,
						loading: false,
					});
				}).catch(() => {
					this.setState({
						loading: false,
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
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading
				</div>
			);
		} else {
			if (!(this.state.apps !== undefined && this.state.apps.length > 0)) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {

				return (
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
							{this.state.apps.map((app, index) => { return (
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
							)})}
						</tbody>
					</table>
				)
			}
		}
	}

	deleteApp(appId, index) {
		console.debug(`Attempting to delete app ${appId} on ${index}`);
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
