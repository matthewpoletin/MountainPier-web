"use strict";

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import PropTypes from "prop-types"
import DeveloperService from "../../../service/developerService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/** Class for AdminChannels react component */
class AdminChannels extends Component {

	componentWillMount() {
		this.setState({
			apps: undefined,
			loading: true,
		});
		DeveloperService.getDevelopers({page: 0, size: 20})
			.then(developers => {
				this.setState({
					developers: developers.content,
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
			console.log(this.state.developers);
			if (typeof this.state.developers !== 'undefined') {
				if (this.state.developers.length === 0) {
					return <div>Not found</div>
				} else {
					const developers = this.state.developers.map((developer, index) =>
						<tr key={index}>
							<td>
								<img src={developer.avatar} height={100} width={100} alt={""}/>
							</td>
							<td>
								<Link to={`/developers/${developer.name}`}>
									{developer.name}
								</Link>
							</td>
							<td>
								<a href={`mailto:${developer.email}`}>
									{developer.email}
								</a>
							</td>
							<td>
								{developer.website}
							</td>
							<td>
								<Link to={`/admin/users/${developer.userId}`}>
									{developer.userId}
								</Link>
							</td>
							<td align="center">
								<Link to={`/admin/developers/${developer.id}`}>
									<FontAwesomeIcon icon={faWrench} size={"2x"}/>
								</Link>
							</td>
							<td align="center">
								<a onClick={() => this.deleteDeveloper(index, developer.id)}>
									<FontAwesomeIcon icon={faTrash} size={"2x"}/>
								</a>
							</td>
						</tr>
					);
					return (
						<table className="apps-list" width="100%">
							<thead>
							<tr>
								<th>Avatar</th>
								<th>Name</th>
								<th>Email</th>
								<th>Website</th>
								<th>Users</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
							</thead>
							<tbody>
							{developers}
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

	deleteDeveloper(index, developerId) {
		console.log(`Deleting ${index} app ${developerId}`);
		DeveloperService.deleteDeveloper(developerId)
			.then(response => {
				const apps = this.state.games;
				apps.splice(index, 1);
				this.setState({
					apps: apps,
				});
			})
			.catch(error => console.log(error));
	}

}

AdminChannels.propTypes = propTypes;
AdminChannels.defaultProps = defaultProps;

export default AdminChannels;
