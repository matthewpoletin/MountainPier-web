"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import AuthService from "../../../../service/authService";

const propTypes = {
	authUser: PropTypes.object.isRequired,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for password and security settings react component
 * @author Matthew Poletin
 */
class PasswordSettings extends Component {

	constructor(props) {
		super(props);

		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
		this.handleChangeRetypeNewPassword = this.handleChangeRetypeNewPassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({authUser: this.props.authUser});

		this.setState({
			password: "",
			newPassword: "",
			retypeNewPassword: "",
		});
	}

	render() {
		if (this.state.authUser !== undefined)
			return (
				<div className="password-settings">
					<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
						<fieldset>
							<input
								id="username"
								type="text"
								autoComplete="username"
								defaultValue={this.state.authUser.username}
								hidden={true}
							/>
							<div className="pure-control-group">
								<label htmlFor="current-password">Current password</label>
								<input
									id="current-password"
								    type="password"
								    placeholder="current password"
								    onChange={this.handleChangePassword}
								    ref={input => this.input = input}
								    autoComplete="current-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="new-password">New password</label>
								<input
									id="new-password"
								    type="password"
								    placeholder="new password"
								    onChange={this.handleChangeNewPassword}
								    ref={input => this.input = input}
								    autoComplete="new-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="retype-new-password">Retype new password</label>
								<input
									id="retype-new-password"
								    type="password"
								    placeholder={"retype new password"}
								    onChange={this.handleChangeRetypeNewPassword}
								    ref={input => this.input = input}
								    autoComplete="new-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									type="submit"
								    className="pure-button pure-button-primary"
								    disabled={!this.validForm()}
								>
									Update
								</button>
							</div>
						</fieldset>
					</form>
				</div>
			);
		else return(
			<div>
				User is not defined
			</div>
		);
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value,
		});
	}

	handleChangeNewPassword(event) {
		this.setState({
			newPassword: event.target.value,
		});
	}

	handleChangeRetypeNewPassword(event) {
		this.setState({
			retypeNewPassword: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			// TODO: check if old password is right
			AuthService.updateCredentials(this.state.authUser.id, this.state.newPassword)
				.then(response => {
					console.log(response);
					this.setState({
						updated: true,
					});
				});
		}
	}

	validPassword() {
		return this.state.password.length > 0
	}

	validNewPassword() {
		return this.state.newPassword.length > 0
	}

	validRetypeNewPassword() {
		return this.state.retypeNewPassword === this.state.newPassword;
	}

	validForm() {
		return this.validPassword() && this.validNewPassword() && this.validRetypeNewPassword();
	}

}

PasswordSettings.propTypes = propTypes;
PasswordSettings.defaultProps = defaultProps;

export default PasswordSettings;
