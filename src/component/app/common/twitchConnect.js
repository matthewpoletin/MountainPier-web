"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import {getEnvironment} from "../../../util/environment-utils";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTwitch from "@fortawesome/fontawesome-free-brands/faTwitch";
import "./twitchConnect.css";
const config = require("./../../../../config");
const mode = getEnvironment();

const propTypes = {
	action: PropTypes.string.isRequired,
};

const defaultProps = {
	action: "Connect",
};

/**
 * Class for twitchConnect react component
 * @author Matthew Poletin
 */
class TwitchConnect extends Component {

	render() {
		const twitchBaseURL = "https://api.twitch.tv/kraken/oauth2/authorize";
		const twitchScope = "user_read+user_subscriptions+viewing_activity_read";
		const twitchClientId = config[mode].twitch.clientId;
		const twitchRedirectURI = config[mode].twitch.redirectUri;
		const twitchUrl = `${twitchBaseURL}?response_type=code&client_id=${twitchClientId}&redirect_uri=${twitchRedirectURI}&scope=${twitchScope}`;
		return (
			<div className="connect-twitch">
				<a href={twitchUrl} className="button pure-button">
					<div>
						<div className="logo">
							<FontAwesomeIcon icon={faTwitch}/>
						</div>
						<div className="text">
							{this.props.action} With Twitch
						</div>
					</div>
				</a>
			</div>
		);
	}

}

TwitchConnect.defaultProps = defaultProps;

export default TwitchConnect;
