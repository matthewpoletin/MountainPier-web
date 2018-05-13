"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {login} from "../../../util/authentication";
import TwitchConnect from "../common/twitchConnect";

/** Class for login react component. */
class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		};

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			username: this.state.username,
			password: this.state.password,
		});
		console.log("username: " + this.state.username);
		console.log("password: " + this.state.password);
		console.log(this.validForm());
	}

	render() {
		return (
			<div className="Login">
				<TwitchConnect />
				<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor={"username"}>Username</label>
							<input id={"username"}
							       type={"text"}
							       placeholder={"username"}
							       onChange={this.handleChangeUsername}
							       defaultValue={this.state.username}
							       autoComplete={"username"}
							/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"password"}>Password</label>
							<input id={"password"}
							       type={"password"}
							       placeholder={"password"}
							       onChange={this.handleChangePassword}
							       ref={input => this.input = input}
							       defaultValue={this.state.password}
							       autoComplete={"current-password"}
							/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<Link className="remind" to="/remind" hidden={false}>Forgot password?</Link>
						<div className="pure-controls">
							<label htmlFor="cb" className="pure-checkbox" hidden={true}>
								<input id={"cb"}
									type={"checkbox"}
								/>
								Remember me
							</label>
							<button id={"login"}
							        type={"submit"}
							        className={"pure-button pure-button-primary"}
							        disabled={!this.validForm()}>
								Login</button>
							<Link to={"/signup"}>Signup</Link>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value
		});
		console.log('username: ' + event.target.value);
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
		console.log('password: ' + event.target.value);
	}

	handleSubmit(event) {
		event.preventDefault();
		// TODO: add extra validation
		// TODO: add desiredPath state var
		if (this.validForm()) {
			login({
				username: this.state.username,
				password: this.state.password,
			}, "/");
		}
	}

	/**
	 * validUsername - Checks username for validity
	 * @return {boolean}
	 */
	validUsername() {
		return this.state.username.length > 0;
	}

	/**
	 * validPassword - Checks password for validity
	 * @return {boolean}
	 */
	validPassword() {
		return this.state.password.length > 0;
	}

	/**
	 * validForm - Checks form for validity
	 * @return {boolean}
	 */
	validForm() {
		return this.validUsername() && this.validPassword();
	}

}

export default Login;
