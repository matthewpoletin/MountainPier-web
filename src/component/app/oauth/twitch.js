"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import * as qs from "query-string"
import {finishOauthRegister} from "../../../util/authentication";
import UserService from "../../../service/userService";

/**
 * Class for oauth twitch react component
 * @author Matthew Poletin
 */
class OAuthTwitch extends Component {

	constructor(props) {
		super(props);

		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeRetypePassword = this.handleChangeRetypePassword.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({loading: true});

		this.setState({
			password: "",
			retypePassword: "",
			checkbox: false,
		});

		const code = qs.parse(this.props.location.search).code;
		if (code !== undefined) {
			UserService.authUserByTwitch(code)
				.then(response => {
					this.setState({loading: false});
					if (response.new === true) {
						// Finish user registration (let him enter password)
						this.setState({
							bReg: true,
							id: response.id,
						});
					} else {
						// Redirect elsewhere
					}
				})
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading
				</div>
			);
		} else {
			if (this.state.bReg !== true) {
				return (
					<div className="redirecting">
						Redirecting...
					</div>
				);
			} else {
				return (
					<div className="oauth-twitch">
						<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
							<fieldset>
								<div className="pure-control-group">
									<label htmlFor="password">Password</label>
									<input id="password"
									       type="password"
									       placeholder="password"
									       onChange={this.handleChangePassword}
									       autoComplete="new-password"
									       ref={input => this.input = input}
									/>
									<span className="pure-form-message-inline">This is required field</span>
								</div>
								<div className="pure-control-group">
									<label htmlFor="retype-password">Retype password</label>
									<input id="retype-password"
									       type="password"
									       placeholder="retype password"
									       onChange={this.handleChangeRetypePassword}
									       autoComplete="new-password"
									       ref={input => this.input = input}
									/>
									<span className="pure-form-message-inline">This is required field</span>
								</div>
								<div className="pure-controls">
									<label htmlFor="cb" className="pure-checkbox">
										<input id="check"
										       type="checkbox"
										       onChange={this.handleChangeCheckbox}
										       required={true}
										/>
										I've read <Link to={"/"}>User Agreement</Link> and <Link to={"/"}>Privacy
										Policy</Link>
									</label>
									<button type="submit"
									        className="pure-button pure-button-primary"
									        disabled={!this.validForm()}
									>
										Register
									</button>
								</div>
							</fieldset>
						</form>
					</div>
				);
			}
		}
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value,
		});
	}

	handleChangeRetypePassword(event) {
		this.setState({
			retypePassword: event.target.value,
		});
	}

	handleChangeCheckbox(event) {
		this.setState({
			checkbox: event.target.checked,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		console.log(this.state.id);
		console.log(this.state.password);
		if (this.validForm()) {
			finishOauthRegister(this.state.id, this.state.password);
		}
	}

	validPassword() {
		return this.state.password.length > 0
	}

	validRetypePassword() {
		return this.state.retypePassword === this.state.password;
	}

	validForm() {
		return this.validPassword() && this.validRetypePassword() && this.state.checkbox;
	}

}

export default OAuthTwitch;
