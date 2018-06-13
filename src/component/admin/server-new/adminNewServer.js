"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import ServerService from "../../../service/serverService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for creating new server
 * @author Matthew Poletin
 */
class AdminNewServer extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeGame = this.handleChangeGame.bind(this);
		this.handleChangeChannel = this.handleChangeChannel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		if (this.props.authUser !== undefined) {
			this.setState({
				authUser: this.props.authUser,
			});
		}
		this.setState({
			name: "",
			gameId: "",
			channelId: "",
		})
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
	}

	render() {
		if (this.state.authUser !== undefined) {
			return (
				<div className="developer-app-new">
					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="username">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="off"
									onChange={this.handleChangeName}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="Game">Game</label>
								<input
									id="game"
									type="text"
									placeholder="game"
									autoComplete="off"
									onChange={this.handleChangeGame}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="secret">Channel</label>
								<input
									id="channel"
									type="text"
									placeholder="channel"
									autoComplete="off"
									onChange={this.handleChangeChannel}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="createServer"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Create Server
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
			username: event.target.value,
		});
	}

	handleChangeGame(event) {
		this.setState({
			gameId: event.target.value,
		});
	}

	handleChangeChannel(event) {
		this.setState({
			channelId: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			const gameRequest = {
				name: this.state.name,
				gameId: this.state.gameId,
				channelId: this.state.channelId,
			};
			ServerService.createServer(gameRequest)
				.then((serverResponse) => {
					window.location.href = `/admin/servers/${serverResponse.id}`;
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	validName() {
		return this.state.name.length > 0;
	}

	validGame() {
		return this.state.gameId.length > 0;
	}

	validChannel() {
		return this.state.channelId.length > 0;
	}

	validForm() {
		return this.validName() && this.validGame() && this.validChannel();
	}

}

AdminNewServer.propTypes = propTypes;
AdminNewServer.defaultProps = defaultProps;

export default AdminNewServer;
