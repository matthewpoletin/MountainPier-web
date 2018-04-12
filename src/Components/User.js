import React, { Component } from 'react';

class User extends Component {
	render() {
		const id = "";
		const username = "MatthewPoletin";
		const status = "Online";
		const photo = "https://static-cdn.jtvnw.net/jtv_user_pictures/477636833502e4e6-profile_image-300x300.jpeg";
		return (
			<div className="User">
				<img src={photo} height={100} width={100} alt={""}/><br/>
				id: {id}<br/>
				username: {username}<br/>
				status: {status}<br/>
			</div>
		);
	}
}

export default User;
