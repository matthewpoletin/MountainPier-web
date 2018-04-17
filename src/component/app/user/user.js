import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);
		this.setState({user: undefined});
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
				<div className={"User"}>
					Not found
				</div>
			);
	}
}

export default User;
