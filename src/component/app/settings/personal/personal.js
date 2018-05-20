"use strict";

import React, { Component } from 'react';

/** Class for personal settings react component. */
class PersonalSettings extends Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({user: this.props.user});
	}

	render() {
		if (this.state.user !== undefined)
			return (
				<div className="personal-settings">
					<form className="pure-form pure-form-aligned">
						<fieldset>
							<div className="pure-control-group">
								<input type="file" />
								<img src={this.state.user.avatar} height={40} width={40} alt={""}/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="username">Username</label>
								<input
									id="username"
									type="text"
									placeholder="Username"
									defaultValue={this.state.user.username}
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="username">Email</label>
								<input
									id="email"
									type="text"
									defaultValue={this.state.user.regEmail}
								/>
							</div>
							<div className={"pure-controls"}>
								<input
									type="submit"
									className="pure-button pure-button-primary"
									onClick={this.handleSubmit}
								/>
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

	handleSubmit(event) {
		event.preventDefault();
	}

}

export default PersonalSettings;
