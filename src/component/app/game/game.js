"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import GameService from "./../../../service/gameService"

/**
 * Class for game react component
 * @author Matthew Poletin
 */
class Game extends Component {

	componentWillMount() {
		const name = this.props.match.params.name;
		// TODO: check if name is string and not empty
		this.setState({
			loadingGame: true,
			game: undefined,
			servers: undefined,
		});
		GameService.getGameBy({name: name})
			.then(gameResponse => {
				this.setState({
					loadingGame: false,
					game: gameResponse
				});
				GameService.getServersOfGame(gameResponse.id)
					.then((serversResponse) => {
						this.setState({
							servers: serversResponse.content,
						});
					});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					loadingGame: false,
				});
			});
	}

	render() {
		return (
			<div className="game">
				{this.game()}
			</div>
		);
	}

	game() {
		if (this.state.loadingGame) {
			return (
				<div className="lo  ading">
					Loading...
				</div>
			);
 		} else {
			if (this.state.game === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				return (
					<div className="game-info">
						<div className="game-header">
							<h3>Game</h3>
						</div>
						<div className="game-name">
							{this.state.game.name}
						</div>
						<div className="game-description">
							{this.state.game.description}
						</div>
						<div className="game-avatar">
							<img src={this.state.game.avatar} height={40} width={40} alt=""/>
						</div>
						{this.servers()}
					</div>
				);
			}
		}
	}

	servers() {
		if (this.state.servers === undefined) {
			return null;
		} else {
			return (
				<div className="servers">
					<div className="servers-header">
						<h4>Servers</h4>
					</div>
					<div className="servers-list">
						{this.state.servers.map((server, index) => { return (
							<div className="server" key={index}>
								<Link to={`/servers/${server.id}`}>
									{server.name}
								</Link>
							</div>
						)})}
					</div>
				</div>
			);
		}
	}

}

export default Game;
