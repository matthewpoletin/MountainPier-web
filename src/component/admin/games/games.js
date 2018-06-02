"use strict";

import React, {Component} from 'react';
import UserService from "./../../../service/userService";
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import {getAuthenticatedUser, isAuthenticated} from "../../../util/authentication";
import PropTypes from "prop-types"
import GameService from "../../../service/gameService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/** Class for AdminGames react component */
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
			if (typeof this.state.games !== 'undefined') {
				if (this.state.games.length === 0) {
					return <div>Not found</div>
				} else {
					const games = this.state.games.map((game, index) =>
						<tr key={index}>
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
								{game.status}
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
								<a onClick={() => this.editGame(index, game.id,)}>
									<FontAwesomeIcon icon={faWrench} size={"2x"}/>
								</a>
							</td>
							<td>
								<a onClick={() => this.deleteGame(index, game.id)}>
									<FontAwesomeIcon icon={faTrash} size={"2x"}/>
								</a>
							</td>
						</tr>
					);
					return (
						<table className="games-list" width="100%">
							<thead>
								<tr>
									<th> </th>
									<th>Name</th>
									<th>Status</th>
									<th>Developer</th>
									<th> </th>
									<th> </th>
								</tr>
							</thead>
							<tbody>
								{games}
							</tbody>
						</table>
					);
				}
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

	editGame(index, gameId) {
		console.log(`Editing ${index} game ${gameId}`);

	}

	deleteGame(index, gameId) {
		console.log(`Deleting ${index} game ${gameId}`);
		GameService.deleteGameById(gameId)
			.then(response => {
				const games = this.state.games;
				games.splice(index, 1);
				this.setState({
					games: games,
				});
			})
			.catch(error => console.log(error));
	}

}

AdminGames.propTypes = propTypes;
AdminGames.defaultProps = defaultProps;

export default AdminGames;
