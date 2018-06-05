"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for personal settings react component
 * @author Matthew Poletin
 */
class PersonalSettings extends Component {

	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			authUser: this.props.authUser,

			username: "",
			email: "",
		});
	}

	render() {
		if (this.state.authUser === undefined) {
			return (
				<div>
					User is not defined
				</div>
			);
		} else {
			return (
				<div className="personal-settings">
					<form className="pure-form pure-form-aligned">
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="avater">Avatar</label>
								<img src={this.state.authUser.avatar} height={40} width={40} alt={""}/>
								<input
									id="avatar"
									type="file"
									accept="image/*"
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="username">Username</label>
								<input
									id="username"
									type="text"
									placeholder="Username"
									defaultValue={this.state.authUser.username}
									onChange={this.handleChangeUsername}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="username">Email</label>
								<input
									id="email"
									type="text"
									defaultValue={this.state.authUser.regEmail}
									onChange={this.handleChangeEmail}
								/>
							</div>
							<div className={"pure-controls"}>
								<input
									type="submit"
									className="pure-button pure-button-primary"
									onClick={this.handleSubmit}
									value="Update"
								/>
							</div>
						</fieldset>
					</form>
				</div>
			);
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

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {

		}
	}

	validUsername() {
		return this.state.username.length > 0;
	}

	validEmail() {
		return this.state.email.length > 0;
	}

	validForm() {
		return this.validUsername() && this.validEmail();
	}

}

PersonalSettings.propTypes = propTypes;
PersonalSettings.defaultProps = defaultProps;

export default PersonalSettings;
