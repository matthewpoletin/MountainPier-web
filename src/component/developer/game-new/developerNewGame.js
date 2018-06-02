"use strict";

import React, { Component } from 'react';
import GameService from "../../../service/gameService";

/** Class for DeveloperNewGame react component. */
class DeveloperNewGame extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			developer: this.props.developer,

			name: "",
			description: "",
		})
	}

	render() {
		return (
			<div className="developer-game-new">
				<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="pure-control-group">
							<label htmlFor="name">Name</label>
							<input
								id="name"
							    type="text"
							    placeholder="name"
							    onChange={this.handleChangeName}
							/>
							<span className="pure-form-message-inline">This is required field</span>
						</div>
						<div className="pure-control-group">
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
						        placeholder="description"
						        onChange={this.handleChangeDescription}
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
								Create game
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
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

		if (this.validForm()) {
			const gameRequest = {
				name: this.state.name,
				description: this.state.description,
			};
			GameService.createGame(gameRequest)
				.then((gameResponse) => {
					GameService.setDeveloper(gameResponse.id, this.state.developer.id)
						.then((_gameResponse) => {
							window.location.href = `/developers/games/${_gameResponse.id}`;
						});
				})
				.catch((error) => {

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

export default DeveloperNewGame;
