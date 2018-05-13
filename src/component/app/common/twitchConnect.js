"use strict";

import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitch from '@fortawesome/fontawesome-free-brands/faTwitch'
import "./twitchConnect.css"
const config = require("./../../../../config");

const mode = "dev";

/** Class for twitchConnect react component. */
class TwitchConnect extends Component {

	render() {
		const twitchBaseURL = "https://api.twitch.tv/kraken/oauth2/authorize";
		const twitchClientId = config[mode].twitch.clientId;
		const twitchRedirectURI = "http://mountainpier.ru/oauth";
		const twitchScope = "user_read+user_subscriptions+viewing_activity_read";
		const twitchUrl = `${twitchBaseURL}?response_type=code&client_id=${twitchClientId}&redirect_uri=${twitchRedirectURI}&scope=${twitchScope}`;
		return (
			<div className="TwitchConnect">
				<a href={twitchUrl} className={"button"}>
					<FontAwesomeIcon icon={faTwitch}/>
					<span>Connect With Twitch</span>
				</a>
			</div>
		);
	}

}

export default TwitchConnect;
