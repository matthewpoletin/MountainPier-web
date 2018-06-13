"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import GameService from "../../../service/gameService";

const propTypes = {
	developer: PropTypes.object,
};

const defaultProps = {
	developer: undefined,
};

/**
 * Class for DeveloperNewGame react component
 * @author Matthew Poletin
 */
class DeveloperNewGame extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			developer: undefined,
			name: "",
			description: "",
		});
		this.loadDeveloper(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadDeveloper(props);
	}

	loadDeveloper(props) {
		if (props.developer !== undefined) {
			this.setState({
				developer: this.props.developer,
			});
		}
	}

	render() {
		if (this.props.developer !== undefined) {
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
									id="createGame"
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
		} else {
			return null;
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

		if (this.validForm()) {
			const gameRequest = {
				name: this.state.name,
				description: this.state.description,
			};
			GameService.createGame(gameRequest)
				.then((gameResponse) => {
					GameService.setDeveloper(gameResponse.id, this.props.developer.id)
						.then((_gameResponse) => {
							window.location.href = `/dev/games/${_gameResponse.id}`;
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

DeveloperNewGame.propTypes = propTypes;
DeveloperNewGame.defaultProps = defaultProps;

export default DeveloperNewGame;
