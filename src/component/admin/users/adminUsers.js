"use strict";

import React, {Component} from 'react';
import UserService from "./../../../service/userService";
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faBan from '@fortawesome/fontawesome-free-solid/faBan'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import "./adminUsers.css"
import {getAuthenticatedUser, isAuthenticated} from "../../../util/authentication";
import PropTypes from "prop-types"

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/** Class for AdminUsers react component */
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
			if (typeof this.state.users !== 'undefined') {
				if (this.state.users.length === 0) {
					return <div>Not found</div>
				} else {
					console.log(this.state.users);
					const users = this.state.users.map((user, index) =>
						<li className="user" key={index}>
							<div className={"pure-g"}>
								<div className={"pure-u-1-5 avatar"}>
									<img src={user.avatar} height={100} width={100} alt={""}/>
								</div>
								<div className={"pure-u-4-5 pure-g info"}>
									<div className={"pure-u-1-5"}>
										<Link to={`/user/${user.username}`}>
											<span>{user.username}</span>
										</Link>
									</div>
									<div className={"pure-u-4-5 pure-g"}>
										<div className={"pure-u-1-5"}>
											{user.username}
										</div>
										<div className={"pure-u-1-4"}>
											{user.regEmail}
										</div>
										<div className={"pure-u-1-5"}>
											{user.status}
										</div>
										<div className={"pure-u-1-4 pure-g controls"}>
											<div className={"pure-u-1-3"} onClick={() => this.editUser(index, user.id)}>
												<FontAwesomeIcon icon={faWrench} size={"2x"}/>
											</div>
											<div className={"pure-u-1-3"} onClick={() => this.banUser(index, user.id)}>
												<FontAwesomeIcon icon={faBan} size={"2x"}/>
											</div>
											<div className={"pure-u-1-3"}>
												<a onClick={() => this.deleteUser(index, user.id)}>
													<FontAwesomeIcon icon={faTrash} size={"2x"}/>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr/>
						</li>
					);
					return (
						<ul className="user-list">
							{users}
						</ul>
					);
				}
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

	editUser(index, userId) {
		console.log(`Editing ${index} user ${userId}`);
		const users = this.state.users;
		users.splice(index, 1);
		this.setState({
			users: users,
		});
	}

	banUser(index, userId) {
		console.log(`Banning user ${userId}`);
	}

	deleteUser(index, userId) {
		console.log(`Deleting user ${userId}`);
		if (isAuthenticated()) {
			getAuthenticatedUser()
				.then(user => {
					if (user.id === userId) {
						console.log("Can not delete your user. Login with another user and repeat.")
					} else {
						if (window.confirm(`Delete user ${this.state.users[index].username}?`)) {
							UserService.deleteUser(userId)
								.then(response => {
									const users = this.state.users;
									users.splice(index, 1);
									this.setState({
										users: users,
									});
								})
								.catch(error => console.log(error));
						}
					}
				}).catch(error =>
				console.error(error)
			);
		} else {
			if (window.confirm(`Delete user ${this.state.users[index].username}?`)) {
				UserService.deleteUser(userId)
					.then(response => {
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

}

AdminUsers.propTypes = propTypes;
AdminUsers.defaultProps = defaultProps;

export default AdminUsers;
