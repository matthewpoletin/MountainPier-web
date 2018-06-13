"use strict";

import React, { Component } from "react";
import "./home.css";

/**
 * Class for home react component
 * @author Matthew Poletin
 */
class Home extends Component {

	// TODO: create iframe component
	render() {
		const channelName = "mountainpier";
		const src = `https://player.twitch.tv/?channel=${channelName}`;
		const chatSrc = `http://www.twitch.tv/embed/${channelName}/chat`;

		return (
			<div className="Home">
				<h1>Welcome to MountainPier</h1>
				<div className={"pure-g"}>
					{/*<div className={"pure-u-3-4 video"}>*/}
						{/*<iframe*/}
							{/*src={src}*/}
					        {/*frameBorder="0"*/}
					        {/*scrolling="no"*/}
					        {/*height="400"*/}
					        {/*width="600"*/}
					        {/*allowFullScreen*/}
						{/*/>*/}
					{/*</div>*/}
					{/*<div className={"pure-u-1-4 chat"}>*/}
						{/*<iframe*/}
							{/*src={chatSrc}*/}
							{/*frameBorder="0"*/}
							{/*scrolling="no"*/}
							{/*id="chat_embed"*/}
							{/*height="400"*/}
							{/*width="200"*/}
						{/*/>*/}
					{/*</div>*/}
				</div>
			</div>
		);
	}

}

export default Home;
