"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ChannelService from "../../../service/channelService";

const propTypes = {
	authUser: PropTypes.object,
	channelId: PropTypes.number,
};

const defaultProps = {
	authUser: undefined,
	channelId:  undefined,
};

/**
 * Class for AdminChannel react component
 * @author Matthew Poletin
 */
class AdminChannel extends Component {

	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const channelId = this.props.channelId;

		this.setState({
			authUser: undefined,
			channelId: channelId,
			username: "",
			email: "",
			password: "",
		});

		ChannelService.getChannel(channelId)
			.then(channelResponse => {
				this.setState({
					channel: channelResponse,
					username: channelResponse.username,
					email: channelResponse.email,
					password: channelResponse.password,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
	}

	render() {
		return (
			<div className="admin-channel">
				{this.channel()}
			</div>
		);
	}

	channel() {
		if (this.state.channel !== undefined) {
			return (
				<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor="username">Username</label>
							<input
								id="username"
								type="text"
								placeholder="username"
								autoComplete="username"
								onChange={this.handleChangeUsername}
								defaultValue={this.state.channel.username}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder="email"
								autoComplete="email"
								onChange={this.handleChangeEmail}
								defaultValue={this.state.channel.email}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								placeholder="password"
								autoComplete="password"
								onChange={this.handleChangePassword}
								defaultValue={this.state.channel.password}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-controls">
							<button
								id="updateApp"
								type="submit"
								className="pure-button pure-button-primary"
								disabled={!this.validForm()}
							>
								Update Channel
							</button>
						</div>
					</fieldset>
				</form>
			)
		} else {
			return("Loading...")
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

		if (this.validForm) {
			const channelRequest = {
				creatorId: this.state.channel.creatorId,
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			};
			ChannelService.updateChannel(this.state.channel.id, channelRequest)
				.then((channelResponse) => {
					console.debug(channelResponse);
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
		return this.validUsername && this.validEmail() && this.validPassword();
	}

}

AdminChannel.propTypes = propTypes;
AdminChannel.defaultProps = defaultProps;

export default AdminChannel;
