import React, { Component } from 'react';
// import UserService from "../api/UserService";

class User extends Component {
	constructor(props) {
		super(props);

		this.username = props.match.params.username;
		if (this.username === "MatthewPoletin") {
			this.userId = "d1098e96-ca3d-11e7-abc4-cec278b6b50a";
		} else {
			this.userId = "210e8d5b-8a1b-4b6e-93f4-0af7be69e38f";
		}

		// this.setState({});
		// UserService.getUserById(this.userId).then((user) => {
		// 	this.setState({user: user});
		// }).catch((error) => {
		// 	console.log(error);
		// 	// TODO: redirect to 404
		// })
	}

	render() {
		const user = this.state.user;
		// const username = this.user.username;
		// const status = "Online";
		// const photo = "https://static-cdn.jtvnw.net/jtv_user_pictures/477636833502e4e6-profile_image-300x300.jpeg";

		if (user)
			return (
				<div className="User">
					{this.username}
					<img src={user.avatar} height={100} width={100} alt={""}/><br/>
					id: {user.id}<br/>
					username: {user.username}<br/>
					status: {user.status}<br/>
				</div>
			);
		else
			return (
				<div className={"User"}>
					Not found
				</div>
			);
	}
}

export default User;
