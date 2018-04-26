"use strict";

import React, { Component } from 'react';

/** Class for home react component. */
class Home extends Component {

	// TODO: create iframe component
	render() {
		const channelName = "mountainpier-dev1";
		const src = `https://player.twitch.tv/?channel=${channelName}`;

		return (
			<div className="Home">
				<h1>Welcome to MountainPier</h1>

				<iframe src={src}
				        frameBorder="0"
				        scrolling="no"
				        height="378"
				        width="620"
				        allowFullScreen/>
			</div>
		);
	}

}

export default Home;
