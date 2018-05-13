"use strict";

import React, { Component } from 'react';
import "./about.css"
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers'
import faTasks from '@fortawesome/fontawesome-free-solid/faTasks'
import faPeopleCarry from '@fortawesome/fontawesome-free-solid/faPeopleCarry'

/** Class for about react component. */
class About extends Component {

	// TODO: Write about info with basic service functionality
	render() {
		return (
			<div className="About">
				<div className={"features pure-g"}>
					<div className={"feature pure-u-1-4"}>
						<div className={"feature-content"}>
							<div className={"feature-icon"}>
								<FontAwesomeIcon icon={faGlobe} size={"5x"}/>
							</div>
							<div className={"feature-title"}>
								Join anywhere
							</div>
							<div className={"feature-text"}>
								Any device
							</div>
						</div>
					</div>
					<div className={"feature pure-u-1-4"}>
						<div className={"feature-content"}>
							<div className={"feature-icon"}>
								<FontAwesomeIcon icon={faUsers} size={"5x"}/>
							</div>
							<div className={"feature-title"}>
								Find friends
							</div>
							<div className={"feature-text"}>
							</div>
						</div>
					</div>
					<div className={"feature pure-u-1-4"}>
						<div className={"feature-content"}>
							<div className={"feature-icon"}>
								<FontAwesomeIcon icon={faPeopleCarry} size={"5x"}/>
							</div>
							<div className={"feature-title"}>
								Play together
							</div>
							<div className={"feature-text"}>
								Dozens of people play simultaneously
							</div>
						</div>
					</div>
					<div className={"feature pure-u-1-4"}>
						<div className={"feature-content"}>
							<div className={"feature-icon"}>
								<FontAwesomeIcon icon={faTasks} size={"5x"}/>
							</div>
							<div className={"feature-title"}>
								Solve problems
							</div>
							<div className={"feature-text"}>
								A lot of tasks are presented to your entertainment
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default About;
