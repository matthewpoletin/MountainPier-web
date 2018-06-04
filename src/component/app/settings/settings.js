"use strict";

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonalSettings from "./personal/settingsPersonal"
import PasswordSettings from "./password/settingsPassword";
import AccountsSettings from "./accounts/settingsAccounts";
import SettingsDeveloper from "./developer/settingsDeveloper";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for settings react component
 * @author Matthew Poletin
 * */
class Settings extends Component {

	render() {
		const settingsPages = [
			{link: "/settings/personal", title: "Personal info", name: 'personal'},
			{link: "/settings/password", title: "Password & Security", name: 'password'},
			// {link: "/settings/accounts", title: "Connected accounts", name: 'accounts'},
			{link: "/settings/developer", title: "Authorized developer", name: 'developer'},
		];

		return (
			<div className="settings">
				<div className="pure-g">
					<div className="pure-u-1-4 settings-menu pure-menu custom-restricted-width">
						<ul className="pure-menu-list">
							{settingsPages.map((page, index) => { return (
								<li className={page.name === this.props.page ? "pure-menu-item pure-menu-selected" : "pure-menu-item"} key={index}>
									<Link to={page.link} className="pure-menu-link">
										{page.title}
									</Link>
								</li>
							)})}
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
