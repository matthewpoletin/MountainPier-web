"use strict";

import React, { Component } from 'react';
import TwitchConnect from "../common/twitchConnect";

/** Class for signup react component. */
class Signup extends Component {
	constructor(props) {
		super(props);

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className="Signup">
				<TwitchConnect/>
				<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor={"email"}>Email</label>
							<input id="email"
							       type={"email"}
							       placeholder={"mail@server.com"}
							       autoComplete={"email"}
							       onChange={this.handleChangeEmail}
							/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"username"}>Username</label>
							<input id={"username"}
							       type={"text"}
							       placeholder={"username"}
							       autoComplete={"username"}
							       onChange={this.handleChangeUsername}
							/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"password"}>Password</label>
							<input id={"password"}
							       type={"password"}
							       placeholder={"password"}
							       onChange={this.handleChangePassword}
							       autoComplete={"new-password"}
							       ref={input => this.input = input}
							/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="g-recaptcha" data-sitekey="6LfxuVUUAAAAAHeCM4Mu3uATWY5--i69hTECzb7o"/>
						<div className="pure-controls">
							<label htmlFor="cb" className="pure-checkbox">
								<input id={"check"}
								       type={"checkbox"}
								       onChange={this.handleChangeCheckbox}
								       required={true}
								/>
								I've read <a href={"/"}>User Agreement</a> and <a href={"/"}>Privacy Policy</a>
							</label>
							<button type={"submit"} className={"pure-button pure-button-primary"}>Submit</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	handleChangeUsername(event) {
		console.log('username: ' + event.target.value);
	}

	handleChangeEmail(event) {
		console.log('email: ' + event.target.value);
	}

	handleChangePassword(event) {
		console.log('password: ' + event.target.value);
	}

	handleChangeCheckbox(event) {
		console.log('cb: ' + event.target.value);
	}

	handleSubmit(event) {

		event.preventDefault();
	}

}

export default Signup;
