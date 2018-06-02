"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import ServerService from "../../../service/serverService";

/** Class for servers react component. */
class AdminServers extends Component {

	componentWillMount() {
		this.setState({
			servers: undefined,
		});
	}

	componentDidMount() {
		ServerService.getServers()
			.then(servers => {
				this.setState({
					servers: servers,
				});
			}).catch(error => {
				console.error(error);
			});
	}

	render() {
		if (this.state.servers !== undefined) {
			const servers = this.state.servers.content.map((server, index) => {
				return (
					<tr className={"server"} key={index} align="center">
						<td>
							<Link to={`/admin/servers/${server.id}`}>
								{server.id}
							</Link>
						</td>
						<td>{server.gameId}</td>
						<td>{server.name}</td>
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
		}
		else {
			return (
				<div className="admin-servers">
					Nothing yet here
				</div>
			);
		}
	}

}

export default AdminServers;
