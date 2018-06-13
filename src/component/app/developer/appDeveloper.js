"use strict";

import React, { Component } from "react";
import DeveloperService from "../../../service/developerService";

/**
 * Class for AppDeveloper react component
 * @author Matthew Poletin
 */
class DeveloperInfo extends Component {

	componentWillMount() {
		const developerId = this.props.match.params.developerId;
		this.setState({
			loading: true,
			developer: undefined,
			loadingGames: true,
			games: undefined,
		});
		DeveloperService.getDeveloper(developerId)
			.then(developerResponse => {
				this.setState({
					developer: developerResponse,
					loading: false,
				});
				DeveloperService.getGames(developerId)
					.then(gamesResponse => {
						this.setState({
							games: gamesResponse.content,
							loadingGames: false,
						});
					}).catch(error => {
						this.setState({
							loadingGames: false,
						});
					});
			}).catch(error => {
				console.error(error);
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading
				</div>
			);
		} else {
			if (this.state.developer === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				return (
					<div className="developer">
						<div className="developer-name">
							{this.state.developer.name}
						</div>
						<div className="developer-description">
							{this.state.developer.description}
						</div>
						<div className="developer-website">
							<a href={`/${this.state.developer.website}`}>
								{this.state.developer.website}
							</a>
						</div>
						<div className="developer-games">
							{this.games()}
						</div>
					</div>
				);
			}
		}
	}

	games() {
		if (this.state.loadingGames) {
			return null;
		} else {
			if (this.state.games === undefined) {
				return null;
			} else {
				if (this.state.games.length === 0) {
					return null;
				} else {
					this.state.games.map((game, index) => {
						return (
							<div className="game">
								{game.name}
							</div>
						)
					});
				}
			}
		}
	}

}

export default DeveloperInfo;
