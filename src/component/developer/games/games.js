"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types";
import GameService from "../../../service/gameService";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import {Link} from "react-router-dom";
import UserService from "../../../service/userService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/** Class for DeveloperGames react component. */
class DeveloperGames extends Component {

	componentWillMount() {
		this.setState({
			games: undefined,
			authUser: undefined,
		});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
			UserService.getDeveloperGames(props.authUser.id)
				.then((gamesResponse) => {
					this.setState({
						games: gamesResponse,
					});
				});
		}
	}

	render() {
		return (
			<div className="developer-games">
				<Link to="/developers/games/new">
					<button className="pure-button">
						New game
					</button>
				</Link>
				{this.games()}
			</div>
		);
	}

	games() {
		if (this.state.games !== undefined && this.state.games.length > 0) {
			const apps = this.state.games.map((game, index) =>
				<tr className="user" key={index}>
					<td>
						<Link to={`/developers/apps/${game.id}`}>
							{game.name}
						</Link>
					</td>
					<td>
						{game.id}
					</td>
					<td>
						<Link to={`/developers/apps/${game.id}`}>
							<FontAwesomeIcon icon={faWrench} size={"2x"}/>
						</Link>
					</td>
					<td>
						<a href="" onClick={() => this.deleteApp(game.id, index)}>
							<FontAwesomeIcon icon={faTrash} size={"2x"}/>
						</a>
					</td>
				</tr>
			);

			return(
				<table border="1px" width="100%">
					<thead>
					<tr>
						<th>Name</th>
						<th>Id</th>
						<th> </th>
						<th> </th>
					</tr>
					</thead>
					<tbody>
					{apps}
					</tbody>
				</table>
			)
		}
	}

	deleteGame(gameId, index) {
		console.debug(`Deleting game ${gameId} on ${index}`);
		GameService.deleteGameById(gameId)
			.then(() => {

			});
	}

}

DeveloperGames.propTypes = propTypes;
DeveloperGames.defaultProps = defaultProps;

export default DeveloperGames;
