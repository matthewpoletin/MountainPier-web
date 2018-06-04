"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types";
import UserService from "../../../service/userService";
import DeveloperService from "../../../service/developerService";

const propTypes = {
	authUser: PropTypes.object,
	developer: PropTypes.object,
};

const defaultProps = {
	authUser: undefined,
	developer: undefined,
};

/** Class for DeveloperSettings react component. */
class DeveloperSettings extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName= this.handleChangeName.bind(this);
		this.handleChangeDescription= this.handleChangeDescription.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeWebsite= this.handleChangeWebsite.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			authUser: undefined,
			name: "",
			description: "",
			website: "",
			email: "",
		});
	}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
				name: props.authUser.username,
				email: props.authUser.regEmail,
			})
		}
		if (props.developer!== undefined) {
			this.setState({
				developer: props.developer,
				name: props.developer.name,
				description: props.developer.description,
				website: props.developer.website,
				email: props.developer.email,
			})
		}
	}

	render() {
		if (this.state.developer !== undefined) {
			return (
				<div className="developer-register">
					<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="avatar">Avatar</label>
								<input
									id="avatar"
									type="file"
									accept="image/*"
								/>
							</div>
							<div className="pure-control-group">
								<label htmlFor="name">Name</label>
								<input
									id="name"
									type="text"
									placeholder="name"
									autoComplete="name"
									onChange={this.handleChangeName}
									defaultValue={this.state.developer.name}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="description">Description</label>
								<textarea
									id="description"
									placeholder="description"
									onChange={this.handleChangeDescription}
									defaultValue={this.state.developer.description}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-control-group">
								<label htmlFor="website">Website</label>
								<input
									id="website"
									type="text"
									placeholder="website"
									onChange={this.handleChangeWebsite}
									defaultValue={this.state.developer.website}
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
									defaultValue={this.state.developer.email}
								/>
								<span className="pure-form-message-inline">This is required field</span>
							</div>
							<div className="pure-controls">
								<button
									id="update"
									type="submit"
									className="pure-button pure-button-primary"
									disabled={!this.validForm()}
								>
									Update
								</button>
							</div>
							<div className="pure-controls">
								<button
									id="delete"
									type="button"
									className="pure-button pure-button-active"
									onClick={this.handleDeleteClick}
								>
									Delete
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
			DeveloperService.updateDeveloper(this.state.developer.id, developerRequest)
				.then(() => {
					window.location.href = "/developers/settings";
				});
		}
	}

	handleDeleteClick(event) {

		console.debug(`Deleting your developer account`);

		DeveloperService.deleteDeveloper(this.state.developer.id)
			.then((response) => {
				//	TODO: redirect
			});
	}

	validName() {
		return this.state.name.length > 0;
	}

	validForm() {
		return this.validName();
	}
}

DeveloperSettings.propTypes = propTypes;
DeveloperSettings.defaultProps = defaultProps;

export default DeveloperSettings;
