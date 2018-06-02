"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import './developer.css';
import DeveloperHome from "./home/home";
import DeveloperDocs from "./docs/docs";
import DeveloperRegister from "./register/register";
import DeveloperApps from "./apps/apps";
import DeveloperApp from "./app/app";
import DeveloperNewApp from "./app-new/app-new";
import DeveloperGames from "./games/games";
import DeveloperGame from "./game/game";
import DeveloperNewGame from "./game-new/game-new";

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
		});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
		this.setState({
			page: props.page,
		});
	}

	render() {
		return (
			<div>
				<div className="developer-menu">
					<div className={"pure-g"}>
						<div className={"pure-u-1-3 dev-menu-item"}>
							<Link to={"/developers/docs"}>
								Docs
							</Link>
						</div>
						<div className={"pure-u-1-3 dev-menu-item"}>
							<Link to={"/developers/games"}>
								Games
							</Link>
						</div>
						<div className={"pure-u-1-3 dev-menu-item"}>
							<Link to={"/developers/apps"}>
								Apps
							</Link>
						</div>
					</div>
				</div>
				{this.content()}
			</div>
		);
	}

	content() {
		switch (this.state.page) {
			case 'home':
				return <DeveloperHome authUser={this.props.authUser}/>;
			case 'docs':
				return <DeveloperDocs authUser={this.props.authUser}/>;
			case 'register':
				return <DeveloperRegister authUser={this.props.authUser}/>;
			case 'apps':
				return <DeveloperApps authUser={this.props.authUser}/>;
			case 'app':
				return <DeveloperApp authUser={this.props.authUser} appId={parseInt(this.props.match.params.appId, 10)}/>;
			case 'app-new':
				return <DeveloperNewApp authUser={this.props.authUser}/>;
			case 'games':
				return <DeveloperGames authUser={this.props.authUser}/>;
			case 'game':
				return <DeveloperGame authUser={this.props.authUser} gameId={parseInt(this.props.match.params.gameId, 10)}/>;
			case 'game-new':
				return <DeveloperNewGame authUser={this.props.authUser}/>;
			default:
				return null;
		}
	}

}

Developer.propTypes =propTypes;
Developer.defaultProps = defaultProps;

export default Developer;
