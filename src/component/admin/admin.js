"use strict";

import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import AdminHome from "./home/adminHome";
import AdminApps from "./apps/adminApps";
import AdminDevelopers from "./developers/adminDevelopers";
import AdminServers from "./servers/adminServers";
import AdminUsers from "./users/adminUsers";
import AdminGames from "./games/adminGames";
import AdminChannels from "./channles/adminChannels";

/** Class for Admin react component. */
class Admin extends Component {

	render() {
		return (
			<div className="admin-home">
				{this.menu()}
				{this.content()}
			</div>
		);
	}

	menu() {
		return (
			<div className="admin-menu pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					<li className="pure-menu-item">
						<Link to="/admin" className="pure-menu-link">
							Home
						</Link>
					</li>
					<li className="pure-menu-item">
						<Link to="/admin/users" className="pure-menu-link">
							Users
						</Link>
					</li>
					<li className="pure-menu-item">
						<Link to="/admin/servers" className="pure-menu-link">
							Servers
						</Link>
					</li>
					<li className="pure-menu-item">
						<Link to="/admin/games" className="pure-menu-link">
							Games
						</Link>
					</li>
					<li className="pure-menu-item">
						<Link to="/admin/apps" className="pure-menu-link">
							Apps
						</Link>
					</li>
					<li className="pure-menu-item">
						<Link to="/admin/developers" className="pure-menu-link">
							Developers
						</Link>
					</li>
				</ul>
			</div>
		)
	}

	content() {
		switch (this.props.page) {
			case 'home':
				return <AdminHome/>;
			case 'games':
				return <AdminGames isAuth={this.props.isAuth}/>;
			case 'users':
				return <AdminUsers isAuth={this.props.isAuth}/>;
			case 'servers':
				return <AdminServers/>;
			case 'channels':
				return <AdminChannels isAuth={this.props.isAuth}/>;
			case 'developers':
				return <AdminDevelopers isAuth={this.props.isAuth}/>;
			case 'apps':
				return <AdminApps isAuth={this.props.isAuth}/>;
			default:
				return null;
		}
	}

}

export default Admin;
