"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import UserService from "./../../../../service/userService";

/**
 * Class for friends react component
 * @author Matthew Poletin
 */
class Friends extends Component {

	componentWillMount() {
		const username = this.props.match.params.username;
		this.setState({
			friends: undefined
		});
		UserService.getUserBy({username: username})
			.then(user => {
				UserService.getFriendsOfUserById(user.id, {page: 0, size: 25})
					.then(friends => {
						this.setState({
							friends: friends
						});
					}).catch(error => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	}

	render() {
		if (this.state.friends === undefined) {
			return (
				<div className="error-block">
					Not found
				</div>
			);
		} else {
			return (
				<div className="friends">
					{this.state.friends.content.map((friend, index) => { return (
						<div className="friend" key={index}>
							<div className="friend-avatar">
								<Link to={`/users/${friend.username}`}>
									<img src={friend.avatar} height={100} width={100} alt=""/>
								</Link>
							</div>
							<div className="friend-username">
								{friend.username}
							</div>
							<div className="friend-status">
								{friend.status}
							</div>
						</div>
					)})}
				</div>
			);
		}
	}

}

export default Friends;
