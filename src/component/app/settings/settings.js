"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PersonalSettings from "./personal/personal"
import PasswordSettings from "./password/password";
import AccountsSettings from "./accounts/accounts";
import SettingsDeveloper from "./developer/settingsDeveloper";
import PropTypes from "prop-types";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/** Class for settings react component. */
class Settings extends Component {

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

	content() {
		if (this.props.authUser !== undefined)
		{
			switch (this.props.page) {
				case 'personal':
					return <PersonalSettings authUser={this.props.authUser}/>;
				case 'password':
					return <PasswordSettings authUser={this.props.authUser}/>;
				case 'accounts':
					return <AccountsSettings authUser={this.props.authUser}/>;
				case 'developer':
					return <SettingsDeveloper authUser={this.props.authUser}/>;
				default:
					return null;
			}
		}
	}

}

Settings.propTypes =propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
