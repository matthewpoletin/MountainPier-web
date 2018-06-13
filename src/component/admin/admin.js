"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";

import AdminHome from "./home/adminHome";
import AdminApps from "./apps/adminApps";
import AdminApp from "./app/adminApp";
import AdminDevelopers from "./developers/adminDevelopers";
import AdminDeveloper from "./developer/adminDeveloper";
import AdminServers from "./servers/adminServers";
import AdminNewServer from "./server-new/adminNewServer";
import AdminServer from "./server/adminServer";
import AdminUsers from "./users/adminUsers";
import AdminUser from "./user/adminUser";
import AdminGames from "./games/adminGames";
import AdminGame from "./game/adminGame";
import AdminChannels from "./channels/adminChannels";
import AdminNewChannel from "./channel-new/adminNewChannel";
import AdminChannel from "./channel/adminChannel";

/**
 * Class for Admin react component
 * @author Matthew Poletin
 */
class Admin extends Component {

	componentWillMount() {
		this.setState({
			isAdmin: undefined,
		});
		this.loadUser(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadUser(props)
	}

	loadUser(props) {
		if (props.authUser !== undefined) {
			this.setState({
				isAdmin: props.authUser.role === "ADMIN",
			});
		}
	}

	render() {
		return (
			<div className="admin-home">
				{this.menu()}
				{this.content()}
			</div>
		);
	}

	menu() {
		const menuPages = [
			{link: '/admin', title: 'Home', name: 'home'},
			{link: '/admin/users', title: 'Users', name: 'users'},
			{link: '/admin/games', title: 'Games', name: 'games'},
			{link: '/admin/apps', title: 'Apps', name: 'apps'},
			{link: '/admin/developers', title: 'Developers', name: 'developers'},
			{link: '/admin/channels', title: 'Channels', name: 'channels'},
			{link: '/admin/servers', title: 'Servers', name: 'servers'},
		];
		return (
			<div className="admin-menu pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					{menuPages.map((page, index) => { return(
						<li className={page.name === this.props.page ? "pure-menu-item pure-menu-selected" : "pure-menu-item"} key={index}>
							<Link to={page.link} className="pure-menu-link">
								{page.title}
							</Link>
						</li>
					)})}
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
			case 'game':
				return <AdminGame isAuth={this.props.isAuth} gameId={this.props.match.params.gameId}/>;
			case 'users':
				return <AdminUsers isAuth={this.props.isAuth}/>;
			case 'user':
				return <AdminUser isAuth={this.props.isAuth} userId={this.props.match.params.userId}/>;
			case 'servers':
				return <AdminServers isAuth={this.props.isAuth}/>;
			case 'server-new':
				return <AdminNewServer isAuth={this.props.isAuth} authUser={this.props.authUser}/>;
			case 'server':
				return <AdminServer isAuth={this.props.isAuth} serverId={parseInt(this.props.match.params.serverId, 10)}/>;
			case 'channels':
				return <AdminChannels isAuth={this.props.isAuth}/>;
			case 'channel-new':
				return <AdminNewChannel isAuth={this.props.isAuth} authUser={this.props.authUser}/>;
			case 'channel':
				return <AdminChannel isAuth={this.props.isAuth} channelId={parseInt(this.props.match.params.channelId, 10)}/>;
			case 'developers':
				return <AdminDevelopers isAuth={this.props.isAuth}/>;
			case 'developer':
				return <AdminDeveloper isAuth={this.props.isAuth} developerId={parseInt(this.props.match.params.developerId, 10)}/>;
			case 'apps':
				return <AdminApps isAuth={this.props.isAuth}/>;
			case 'app':
				return <AdminApp isAuth={this.props.isAuth} appId={parseInt(this.props.match.params.appId, 10)}/>;
			default:
				return null;
		}
	}

}

export default Admin;
