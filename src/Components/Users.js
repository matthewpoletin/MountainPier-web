import React, { Component } from 'react';
import UserService from "../api/UserServiceBrowser";

class Users extends Component {
	constructor(props) {
		super(props);
		this.userService = new UserService();
	}

	componentWillMount() {
		this.setState({
			users: undefined,
			loading: true,
		});
		setTimeout(() => {
			this.userService.getUsers({page: 0, size: 20})
				.then(users => {
					this.setState({users: users, loading: false});
				})
				.catch(error => {
					console.error(error);
					this.setState({loading: false});
				});
		}, 2000);
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
					const users = this.state.users.content.map(user =>
						<li className="user" style={{"display": "block"}}>
							<span>{user.username}</span>
							<img src={user.avatar} height={100} width={100} alt={""}/><br/>
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
