"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import GameService from "../../../service/gameService";
import UserService from "../../../service/userService";
import DeveloperService from "../../../service/developerService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for DeveloperGames react component
 * @author Matthew Poletin
 */
class DeveloperGames extends Component {

	componentWillMount() {
		this.setState({
			games: undefined,
			authUser: undefined,
			loading: true,
		});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
			UserService.getDeveloper(props.authUser.id)
				.then((developerResponse) => {
					DeveloperService.getGames(developerResponse.id)
						.then((gamesResponse) => {
							this.setState({
								games: gamesResponse.content,
								loading: false,
							});
						}).catch(() => {
							this.setState({
								loading: false,
							});
						});
				});
		}
	}

	render() {
		return (
			<div className="developer-games">
				<Link to="/dev/games/new">
					<button className="pure-button">
						New game
					</button>
				</Link>
				{this.games()}
			</div>
		);
	}

	games() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading
				</div>
			);
		} else {
			if (this.state.games === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.games.length === 0) {
					return (
						<div className="none">
							Not found
						</div>
					);
				} else {
					return (
						<table width="100%">
							<thead>
								<tr>
									<th>Name</th>
									<th>Id</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.games.map((game, index) => { return (
									<tr className="game" key={index} align="center">
										<td>
											<Link to={`/dev/games/${game.id}`}>
												{game.name}
											</Link>
										</td>
										<td>
											{game.id}
										</td>
										<td>
											<Link to={`/dev/games/${game.id}`}>
												<FontAwesomeIcon icon={faWrench} size={"2x"}/>
											</Link>
										</td>
										<td>
											<a href="" onClick={() => this.deleteGame(game.id, index)}>
												<FontAwesomeIcon icon={faTrash} size={"2x"}/>
											</a>
										</td>
									</tr>
								)})}
							</tbody>
						</table>
					)
				}
			}
		}
	}

	deleteGame(gameId, index) {
		console.debug(`Attempting to delete game ${gameId} on ${index}`);
		if (window.confirm(`Delete game ${this.state.games[index].name}?`)) {
			GameService.deleteGameById(gameId)
				.then(() => {
					const games = this.state.games;
					games.splice(index, 1);
					this.setState({
						games: games,
					});
				});
		}
	}

}

DeveloperGames.propTypes = propTypes;
DeveloperGames.defaultProps = defaultProps;

export default DeveloperGames;
