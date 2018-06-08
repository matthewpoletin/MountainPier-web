"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import ChannelService from "../../../service/channelService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for creating new channel
 * @author Matthew Poletin
 */
class AdminNewChannel extends Component {

	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		if (this.props.authUser !== undefined) {
			this.setState({
				authUser: this.props.authUser,
			});
		}
		this.setState({
			username: "",
			email: "",
			password: "",
		})
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
	}

	render() {
		if (this.state.authUser !== undefined) {
			return (
				<div className="developer-app-new">
					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="username">Username</label>
								<input
									id="username"
									type="text"
									placeholder="name"
									autoComplete="off"
									onChange={this.handleChangeUsername}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="email"
									placeholder="email"
									autoComplete="off"
									onChange={this.handleChangeEmail}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="secret">Password</label>
								<input
									id="password"
									type="password"
									placeholder="password"
									autoComplete="off"
									onChange={this.handleChangePassword}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="login"
							        type="submit"
							        className="pure-button pure-button-primary"
							        disabled={!this.validForm()}
								>
									Create Channel
								</button>
							</div>
						</fieldset>
					</form>
				</div>
			);
		} else {
			return null;
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

	handleChangePassword(event) {
		this.setState({
			password: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			const channelRequest = {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
				creatorId: this.state.authUser.id,
			};
			ChannelService.createChannel(channelRequest)
				.then((channelResponse) => {
					window.location.href = `/admin/channels/${channelResponse.id}`;
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	validUsername() {
		return this.state.username.length > 0;
	}

	validEmail() {
		return this.state.email.length > 0;
	}

	validPassword() {
		return this.state.password.length > 0;
	}

	validForm() {
		return this.validUsername() && this.validEmail() && this.validPassword();
	}

}

AdminNewChannel.propTypes = propTypes;
AdminNewChannel.defaultProps = defaultProps;

export default AdminNewChannel;
