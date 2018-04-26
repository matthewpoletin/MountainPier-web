"use strict";

import React, { Component } from 'react';
import UserService from "./../../../../service/userService";
import {Link} from "react-router-dom";

/** Class for friends react component. */
class Friends extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const username = this.props.match.params.username;
		this.setState({
			friends: undefined
		});
		UserService.getUserBy({username: username})
			.then(user => {
				UserService.getFriendsOfUserById(user.id, {page: 0, size: 25})
					.then(friends => {
						console.log(friends);
						this.setState({friends: friends});
					}).catch(error => {
						console.log(error);
					});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if(this.state.friends !== undefined)
		{
			const friends = this.state.friends.content.map((user, index) =>
				this.friend(user, index)
			);
			return (
				<div className="Friends">
					{friends}
				</div>
			);
		}
		else
			return (
				<div className="Friends">
					Not found
				</div>
			);
	}

	friend(friend, index) {
		return (
			<div className="friend" key={index}>
					<Link to={`/users/${friend.username}`}>
						<span>{friend.username}</span>
						<img src={friend.avatar} height={100} width={100} alt={""}/><br/>
					</Link>
					<p>id: {friend.id}</p>
					<p>username: {friend.username}</p>
					<p>status: {friend.status}</p>
			</div>
		);
	}

}

export default Friends;
