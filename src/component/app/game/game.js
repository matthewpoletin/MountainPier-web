"use strict";

import React, { Component } from 'react';
import GameService from './../../../service/gameService'

/** Class for game react component. */
class Game extends Component {

	componentWillMount() {
		const name = this.props.match.params.name;
		// TODO: check if name is string and not empty
		this.setState({
			game: undefined,
		});
		GameService.getGameBy({name: name})
			.then(game => {
				this.setState({game: game});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.state.game !== undefined) {
			return (
				<div className={"game"}>
					<div>
						{this.state.game.name}
					</div>
					<div>
						<img src={this.state.game.avatar} height={40} width={40} alt=""/>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="Game">
					Game info not loaded
				</div>
			);
		}
	}

}

export default Game;
