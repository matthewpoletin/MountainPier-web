"use strict";

import React, { Component } from 'react';
import {getAuthenticatedUser} from "../../../util/authentication";
import {Link} from "react-router-dom";
import PersonalSettings from "./personal/personal"
import PasswordSettings from "./password/password";
import AccountsSettings from "./accounts/accounts";
import DeveloperSettings from "./developer/developer";

/** Class for settings react component. */
class Settings extends Component {

	componentWillMount() {
		this.setState({user: undefined});
		getAuthenticatedUser()
			.then(user => {
				this.setState({user: user});
			})
			.catch(error => {
				console.log(error);
			});
	}

	content() {
		if (this.state.user !== undefined)
		{
			switch (this.props.page) {
				case 'personal':
					return <PersonalSettings user={this.state.user}/>;
				case 'password':
					return <PasswordSettings user={this.state.user}/>;
				case 'accounts':
					return <AccountsSettings user={this.state.user}/>;
				case 'developer':
					return <DeveloperSettings user={this.state.user}/>;
				default:
					return null;
			}
		}
	}

	render() {
		return (
			<div className="settings">
				<div className="pure-g">
					<div className="pure-u-1-4 settings-menu pure-menu custom-restricted-width">
						<ul className="pure-menu-list">
							<li className="pure-menu-item">
								<Link to="/settings/personal" className="pure-menu-link">Personal info</Link>
								<Link to="/settings/password" className="pure-menu-link">Password & Security</Link>
								<Link to="/settings/accounts" className="pure-menu-link">Connected accounts</Link>
								<Link to="/settings/developer" className="pure-menu-link">Authorized developer</Link>
							</li>
						</ul>
					</div>
					<div className="pure-u-3-4">
						{this.content()}
					</div>
				</div>
			</div>
		);
	}

}

export default Settings;
