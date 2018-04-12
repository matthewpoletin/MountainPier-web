import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Game extends Component {
	render() {
		return (
			<div className="Game">
				<div>
					<h3>Chess</h3>
				</div>
				<div>
					Developer:
					<Link to={"/users/matthewpoletin"}>MatthewPoletin</Link>
				</div>
			</div>
		);
	}
}

export default Game;
