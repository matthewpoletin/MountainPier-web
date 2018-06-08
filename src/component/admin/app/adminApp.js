"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import AppService from "../../../service/appService";

const propTypes = {
	authUser: PropTypes.object,
	appId: PropTypes.number,
};

const defaultProps = {
	authUser: undefined,
	appId:  undefined,
};

/**
 * Class for AdminApp react component
 * @author Matthew Poletin
 */
class AdminApp extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeRedirectUri = this.handleChangeRedirectUri.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const appId = this.props.appId;

		this.setState({
			authUser: undefined,
			appId: appId,
			name: "",
			redirectUri: "",
			loading: true,
		});

		AppService.getApp(appId)
			.then(appResponse => {
				this.setState({
					app: appResponse,
					name: appResponse.name,
					redirectUri: appResponse.redirectUri,
					loading: false,
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					loading: false,
				});
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
			<div className="admin-app">
				{this.app()}
			</div>
		);
	}

	app() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading
				</div>
			);
		} else {
			if (this.state.app === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				)
			} else {
				return (
					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									onChange={this.handleChangeName}
									defaultValue={this.state.app.name}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="redirectUri">Redirect URI</label>
								<input
									id="redirectUri"
									type="text"
									placeholder="redirect uri"
									onChange={this.handleChangeRedirectUri}
									defaultValue={this.state.app.redirectUri}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="id">Id</label>
								<input
									id="id"
									type="text"
									placeholder="id"
									defaultValue={this.state.app.id}
									disabled={true}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="secret">Secret</label>
								<input
									id="secret"
									type="text"
									placeholder="secret"
									defaultValue={this.state.app.secret}
									disabled={true}
								/>
							</div>
							<div className="pure-controls">
								<button
									id="updateApp"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Update App
								</button>
							</div>
						</fieldset>
					</form>
				)
			}
		}
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

		if (this.validForm) {
			const appRequest = {
				userId: this.state.authUser.id,
				name: this.state.name,
				redirectUri: this.state.redirectUri,
			};
			AppService.updateApp({appId: this.state.appId, data: appRequest})
				.then((appResponse) => {
					console.log(appResponse);
				});
		}
	}

	validName() {
		return this.state.name > 0;
	}

	validRedirectUri() {
		return this.state.redirectUri > 0;
	}

	validForm() {
		return this.validName && this.validRedirectUri();
	}

}

AdminApp.propTypes = propTypes;
AdminApp.defaultProps = defaultProps;

export default AdminApp;
