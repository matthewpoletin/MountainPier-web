"use strict";

import React, { Component } from 'react';
import UserService from "./../../../service/userService";
import {getAuthenticatedUser, isAuthenticated} from "../../../util/authentication";

const defaultProps = {
	authUser: undefined,
	bOwner: false,
	bFriend: false,
};

/** Class for user react component. */
class User extends Component {

	constructor(props) {
		super(props);

		this.onAddFriendClick = this.onAddFriendClick.bind(this);
	}

	componentWillMount() {
		const username = this.props.match.params.username;
		this.setState({
			authUser: undefined,
			user: undefined,
		});
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
					{this.befriend()}
				</div>
			);
		else
			return (
				<div className="User">
					Not found
				</div>
			);
	}

	befriend() {
		if (!this.state.bOwner) {
			if (!this.state.bFriend) {
				return(
					<div className="add-friend">
						<div className="pure-button" onClick={this.onAddFriendClick}>
							Add to friends
						</div>
					</div>
				);
			}
			else {
				return(
					<div className="remove-friend">
						<div className="pure-button" onClick={this.onRemoveFriendClick}>
							Remove from friends
						</div>
					</div>
				);
			}
		}
	}

	onAddFriendClick() {
		console.log(this.state.user);
		console.log(this.state.authUser);
		console.debug(`Adding user ${this.state.user.username} to ${this.state.authUser.username} friends`);
		UserService.addFriend(this.state.authUser.id, this.state.user.id);
	}

	onRemoveFriendClick() {
		console.debug(`Adding user ${this.state.user.username} from ${this.state.authUser.username} friends`);
	}

}

User.defaultProps = defaultProps;

export default User;
