"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import ServerService from "../../../service/serverService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
	authUser: PropTypes.object,
};

const defaultProps = {
	isAuth: false,
	authUser: undefined,
};

/**
 * Class for server react component
 * @author Matthew Poletin
 */
class Server extends Component {

	componentWillMount() {
		const serverId = this.props.match.params.serverId;

		this.setState({
			serverId: serverId,
			loading: true,
		});

		ServerService.getServerById(serverId)
			.then((serverResponse) => {
				this.setState({
					loading: false,
					server: serverResponse,
				})
			}).catch((error) => {
				console.log(error);
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		return (
			<div className="server">
				{this.server()}
			</div>
		);
	}

	server() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			);
		} else {
			if (this.state.server === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				return (
					<div className="server-info">
						<div className="server-name">
							<h3>
								{this.state.server.name}
							</h3>
						</div>
						<div className="server-game">
							<div className="game-header">
								<h4>Game</h4>
							</div>
							<div className="game-avatar">
								{this.state.server.game.avatar}
							</div>
							<div className="game-name">
								{this.state.server.game.name}
							</div>
							<div className="game-description">
								{this.state.server.game.description}
							</div>
						</div>
						<div className="server-channel">
							<div className="channel-header">
								<h4>Channel</h4>
							</div>
							<div className="channel-name">
								<a href={`https://twitch.tv/${this.state.server.channel.username}`}>
									{this.state.server.channel.username}
								</a>
							</div>
						</div>
					</div>
				);
			}
		}
	}

}

Server.propTypes = propTypes;
Server.defaultProps = defaultProps;

export default Server;
