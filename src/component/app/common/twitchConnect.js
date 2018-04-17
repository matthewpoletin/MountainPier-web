import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitch from '@fortawesome/fontawesome-free-brands/faTwitch'

class TwitchConnect extends Component {
	render() {
		const twitchClientId = "gmorlpxdgnavsssk2gudj355nfx2o6";
		const twitchRedirectURI = "http://mountainpier.ru/oauth";
		const twitchScope = "user_read+user_subscriptions+viewing_activity_read";
		return (
			<div className="TwitchConnect">
				<a href={`https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=${twitchClientId}&redirect_uri=${twitchRedirectURI}&scope=${twitchScope}`}>
					<FontAwesomeIcon icon={faTwitch}/>&nbsp;Connect With Twitch
				</a>
			</div>
		);
	}

}

export default TwitchConnect;
