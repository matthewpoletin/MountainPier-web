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
				<div className="game" style={{"display": "block"}} key={index}>
					<Link to={`/games/${game.name}`}>
						<span>{game.name}</span>
						<img src={game.avatar} height={100} width={100} alt={""}/><br/>
					</Link>
					<p>id: {game.id}</p>
					<p>description: {game.description}</p>
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
				<div className="Games">
					Games live will be displayed here
				</div>
			);
		}
	}

}

export default Games;
