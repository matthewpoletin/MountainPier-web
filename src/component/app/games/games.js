"use strict";

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import GameService from "./../../../service/gameService"

/**
 * Class for games react component
 * @author Matthew Poletin
 */
class Games extends Component {

	componentWillMount() {
		this.setState({
			games: undefined,
		});

		GameService.getGames({page: 0, size: 25})
			.then(games => {
				this.setState({
					games: games.content
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.state.games !== undefined) {
			const games = this.state.games.map((game, index) =>
				<div className="games" style={{display: "block"}} key={index}>
					<div>
						{game.name}
					</div>
					<div>
						<Link to={`/games/${game.name}`}>
							<img src={game.avatar} height={100} width={100} alt={""}/>
						</Link>
					</div>
					<div>
						{game.description}
						</div>
				</div>
			);
			return (
				<div className={"Games"}>
					{games}
				</div>
			)
		}
		else {
			return (
				<div className="games">
					Loading games...
				</div>
			);
		}
	}

}

export default Games;
