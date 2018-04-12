import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Games extends Component {

	render() {
		return (
			<div className="Games">
				<div>
					<Link to={"/games/chess"}>
						Chess
					</Link>
				</div>
				<div>
					Go
				</div>
			</div>
		);
	}
}

export default Games;
