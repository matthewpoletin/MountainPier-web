"use strict";

import React, {Component} from 'react';
import UserService from "./../../../service/userService";
import {Link} from "react-router-dom";

/** Class for users react component */
class Users extends Component {

	componentWillMount() {
		this.setState({
			users: undefined,
			loading: true,
		});
		UserService.getUsers({page: 0, size: 20})
			.then(users => {
				this.setState({users: users, loading: false});
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
					Loading
				</div>
			)
		} else {
			if (typeof this.state.users !== 'undefined') {
				if (this.state.users.content.length === 0) {
					return <div>Not found</div>
				} else {
					const users = this.state.users.content.map((user, index) =>
						<li className="user" style={{"display": "block"}} key={index}>
							<Link to={`/user/${user.username}`}>
								<span>{user.username}</span>
								<img src={user.avatar} height={100} width={100} alt={""}/><br/>
							</Link>
							<p>id: {user.id}</p>
							<p>username: {user.username}</p>
							<p>status: {user.status}</p>
						</li>
					);
					return (
						<ul className="user-list">
							{users}
						</ul>
					);
				}
			} else {
				return (
					<div className="error-block">Error in request</div>
				);
			}
		}
	}

}

export default Users;
