"use strict";

import React, { Component } from 'react';

/** Class for password and security settings react component. */
class PasswordSettings extends Component {

	componentWillMount() {
		this.setState({user: this.props.user});
	}

	render() {
		if (this.state.user !== undefined)
			return (
				<div className="password-settings">
					<form className="pure-form pure-form-aligned">
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="current-password">Current password</label>
								<input id="current-password"
								       type="password"
								       placeholder="current password"
								       onChange={this.handleChangePassword}
								       ref={input => this.input = input}
								       defaultValue={this.state.password}
								       autoComplete="current-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="new-password">New password</label>
								<input id="new-password"
								       type="password"
								       placeholder="new password"
								       onChange={this.handleChangePassword}
								       ref={input => this.input = input}
								       defaultValue={this.state.password}
								       autoComplete="new-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="retype-new-password">Retype new password</label>
								<input id="retype-new-password"
								       type="password"
								       placeholder={"retype new password"}
								       onChange={this.handleChangePassword}
								       ref={input => this.input = input}
								       defaultValue={this.state.password}
								       autoComplete="new-password"
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<input type="submit" className="pure-button pure-button-primary"/>
							</div>
						</fieldset>
					</form>
				</div>
			);
		else return(
			<div>
				User is not defined
			</div>
		);
	}

}

export default PasswordSettings;
