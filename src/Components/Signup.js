import React, { Component } from 'react';

import TwitchConnect from "./TwitchConnect";

class Signup extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<div className="Signup">
				<TwitchConnect/>
				<form className={"pure-form pure-form-aligned"} onSubmit={this.onSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor={"email"}>Email</label>
							<input id="email" type={"email"} placeholder={"mail@server.com"} onChange={this.onChangeEmail} />
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"username"}>Username</label>
							<input id={"username"} type={"text"}  placeholder={"username"} onChange={this.onChangeUsername} />
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"password"}>Password</label>
							<input id={"password"} type={"password"} placeholder={"password"} onChange={this.onChangePassword} ref={input => this.input = input}/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-controls">
							<label htmlFor="cb" className="pure-checkbox">
								<input type={"checkbox"}/>I've read <a href={"/"}>User Agreement</a> and <a href={"/"} required>Privacy Policy</a>
							</label>
							<button type={"submit"} className={"pure-button pure-button-primary"}>Submit</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	onChangeUsername(event) {
		console.log('username: ' + event.target.value);
	}

	onChangeEmail(event) {
		console.log('email: ' + event.target.value);
	}

	onChangePassword(event) {
		console.log('password: ' + event.target.value);
	}

	onSubmit() {

	}
}

export default Signup;
