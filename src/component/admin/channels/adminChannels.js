"use strict";

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import PropTypes from "prop-types"
import ChannelsService from "../../../service/channelService";

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

const defaultProps = {
	isAuth: false,
};

/** Class for AdminChannels react component */
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
				this.setState({loading: false});
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			)
		} else {
			if (typeof this.state.channels !== 'undefined') {
				if (this.state.channels.length === 0) {
					return <div>Not found</div>
				} else {
					const channels = this.state.channels.map((channel, index) =>
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
								{channel.status}
							</td>
							<td>
								{new Date(channel.dateAdded).toISOString().slice(0,10).replace(/-/g,"")}
							</td>
							<td>
								{new Date(channel.dateAdded).toISOString().slice(0,10).replace(/-/g,"")}
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
					);
					return (
						<table className="channels-list" width="100%">
							<thead>
								<tr>
									<th>Avatar</th>
									<th>Username</th>
									<th>Password</th>
									<th>Email</th>
									<th>Status</th>
									<th>Date added</th>
									<th>Date updated</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{channels}
							</tbody>
						</table>
					);
				}
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

	deleteChannel(index, channelId) {
		console.info(`Deleting ${index} channel ${channelId}`);
		if (window.confirm(`Delete channel ${this.state.channels[index].username}?`)) {
			ChannelsService.deleteChannel(channelId)
				.then(response => {
					const channels = this.state.channels;
					channels.splice(index, 1);
					this.setState({
						channels: channels,
					});
				})
				.catch(error => console.error(error));
		}
	}

}

AdminChannels.propTypes = propTypes;
AdminChannels.defaultProps = defaultProps;

export default AdminChannels;
