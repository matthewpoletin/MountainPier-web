import React, { Component } from 'react';
import {Link} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitch from '@fortawesome/fontawesome-free-brands/faTwitch'

class Friends extends Component {
	getFriend(friend) {
		return (
			<div className={"Friend"}>
				<Link to={`/user/${friend.name}`}>
					Kormvina
				</Link>
				<a href={`http://twitch.tv/${friend.twitch}`}>
					<FontAwesomeIcon icon={faTwitch} alt={"Twitch account"}/>
				</a>
			</div>
		)
	}

	render() {
		const friend = {
			name: "Kormvina",
			twitch: "kormvina"
		};
		return (
			<div className="Friends">
				{this.getFriend(friend)}
			</div>
		);
	}
}

export default Friends;
