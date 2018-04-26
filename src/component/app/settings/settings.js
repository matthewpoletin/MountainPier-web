"use strict";

import React, { Component } from 'react';
import UserService from "../../../service/userService";

/** Class for settings react component. */
class Settings extends Component {

	componentWillMount() {
		const username = "MatthewPoletin";

		this.setState({user: undefined});
		UserService.getUserBy({username: username})
			.then(user => {
				this.setState({user: user});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.state.user !== undefined)
			return (
				<div className="Settings">
					<form className={"pure-form pure-form-aligned"}>
						<fieldset>
							<div>
								<input type="file" />
								<img src={this.state.user.avatar} height={40} width={40} alt={""}/>
							</div>
							<div className={"pure-control-group"}>
								<label htmlFor="username">Username</label>
								<input id={"name"} type={"text"} placeholder={"Username"} defaultValue={this.state.user.username}/>
							</div>
							<div className={"pure-control-group"}>
								<label htmlFor="username">Email</label>
								<input id={"email"} type={"text"} defaultValue={this.state.user.regEmail}/>
							</div>
							<div className={"pure-controls"}>
								<input type={"submit"} className={"pure-button pure-button-primary"}/>
							</div>
						</fieldset>
					</form>
				</div>
			);
		else return null;
	}

}

export default Settings;
