"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
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
		return (
			<div className="admin-servers">
				<Link to="/admin/servers/new">
					<button className="pure-button pure-button-active">
						Create server
					</button>
				</Link>
				{this.servers()}
			</div>
		);
	}

	servers() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			)
		} else {
			if (this.state.servers === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				if (this.state.servers.length === 0) {
					return (
						<div className="none">
							Not found
						</div>
					);
				} else {
					return (
						<div className="admin-servers">
							<table width="100%">
								<thead>
									<tr>
										<th colSpan={2}>Game</th>
										<th>Name</th>
										<th>Channel</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.servers.map((server, index) => { return (
										<tr className="server" key={index} align="center">
											<td>
												<Link to={`/games/${server.game.name}`}>
													<img src={server.game.avatar} height={40} width={40} alt={""}/>
												</Link>
											</td>
											<td>
												<Link to={`/admin/games/${server.game.id}`}>
													{server.game.name}
												</Link>
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
												<Link to={`/admin/servers/${server.id}`}>
													<FontAwesomeIcon icon={faWrench} size={"2x"}/>
												</Link>
											</td>
											<td>
												<a onClick={() => this.deleteServer(index, server.id)}>
													<FontAwesomeIcon icon={faTrash} size={"2x"}/>
												</a>
											</td>
										</tr>
									)})}
								</tbody>
							</table>
						</div>
					);
				}
			}
		}
	}

	deleteServer(index, serverId) {
		console.debug(`Attempting to delete #${index} server ${serverId}`);
		if (window.confirm(`Delete server ${this.state.servers[index].name}?`)) {
			ServerService.deleteServer(serverId)
				.then(() => {
					const servers = this.state.servers;
					servers.splice(index, 1);
					this.setState({
						servers: servers,
					});
				}).catch(error => {
					console.error(error);
					window.alert(error);
				});
		}
	}

}

export default AdminServers;
