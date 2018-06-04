"use strict";

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import PropTypes from "prop-types"
import AppService from "../../../service/appService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/** Class for AdminApps react component */
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
			if (typeof this.state.apps !== 'undefined') {
				if (this.state.apps.length === 0) {
					return <div>Not found</div>
				} else {
					const apps = this.state.apps.map((app, index) =>
						<tr key={index} align="center">
							<td>
								<Link to={`/admin/apps/${app.name}`}>
									{app.name}
								</Link>
							</td>
							<td>
								{app.status}
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
					);
					return (
						<table className="apps-list" width="100%">
							<thead>
							<tr>
								<th>Name</th>
								<th>Status</th>
								<th>Developer</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
							</thead>
							<tbody>
								{apps}
							</tbody>
						</table>
					);
				}
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

	deleteApp(index, appId) {
		console.log(`Deleting ${index} app ${appId}`);
		if (window.confirm(`Delete app ${this.state.apps[index].name}?`)) {
			AppService.deleteApp(appId)
				.then(response => {
					const apps = this.state.apps;
					apps.splice(index, 1);
					this.setState({
						apps: apps,
					});
				})
				.catch(error => console.log(error));
		}
	}

}

AdminApps.propTypes = propTypes;
AdminApps.defaultProps = defaultProps;

export default AdminApps;
