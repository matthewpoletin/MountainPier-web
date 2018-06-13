"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import ServerService from "../../../service/serverService";

const propTypes = {
	authUser: PropTypes.object,
	serverId: PropTypes.number,
};

const defaultProps = {
	authUser: undefined,
	serverId:  undefined,
};

/**
 * Class for AdminServer react component
 * @author Matthew Poletin
 */
class AdminServer extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeChannel = this.handleChangeChannel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const serverId = this.props.serverId;

		this.setState({
			authUser: undefined,
			serverId: serverId,
			loading: true,

			name: "",
			gameId: "",
			channelId: "",
		});

		ServerService.getServerById(serverId)
			.then(serverResponse => {
				this.setState({
					server: serverResponse,
					channel: serverResponse.channel,
					game: serverResponse.game,

					name: serverResponse.name,
					gameId: serverResponse.game.id,
					channelId: serverResponse.channel.id.toString(),

					loading: false,
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
			<div className="admin-server">
				{this.server()}
			</div>
		);
	}

	server() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			);
		} else {
			if (this.state.server === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				return (
					<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="off"
									onChange={this.handleChangeName}
									defaultValue={this.state.server.name}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="game">Game</label>
								<input
									id="game"
									type="text"
									placeholder="game"
									autoComplete="off"
									onChange={this.handleChangeGame}
									defaultValue={this.state.server.game.id}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="channel">Channel</label>
								<input
									id="password"
									type="text"
									placeholder="channel"
									autoComplete="off"
									onChange={this.handleChangeChannel}
									defaultValue={this.state.server.channel.id}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="updateApp"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Update Server
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

		if (this.validForm) {
			const serverRequest = {
				name: this.state.name,
				gameId: this.state.gameId,
				channelId: this.state.channelId,
			};
			ServerService.updateServer(this.state.server.id, serverRequest)
				.then((serverResponse) => {
					console.debug(serverResponse);
					this.setState({
						server: serverResponse,
						name: serverResponse.name,
						gameId: serverResponse.game.id,
						channelId: serverResponse.channel.id,
					});
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

AdminServer.propTypes = propTypes;
AdminServer.defaultProps = defaultProps;

export default AdminServer;
