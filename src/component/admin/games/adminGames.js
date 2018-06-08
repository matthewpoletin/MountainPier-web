"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import GameService from "../../../service/gameService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/**
 * Class for AdminGames react component
 * @author Matthew Poletin
 */
class AdminGames extends Component {

	componentWillMount() {
		this.setState({
			games: undefined,
			loading: true,
		});
		GameService.getGames({page: 0, size: 20})
			.then(games => {
				this.setState({
					games: games.content,
					loading: false,
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({loading: false});
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			)
		} else {
			if (this.state.games === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.games.length === 0) {
					return <div>Not found</div>
				} else {
					return (
						<table className="games-list" width="100%">
							<thead>
								<tr>
									<th>Avatar</th>
									<th>Name</th>
									<th>Developer</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.games.map((game, index) => { return (
									<tr align="center" key={index}>
										<td>
											<Link to={`/admin/games/${game.name}`}>
												<img src={game.avatar} height={100} width={100} alt={""}/>
											</Link>
										</td>
										<td>
											<Link to={`/admin/games/${game.name}`}>
												{game.name}
											</Link>
										</td>
										<td>
											{game.developers[0] ? (
												<a href={`/developers/${game.developers[0].id}`}>
													{game.developers[0].name}
												</a>
											) : null
											}
										</td>
										<td>
											<a href={`/admin/games/${game.id}`}>
												<FontAwesomeIcon icon={faWrench} size={"2x"}/>
											</a>
										</td>
										<td>
											<a onClick={() => this.deleteGame(index, game.id)}>
												<FontAwesomeIcon icon={faTrash} size={"2x"}/>
											</a>
										</td>
									</tr>
								)})}
							</tbody>
						</table>
					);
				}
			}
		}
	}

	deleteGame(index, gameId) {
		console.debug(`Attempting to delete #${index} game ${gameId}`);
		if (window.confirm(`Delete game ${this.state.games[index].name}?`)) {
			GameService.deleteGameById(gameId)
				.then(() => {
					const games = this.state.games;
					games.splice(index, 1);
					this.setState({
						games: games,
					});
				})
				.catch(error => {
					console.error(error);
					windows.alert(error);
				});
		}
	}

}

AdminGames.propTypes = propTypes;
AdminGames.defaultProps = defaultProps;

export default AdminGames;
