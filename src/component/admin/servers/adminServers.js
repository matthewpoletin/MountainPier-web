"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from '@fortawesome/fontawesome-free-solid/faWrench';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import ServerService from "../../../service/serverService";

/**
 * Class for admin servers react component
 * @author MatthewPoletin
 */
class AdminServers extends Component {

	componentWillMount() {
		this.setState({
			servers: undefined,
			loading: true,
		});
	}

	componentDidMount() {
		ServerService.getServers()
			.then(serversResponse => {
				this.setState({
					servers: serversResponse.content,
					loading: false,
				});
			}).catch(() => {
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			)
		} else {
			if (this.state.servers !== undefined) {
				const servers = this.state.servers.map((server, index) => {
					return (
						<tr className={"server"} key={index} align="center">
							<td>
								<Link to={`/admin/servers/${server.id}`}>
									{server.id}
								</Link>
							</td>
							<td>
								{server.gameId}
							</td>
							<td>
								{server.name}
							</td>
							<td>
								<Link to={`/admin/channels/${server.channel.id}`}>
									{server.channel.username}
								</Link>
							</td>
							<td>
								<Link to={`/admin/server/${server.id}`}>
									<FontAwesomeIcon icon={faWrench} size={"2x"}/>
								</Link>
							</td>
							<td>
								<a onClick={() => this.deleteServer(index, server.id)}>
									<FontAwesomeIcon icon={faTrash} size={"2x"}/>
								</a>
							</td>
						</tr>
					);
				});

				return (
					<div className="admin-servers">
						<table width="100%">
							<thead>
								<tr>
									<th>Id</th>
									<th>Game</th>
									<th>Name</th>
									<th>Channel</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{servers}
							</tbody>
						</table>
					</div>
				);
			} else {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			}
		}
	}

	deleteServer(index, serverId) {
		console.debug(`Deleting #${index} server ${serverId}`);
		if (window.confirm(`Delete server ${this.state.servers[index].name}?`)) {
			ServerService.deleteServer(serverId)
				.then(() => {
					const servers = this.state.servers;
					servers.splice(index, 1);
					this.setState({
						servers: servers,
					});
				})
				.catch(error => console.error(error));
		}
	}

}

export default AdminServers;
