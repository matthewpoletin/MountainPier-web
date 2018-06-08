"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "./developer.css";
import DeveloperHome from "./home/developerHome";
import DeveloperDocs from "./docs/developerDocs";
import DeveloperRegister from "./register/developerRegister";
import DeveloperSettings from "./settings/developerSettings";
import DeveloperApps from "./apps/developerApps";
import DeveloperApp from "./app/developerApp";
import DeveloperNewApp from "./app-new/developerNewApp";
import DeveloperGames from "./games/developerGames";
import DeveloperGame from "./game/developerGame";
import DeveloperNewGame from "./game-new/developerNewGame";
import UserService from "../../service/userService";

const propTypes = {
	authUser: PropTypes.object,
	page: PropTypes.string,
};

const defaultProps = {
	authUser: undefined,
	page: "home",
};

/**
 * Class for Developer react component
 * @author Matthew Poletin
 */
class Developer extends Component {

	componentWillMount() {
		this.setState({
			authUser: this.props.authUser,
			page: this.props.page,
			isDeveloper: undefined,
			developer: undefined,
		});

		this.loadDeveloper(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadDeveloper(props)
	}

	loadDeveloper(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
			UserService.getDeveloper(props.authUser.id)
				.then((developerResponse) => {
					if (developerResponse !== null) {
						this.setState({
							isDeveloper: true,
							developer: developerResponse,
						});
					} else {
						this.setState({
							isDeveloper: false,
						});
					}
				});
		}
	}


	render() {
		// allowed - can be opened by guest
		this.developerPages = [
			{link: "/developers", title: "Home", name: "home", allowed: true, shownDev: true, shownGuest: true},
			{link: "/developers/docs", title: "Docs", name: "docs", allowed: true, shownDev: true, shownGuest: true},
			{link: "/developers/register", title: "Register", name: "register", allowed: true, shownDev: false, shownGuest: true},
			{link: "/developers/settings", title: "Settings", name: "settings", allowed: this.state.isDeveloper, shownDev: true, shownGuest: false},
			{link: "/developers/games", title: "Games", name: "games", allowed: false, shownDev: true, shownGuest: true},
			{link: "/developers/apps", title: "Apps", name: "apps", allowed: false, shownDev: true, shownGuest: true},
		];
		const page = _.find(this.developerPages, ["name", this.props.page]);
		return (
			<div>
				{this.menu()}
				{this.content()}
			</div>
		);
	}

	menu() {
		return (
			<div className="developer-menu pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					{this.developerPages.map((page, index) => { if (this.state.isDeveloper && page.shownDev || !this.state.isDeveloper && page.shownGuest) return (
						<li className={page.name === this.props.page ? "pure-menu-item pure-menu-selected" : "pure-menu-item"} key={index}>
							<Link
								to={page.link}
								className={!(this.state.isDeveloper || page.allowed) ? "pure-menu-link pure-menu-disabled" : "pure-menu-link" }
								style={!(this.state.isDeveloper || page.allowed) ? {pointerEvents: "none"} : null}
							>
								{page.title}
							</Link>
						</li>
					)})}
				</ul>
			</div>
		);
	}

	content() {
		switch (this.props.page) {
			case 'home':
				return <DeveloperHome authUser={this.props.authUser}/>;
			case 'docs':
				return <DeveloperDocs authUser={this.props.authUser}/>;
			case 'register':
				return <DeveloperRegister authUser={this.props.authUser}/>;
			case 'settings':
				return <DeveloperSettings authUser={this.props.authUser} developer={this.state.developer}/>;
			case 'apps':
				return <DeveloperApps authUser={this.props.authUser}/>;
			case 'app':
				return <DeveloperApp authUser={this.props.authUser} appId={parseInt(this.props.match.params.appId, 10)}/>;
			case 'app-new':
				return <DeveloperNewApp authUser={this.props.authUser}/>;
			case 'games':
				return <DeveloperGames authUser={this.props.authUser}/>;
			case 'game':
				return <DeveloperGame authUser={this.props.authUser} gameId={this.props.match.params.gameId}/>;
			case 'game-new':
				return <DeveloperNewGame authUser={this.props.authUser} developer={this.state.developer}/>;
			default:
				return null;
		}
	}

}

Developer.propTypes =propTypes;
Developer.defaultProps = defaultProps;

export default Developer;
