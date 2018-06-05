"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import GameService from "../../../service/gameService";

const propTypes = {
	authUser: PropTypes.object,
	gameId: PropTypes.string,
};

const defaultProps = {
	authUser: undefined,
	gameId:  undefined,
};

/**
 * Class for AdminGame react component
 * @author Matthew Poletin
 */
class AdminGame extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const gameId = this.props.gameId;

		this.setState({
			authUser: undefined,
			gameId: gameId,
			username: "",
			description: "",
		});

		GameService.getGameById(gameId)
			.then(gameResponse => {
				this.setState({
					game: gameResponse,
					name: gameResponse.name,
					description: gameResponse.description,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
	}

	render() {
		return (
			<div className="admin-game">
				{this.game()}
			</div>
		);
	}

	game() {
		if (this.state.game !== undefined) {
			return (
				<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor="avatar">Avatar</label>
							<img src={this.state.game.avatar} height={40} width={40} alt={""}/>
							<input
								id="avatar"
								type="file"
								accept="image/*"
							/>
						</div>
						<div className="pure-control-group">
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								placeholder="name"
								onChange={this.handleChangeName}
								defaultValue={this.state.game.name}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
								placeholder="description"
								onChange={this.handleChangeDescription}
								defaultValue={this.state.game.description}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-controls">
							<button
								id="updateGame"
								type="submit"
								className="pure-button pure-button-primary"
								disabled={!this.validForm()}
							>
								Update Game
							</button>
						</div>
					</fieldset>
				</form>
			)
		} else {
			return("Loading...")
		}
	}

	handleChangeName(event) {
		this.setState({
			name: event.target.value,
		});
	}

	handleChangeDescription(event) {
		this.setState({
			description: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm) {
			const gameRequest = {
				name: this.state.name,
				description: this.state.description,
			};
			GameService.updateGameById(this.state.game.id, gameRequest)
				.then((gameResponse) => {
					console.debug(gameResponse);
					this.setState({
						game: gameResponse,
						name: gameResponse.name,
						description: gameResponse.description,
					});
				});
		}
	}

	validName() {
		return this.state.name.length > 0;
	}

	validDescription() {
		return this.state.description.length > 0;
	}

	validForm() {
		return this.validName() && this.validDescription();
	}

}

AdminGame.propTypes = propTypes;
AdminGame.defaultProps = defaultProps;

export default AdminGame;
