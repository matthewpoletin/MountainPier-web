"use strict";

import React, { Component } from 'react';
import UserService from "./../../../service/userService";

/** Class for user react component. */
class User extends Component {

	componentWillMount() {
		const username = this.props.match.params.username;
		this.setState({user: undefined});
		console.log(username);
		UserService.getUserBy({username: username})
			.then(user => {
				this.setState({user: user});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if(this.state.user !== undefined)
			return (
				<div className="User">
					<img src={this.state.user.avatar} height={100} width={100} alt={""}/><br/>
					id: {this.state.user.id}<br/>
					username: {this.state.user.username}<br/>
					status: {this.state.user.status}<br/>
				</div>
			);
		else
			return (
				<div className="User">
					Not found
				</div>
			);
	}

}

export default User;
