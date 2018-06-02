"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './developer.css';
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

/** Class for Developer react component. */
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
					<li className="pure-menu-item dev-menu-item">
						<Link to="/developers/docs" className="pure-menu-link">
							Docs
						</Link>
					</li>
					{ this.state.isDeveloper ? (
						<li className="pure-menu-item dev-menu-item">
							<Link to="/developers/settings" className="pure-menu-link">
								Settings
							</Link>
						</li>
					) :(
						<li className="pure-menu-item dev-menu-item">
							<Link to="/developers/register" className="pure-menu-link">
								Register
							</Link>
						</li>
					) }
					<li className={this.state.isDeveloper ? "pure-menu-item" : "pure-menu-item pure-menu-disabled"}>
						<Link to="/developers/games" className="pure-menu-link" style={!this.state.isDeveloper ? {pointerEvents: "none"} : null}>
							Games
						</Link>
					</li>
					<li className={this.state.isDeveloper ? "pure-menu-item" : "pure-menu-item pure-menu-disabled"}>
						<Link to="/developers/apps" className="pure-menu-link" style={!this.state.isDeveloper ? {pointerEvents: "none"} : null}>
							Apps
						</Link>
					</li>
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
