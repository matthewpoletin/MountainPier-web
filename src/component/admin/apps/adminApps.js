"use strict";

import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import AppService from "../../../service/appService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/**
 * Class for AdminApps react component
 * @author Matthew Poletin
 */
class AdminApps extends Component {

	componentWillMount() {
		this.setState({
			apps: undefined,
			loading: true,
		});
		AppService.getApps({page: 0, size: 20})
			.then(apps => {
				this.setState({
					apps: apps.content,
					loading: false,
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({loading: false});
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			)
		} else {
			if (this.state.apps === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.apps.length === 0) {
					return (
						<div>
							Not found
						</div>
					);
				} else {
					return (
						<table className="apps-list" width="100%">
							<thead>
								<tr>
									<th>Name</th>
									<th>Developer</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.apps.map((app, index) => {
									return (
										<tr key={index} align="center">
											<td>
												<Link to={`/admin/apps/${app.name}`}>
													{app.name}
												</Link>
											</td>
											<td>
												{app.developers !== undefined ? app.developers[0] !== undefined ? (
													<a href={`/developers/${app.developers[0].id}`}>
														{app.developers[0].name}
													</a>
												) : null : null
												}
											</td>
											<td>
												<Link to={`/admin/apps/${app.id}`}>
													<FontAwesomeIcon icon={faWrench} size={"2x"}/>
												</Link>
											</td>
											<td>
												<a onClick={() => this.deleteApp(index, app.id)}>
													<FontAwesomeIcon icon={faTrash} size={"2x"}/>
												</a>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					);
				}
			}
		}
	}

	deleteApp(index, appId) {
		console.debug(`Attempting to delete ${index} app ${appId}`);
		if (window.confirm(`Delete app ${this.state.apps[index].name}?`)) {
			AppService.deleteApp(appId)
				.then(() => {
					const apps = this.state.apps;
					apps.splice(index, 1);
					this.setState({
						apps: apps,
					});
				})
				.catch(error => {
					console.log(error);
					window.alert(error);
				});
		}
	}

}

AdminApps.propTypes = propTypes;
AdminApps.defaultProps = defaultProps;

export default AdminApps;
