"use strict";

import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {getAuthenticatedUser, isAuthenticated} from "../../../util/authentication";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import "./adminUsers.css";
import UserService from "./../../../service/userService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
	authUser: undefined,
};

/**
 * Class for AdminUsers react component
 * @author Matthew Poletin
 */
class AdminUsers extends Component {

	componentWillMount() {
		this.setState({
			users: undefined,
			loading: true,
		});
		UserService.getUsers({page: 0, size: 20})
			.then(users => {
				this.setState({users: users.content, loading: false});
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
					Loading
				</div>
			)
		} else {
			if (typeof this.state.users === 'undefined') {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.users.length === 0) {
					return (
						<div>
							Not found
						</div>
					);
				} else {
					return (
						<ul className="user-list">
							<table width="100%">
								<thead>
									<tr>
										<th>Avatar</th>
										<th>Username</th>
										<th>Email</th>
										<th>Role</th>
										<th>Status</th>
										<th>Reg Date</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.users.map((user, index) => { return (
										<tr className="user" key={index} align="center">
											<td>
												<img src={user.avatar} height={100} width={100} alt={""}/>
											</td>
											<td>
												<Link to={`/users/${user.username}`}>
													{user.username}
												</Link>
											</td>
											<td>
												{user.regEmail}
											</td>
											<td>
												{user.role.toLowerCase()}
											</td>
											<td>
												{user.status}
											</td>
											<td>
												{new Date(user.regDate).toISOString().slice(0, 10).replace(/-/g, "")}
											</td>
											<td>
												<Link to={`/admin/users/${user.id}`}>
													<FontAwesomeIcon icon={faWrench} size={"2x"}/>
												</Link>
											</td>
											<td>
												<a onClick={() => this.deleteUser(index, user.id)}>
													<FontAwesomeIcon icon={faTrash} size={"2x"}/>
												</a>
											</td>
										</tr>
									)})}
								</tbody>
							</table>
						</ul>
					);
				}
			}
		}
	}

	deleteUser(index, userId) {
		console.debug(`Attempting to delete #${index} user ${userId}`);
		if (isAuthenticated()) {
			getAuthenticatedUser()
				.then(user => {
					if (user.id === userId) {
						console.debug("Can not delete your user. Login with another user and repeat")
					} else {
						this.finishDeleteUser(index, userId)
					}
				}).catch(error => {
					console.error(error);
					window.alert(error);
				});
		} else {
			this.finishDeleteUser(index, userId)
		}
	}

	finishDeleteUser(index, userId) {
		if (window.confirm(`Delete user ${this.state.users[index].username}?`)) {
				UserService.deleteUser(userId)
				.then(() => {
					const users = this.state.users;
					users.splice(index, 1);
					this.setState({
						users: users,
					});
				})
				.catch(error => console.log(error));
		}
	}

}

AdminUsers.propTypes = propTypes;
AdminUsers.defaultProps = defaultProps;

export default AdminUsers;
