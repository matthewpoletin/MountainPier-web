"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import UserService from "./../../../service/userService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for user react component
 * @author Matthew Poletin
 */
class User extends Component {

	constructor(props) {
		super(props);

		this.onAddFriendClick = this.onAddFriendClick.bind(this);
		this.onRemoveFriendClick = this.onRemoveFriendClick.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			authUser: props.authUser,
		});

		if (this.state.user !== undefined && props.authUser !== undefined) {
			if (props.authUser.id !== this.state.user.id) {

			UserService.getRelation(props.authUser.id, this.state.user.id)
				.then(relation => {
					console.log(relation);
					if (relation.type.toLowerCase() === "friend") {
						this.setState({
							bFriend: true,
						});
					} else {
						this.setState({
							bFriend: false,
						});
					}
				});
			}
		}
	}

	componentWillMount() {
		this.setState({
			authUser: this.props.authUser,
			bFriend: undefined,
			user: undefined,
		});

		const username = this.props.match.params.username;
		UserService.getUserBy({username: username})
			.then(user => {
				this.setState({user: user});
				if (user.id === this.state.authUser.id) {
					this.setState({
						bOwner: true,
					})
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		if (this.state.user === undefined) {
			return (
				<div className="error-block">
					Loading user...
				</div>
			);
		} else {
			return (
				<div className="user">
					<div>
						<img src={this.state.user.avatar} height={100} width={100} alt=""/>
					</div>
					<div>
						{this.state.user.username}
					</div>
					<div>
						{this.state.user.status}
					</div>
					<div>
						{this.friendship()}
					</div>
				</div>
			);
		}
	}

	friendship() {
		if (this.state.bFriend !== undefined) {
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
		console.debug(`Adding user ${this.state.user.username} to ${this.state.authUser.username} friends`);
		UserService.addFriend(this.state.authUser.id, this.state.user.id)
			.then(() => {
				this.setState({
					bFriend: true,
				});
			});
	}

	onRemoveFriendClick() {
		console.debug(`Removing user ${this.state.user.username} from ${this.state.authUser.username} friends`);
		UserService.removeFriend(this.state.authUser.id, this.state.user.id)
			.then(() => {
				this.setState({
					bFriend: false,
				});
			});
	}

}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User;
