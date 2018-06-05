"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types"
import GameService from "../../../service/gameService";

const propTypes = {
	authUser: PropTypes.object,
	gameId: PropTypes.string,
};

const defaultProps = {
	authUser: undefined,
	gameId: undefined,
};

/**
 * Class for DeveloperGame react component
 * @author Matthew Poletin
 */
class DeveloperGame extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			authUser: undefined,
			loading: true,
			name: "",
			description: "",
		});

		const gameId = this.props.gameId;
		GameService.getGameById(gameId)
			.then(gameResponse => {
				this.setState({
					loading: false,
					game: gameResponse,
					name: gameResponse.name,
					description: gameResponse.description,
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					loading: false,
				});
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
			<div className="developer-game">
				{this.game()}
			</div>
		);
	}

	game() {
		if (this.state.loading) {
			return (
				<div className="loading">
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
					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="off"
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
									autoComplete="off"
									onChange={this.handleChangeDescription}
									defaultValue={this.state.game.description}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="login"
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
			}
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
				userId: this.state.authUser.id,
				name: this.state.name,
				description: this.state.description,
			};
			GameService.updateGameById(this.state.game.id, gameRequest)
				.then((gameResponse) => {
					console.log(gameResponse);
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
		return this.validName && this.validDescription();
	}

}

DeveloperGame.propTypes = propTypes;
DeveloperGame.defaultProps = defaultProps;

export default DeveloperGame;
