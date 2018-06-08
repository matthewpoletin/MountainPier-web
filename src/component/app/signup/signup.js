"use strict";

import React, { Component } from "react";
import {register} from "../../../util/authentication";
import {Link} from "react-router-dom";
import TwitchConnect from "../common/twitchConnect";

/**
 * Class for signup react component
 * @author Matthew Poletin
 */
class Signup extends Component {

	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeRetypePassword = this.handleChangeRetypePassword.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			email: "",
			username: "",
			password: "",
			retypePassword: "",
			checkbox: false,
		});
	}

	render() {
		return (
			<div className="signup">
				<TwitchConnect action="Signup"/>
				<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor="email">Email</label>
							<input id="email"
							       type="email"
							       placeholder="email"
							       autoComplete="email"
							       onChange={this.handleChangeEmail}
							       defaultValue={this.state.email}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"username"}>Username</label>
							<input id="username"
							       type="text"
							       placeholder="username"
							       autoComplete="username"
							       onChange={this.handleChangeUsername}
							       defaultValue={this.state.username}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="password">Password</label>
							<input id="password"
							       type="password"
							       placeholder="password"
							       onChange={this.handleChangePassword}
							       autoComplete="new-password"
							       ref={input => this.input = input}
							       defaultValue={this.state.username}
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
							       defaultValue={this.state.username}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						{/*<div className="g-recaptcha" data-sitekey="6LfxuVUUAAAAAHeCM4Mu3uATWY5--i69hTECzb7o"/>*/}
						<div className="pure-controls">
							<label htmlFor="cb" className="pure-checkbox">
								<input id="check"
								       type="checkbox"
								       onChange={this.handleChangeCheckbox}
								       required={true}
								/>
								<span>I've read <Link to="/about">User Agreement</Link> and <Link to="/about">Privacy Policy</Link></span>
							</label>
							<button type="submit"
							        className="pure-button pure-button-primary"
							        disabled={!this.validForm()}
							>
								Register
							</button>
							<Link to="/login">Login</Link>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	handleChangeUsername(event) {
		this.setState({
			username: event.target.value,
		});
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
		if (this.validForm()) {
			register({
				regEmail: this.state.email,
				username: this.state.username,
				password: this.state.password,
			});
		}
	}

	validEmail() {
		return this.state.email.length > 0;
	}

	validUsername() {
		return this.state.username.length > 0;
	}

	validPassword() {
		return this.state.password.length > 0
	}

	validRetypePassword() {
		return this.state.password === this.state.retypePassword;
	}

	validForm() {
		return this.validEmail() && this.validUsername() && this.validPassword() && this.validRetypePassword() && this.state.checkbox;
	}

}

export default Signup;
