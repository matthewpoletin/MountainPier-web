"use strict";

import React, { Component } from 'react';
import {Link} from "react-router-dom";
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
				console.log(servers);
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
					<div className={"server"} key={index}>
						<Link to={`/admin/servers/${server.id}`}>
							<div>Server id: {server.id}</div>
							<div>Game id: {server.gameId}</div>
							<div>Name: {server.name}</div>
							<div>Channel id: {server.channelId}</div>
						</Link>
					</div>
				);
			});

			return (
				<div className="admin-servers">
					{servers}
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
