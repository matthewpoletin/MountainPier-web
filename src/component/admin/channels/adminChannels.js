"use strict";

import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import ChannelsService from "../../../service/channelService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/**
 * Class for AdminChannels react component
 * @author Matthew Poletin
 */
class AdminChannels extends Component {

	componentWillMount() {
		this.setState({
			channels: undefined,
			loading: true,
		});
		ChannelsService.getChannels({page: 0, size: 20})
			.then(channelsResponse => {
				this.setState({
					channels: channelsResponse.content,
					loading: false,
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		return (
			<div className="admin-channels">
				<Link to="/admin/channels/new">
					<button className="pure-button pure-button-active">
						Create channel
					</button>
				</Link>
				{this.channels()}
			</div>
		);
	}

	channels() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			)
		} else {
			if (this.state.channels === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.channels.length === 0) {
					return (
						<div className="none">
							Not found
						</div>
					);
				} else {
					return (
						<table className="admin-channels" width="100%">
							<thead>
								<tr>
									<th>Avatar</th>
									<th>Username</th>
									<th>Password</th>
									<th>Email</th>
									<th>Date added</th>
									<th>Date updated</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.channels.map((channel, index) => { return (
									<tr key={index} align="center">
										<td>
											<a href={`https://twitch.tv/${channel.username}`}>
												<img src={channel.avatar} height={100} width={100} alt={""}/>
											</a>
										</td>
										<td>
											<Link to={`/channels/${channel.name}`}>
												{channel.username}
											</Link>
										</td>
										<td>
											{channel.password}
										</td>
										<td>
											{channel.email}
										</td>
										<td>
											{new Date(channel.dateAdded).toISOString().slice(0, 10).replace(/-/g, "")}
										</td>
										<td>
											{new Date(channel.dateAdded).toISOString().slice(0, 10).replace(/-/g, "")}
										</td>
										<td>
											<Link to={`/admin/channels/${channel.id}`}>
												<FontAwesomeIcon icon={faWrench} size={"2x"}/>
											</Link>
										</td>
										<td>
											<a onClick={() => this.deleteChannel(index, channel.id)}>
												<FontAwesomeIcon icon={faTrash} size={"2x"}/>
											</a>
										</td>
									</tr>
								)})}
							</tbody>
						</table>
					);
				}
			}
		}
	}

	deleteChannel(index, channelId) {
		console.debug(`Attempting to delete ${index} channel ${channelId}`);
		if (window.confirm(`Delete channel ${this.state.channels[index].username}?`)) {
			ChannelsService.deleteChannel(channelId)
				.then(() => {
					const channels = this.state.channels;
					channels.splice(index, 1);
					this.setState({
						channels: channels,
					});
				})
				.catch(error => {
					console.error(error);
					window.alert(error);
				});
		}
	}

}

AdminChannels.propTypes = propTypes;
AdminChannels.defaultProps = defaultProps;

export default AdminChannels;
