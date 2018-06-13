"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import UserService from "../../../../service/userService"

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for SettingsDeveloper react component
 * @author Matthew Poletin
 */
class SettingsDeveloper extends Component {

	componentWillMount() {
		this.setState({
			authUser: this.props.authUser,
			isDeveloper: undefined,
		});

		UserService.getDeveloper(this.props.authUser.id)
			.then((developerResponse) => {
				if (developerResponse !== null) {
					this.setState({
						isDeveloper: true,
					});
				} else {
					this.setState({
						isDeveloper: false,
					});
				}
			});
	}

	render() {
		if (this.state.authUser === undefined) {
			return (
				<div className="loading">
					Loading auth user...
				</div>
			);
		} else {
			if (this.state.isDeveloper === undefined) {
				return (
					<div className="loading">
						Loading developer status
					</div>
				)
			} else {
				if (this.state.isDeveloper) {
					return (
						<div className="developer-settings">
							<Link to="/dev">
								<button className="pure-button pure-button-active">
									Developers page
								</button>
							</Link>
						</div>
					)
				} else {
					return (
						<div className="developer-settings">
							<Link to="/dev/register">
								<button className="pure-button pure-button-active">
									Register developer
								</button>
							</Link>
						</div>
					);
				}
			}
		}
	}

}

SettingsDeveloper.propTypes = propTypes;
SettingsDeveloper.defaultProps = defaultProps;

export default SettingsDeveloper;
