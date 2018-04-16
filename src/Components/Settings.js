import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitch from '@fortawesome/fontawesome-free-brands/faTwitch'

class Settings extends Component {
	constructor(props) {
		super(props);

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.twitchConnected = true;

		this.state = {
			twitchConnectText: "Connected",
		};
	}

	render() {
		const username = "MatthewPoletin";
		const email = "mail@server.com";
		const password = "qwerty2018";
		const twitch = false;

		return (
			<div className="Settings">
				User settings
				<form className={"pure-form pure-form-aligned"} onSubmit={this.onSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor={"username"}>Username</label>
							<input id={"username"} type={"text"}  placeholder={"username"} defaultValue={username} onChange={this.onChangeUsername} />
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"email"}>Email</label>
							<input id={"email"} type={"email"}  placeholder={"email"} defaultValue={email} onChange={this.onChangeEmail} />
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor={"password"}>Password</label>
							<input id={"password"} type={"password"} placeholder={"password"} defaultValue={password} onChange={this.onChangePassword} ref={input => this.input = input}/>
							<span className={"pure-form-message-inline"}>This is required field</span>
						</div>
						<div className="pure-controls">
							<button type={"submit"} className={"pure-button pure-button-primary"}>Submit</button>
						</div>

						<div className={""}>
							<div>
								<div><FontAwesomeIcon icon={faTwitch}/></div>
								<div>Twitch connection</div>
								<div>
									<a href={"/twitch/disconnect"} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>{this.state.twitchConnectText}</a>
								</div>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}

	onMouseEnter(event) {
		this.twitchConnected
			? this.setState({twitchConnectText: "Disconnect"})
			: this.setState({twitchConnectText: "Connect"});
	}

	onMouseLeave() {
		this.twitchConnected
			? this.setState({twitchConnectText: "Connected"})
			: this.setState({twitchConnectText: "Disconnected"});
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

export default Settings;
