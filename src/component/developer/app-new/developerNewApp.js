"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import AppService from "../../../service/appService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for DeveloperNewApp react component
 * @author Matthew Poletin
 */
class DeveloperNewApp extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeRedirectUri = this.handleChangeRedirectUri.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			authUser: this.props.authUser,
			name: "",
			redirectUri: "",
			id: "",
			secret: "",
		})
	}

	componentWillReceiveProps(props) {
		this.setState({
			authUser: props.authUser,
		});
	}

	render() {
		return (
			<div className="developer-app-new">
				<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor="name">Name</label>
							<input
								id="name"
							    type="text"
							    placeholder="name"
							    onChange={this.handleChangeName}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="redirectUri">Redirect URI</label>
							<input
								id="redirectUri"
								type="url"
								placeholder="redirect uri"
								onChange={this.handleChangeRedirectUri}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="id">Id</label>
							<input
								id="id"
								type="text"
								placeholder="id"
								defaultValue={this.state.id}
								disabled={true}
							/>
						</div>
						<div className="pure-control-group">
							<label htmlFor="secret">Secret</label>
							<input
								id="secret"
								type="text"
								disabled={true}
								placeholder="secret"
								value={this.state.secret}
							/>
						</div>
						<div className="pure-controls">
							<button id="login"
							        type="submit"
							        className="pure-button pure-button-primary"
							        disabled={!this.validForm()}
							>
								Create App
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	handleChangeName(event) {
		this.setState({
			name: event.target.value,
		});
	}

	handleChangeRedirectUri(event) {
		this.setState({
			redirectUri: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			const appRequest = {
				userId: this.state.authUser.id,
				name: this.state.name,
				redirectUri: this.state.redirectUri,
			};
			AppService.createApp(appRequest)
				.then((appResponse) => {
					this.setState({
						secret: appResponse.secret,
						id: appResponse.id,
					});
					window.location.href = `/developers/apps/${appResponse.id}`;
				})
				.catch((error) => {
					window.alert(error);
				});
		}
	}

	validName() {
		return this.state.name.length > 0;
	}

	validRedirectUri() {
		return this.state.redirectUri.length > 0;
	}

	validForm() {
		return this.validName() && this.validRedirectUri();
	}
}

DeveloperNewApp.propTypes = propTypes;
DeveloperNewApp.defaultProps = defaultProps;

export default DeveloperNewApp;
