"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import UserService from "../../../service/userService";

const propTypes = {
	authUser: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
};

/**
 * Class for DeveloperRegister react component
 * @author Matthew Poletin
 */
class DeveloperRegister extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName= this.handleChangeName.bind(this);
		this.handleChangeDescription= this.handleChangeDescription.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeWebsite= this.handleChangeWebsite.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			authUser: undefined,
			name: "",
			description: "",
			website: "",
			email: "",
		});
		this.loadAuthUser(this.props);
	}

	componentWillReceiveProps(props) {
		this.loadAuthUser(props);
	}

	loadAuthUser(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
				name: props.authUser.username,
				email: props.authUser.regEmail,
			})
		}
	}

	render() {
		if (this.state.authUser !== undefined) {
			return (
				<div className="developer-register">
					<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="name"
									onChange={this.handleChangeName}
									defaultValue={this.state.authUser.username}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="description">Description</label>
								<textarea
									id="description"
									placeholder="description"
									onChange={this.handleChangeDescription}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="website">Website</label>
								<input
									id="website"
									type="url"
									placeholder="website"
									onChange={this.handleChangeWebsite}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="email"
									placeholder="email"
									autoComplete="email"
									onChange={this.handleChangeEmail}
									defaultValue={this.state.authUser.regEmail}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="register"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Register
								</button>
							</div>
						</fieldset>
					</form>
				</div>
			);
		} else {
			return("Loading...")
		}
	}

	handleChangeName(event) {
		this.setState({
			name: event.target.value,
		});
	}

	handleChangeDescription(event) {
		this.setState({
			description: event.target.value,
		});
	}

	handleChangeWebsite(event) {
		this.setState({
			website: event.target.value,
		});
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.validForm()) {
			const developerRequest = {
				name: this.state.name,
				description: this.state.description,
				website: this.state.website,
				email: this.state.email,
			};
			UserService.createDeveloper(this.state.authUser.id, developerRequest)
				.then((developerResponse) => {
					window.location.href = "/dev";
				});
		}
	}

	validName() {
		return this.state.name.length > 0;
	}

	validForm() {
		return this.validName();
	}

}

DeveloperRegister.propTypes = propTypes;
DeveloperRegister.defaultProps = defaultProps;

export default DeveloperRegister;
