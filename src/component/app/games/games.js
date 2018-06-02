"use strict";

import React, { Component } from 'react';
import GameService from './../../../service/gameService'
import {Link} from "react-router-dom";

/** Class for games react component. */
class Games extends Component {

	componentWillMount() {
		this.setState({
			game: undefined,
		});

		GameService.getGames({page: 0, size: 25})
			.then(games => {
				this.setState({game: games});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.state.game) {
			const games = this.state.game.content.map((game, index) =>
				<div className="games" style={{"display": "block"}} key={index}>
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
