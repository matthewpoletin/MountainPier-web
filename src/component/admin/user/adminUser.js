"use strict";

import React, {Component} from 'react';
import PropTypes from "prop-types"
import UserService from "../../../service/userService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
	userId: PropTypes.string,
};

const defaultProps = {
	isAuth: false,
	userId: undefined,
};

/** Class for AdminUser react component */
class AdminUser extends Component {

	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeRole = this.handleChangeRole.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			user: undefined,
			loading: true,
		});
		if (this.props.userId !== undefined) {
			UserService.getUserById(this.props.userId)
				.then(userResponse => {
					this.setState({
						user: userResponse,
						loading: false,

						id: userResponse.id,
						username: userResponse.username,
						regEmail: userResponse.regEmail,
						role: userResponse.role,
					});
				})
				.catch(error => {
					console.error(error);
					this.setState({loading: false});
				});
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			)
		} else {
			if (this.state.user !== undefined) {
				return (
					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="id">Id</label>
								<input
									id="id"
									type="text"
									placeholder="id"
									defaultValue={this.state.user.id}
									disabled={true}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="name"
									onChange={this.handleChangeUsername}
									defaultValue={this.state.user.username}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="text"
									placeholder="email"
									autoComplete="email"
									onChange={this.handleChangeEmail}
									defaultValue={this.state.user.regEmail}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="role">Role</label>
									<select id="role" onChange={this.handleChangeRole} defaultValue={this.state.user.role}>
										<option value="USER">User</option>
										<option value="DEVELOPER">Developer</option>
										<option value="ADMIN">Admin</option>
									</select>
							</div>
							<div className="pure-controls">
								<button
									id="updateUser"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Update User
								</button>
							</div>
							<div className="pure-controls">
								<button
									className="pure-button pure-button-active"
								>
									Delete user
								</button>
							</div>
						</fieldset>
					</form>
				);
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

	deleteUser(userId) {
		console.info(`Attempting to delete user ${userId}`);
		if (window.confirm(`Delete user ${this.state.user.username}?`)) {
			console.info(`Deleting user ${userId}`);
			UserService.deleteUser(userId)
				.then(() => {
					window.location = '/admin/users';
				})
				.catch(error => console.error(error));
		}
	}

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value,
		});
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value,
		});
	}

	handleChangeRole(event) {
		this.setState({
			role: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			const userRequest = {
				username: this.state.username,
				role: this.state.role,
			};
			UserService.updateUserById(this.state.id, userRequest)
				.then((userResponse) => {
					this.setState({
						user: userResponse,

						id: userResponse.id,
						username: userResponse.username,
						regEmail: userResponse.regEmail,
						role: userResponse.role,
					});
				})
		}
	}

	validUsername() {
		return this.state.username.length > 0;
	}

	validForm() {
		return this.validUsername;
	}

}

AdminUser.propTypes = propTypes;
AdminUser.defaultProps = defaultProps;

export default AdminUser;
