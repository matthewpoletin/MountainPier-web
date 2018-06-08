"use strict";

import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAndroid from "@fortawesome/fontawesome-free-brands/faAndroid";
import faAppStoreIos from "@fortawesome/fontawesome-free-brands/faAppStoreIos";

/**
 * Class for download react component
 * @author Matthew Poletin
 */
class Download extends Component {

	render() {
		const appStoreLang = "en";
		const appStoreAppId = "";
		return (
			<div className="Download">
				Mountain Pier
				<a href={"https://play.google.com"}>
					<div>
						<FontAwesomeIcon icon={faAndroid} size={"5x"}/>
					</div>
					<div>
						Get android app
					</div>
				</a>
				<a href={`https://itunes.apple.com/${appStoreLang}/app/id${appStoreAppId}`}>
					<div>
						<FontAwesomeIcon icon={faAppStoreIos} size={"5x"}/>
					</div>
					<div>
						Get iOS app
					</div>
				</a>
			</div>
		);
	}

}

export default Download;
