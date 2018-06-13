"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import DeveloperService from "../../../service/developerService";

const propTypes = {
	authUser: PropTypes.object,
	developerId: PropTypes.number,
};

const defaultProps = {
	authUser: undefined,
	developerId: undefined,
};

/**
 * Class for AdminDeveloper react component
 * @author Matthew Poletin
 */
class AdminDeveloper extends Component {

	constructor(props) {
		super(props);

		this.handleChangeName= this.handleChangeName.bind(this);
		this.handleChangeDescription= this.handleChangeDescription.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeWebsite= this.handleChangeWebsite.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const developerId = this.props.developerId;
		console.log(developerId);

		this.setState({
			authUser: undefined,
			developerId: developerId,
			name: "",
			description: "",
			website: "",
			email: "",
			loading: true,
		});

		DeveloperService.getDeveloper(developerId)
			.then(developerResponse => {
				this.setState({
					developer: developerResponse,
					name: developerResponse.name,
					description: developerResponse.description,
					website: developerResponse.website,
					email: developerResponse.email,
					loading: false,
				});
			}).catch(error => {
				console.error(error);
				this.setState({
					loading: false,
				});
			});
		}

	componentWillReceiveProps(props) {
		if (props.authUser !== undefined) {
			this.setState({
				authUser: props.authUser,
			});
		}
	}

	render() {
		return (
			<div className="admin-developer">
				{this.developer()}
			</div>
		);
	}

	developer() {
		if (this.state.loading) {
			return (
				<div className="loading">
					Loading...
				</div>
			);
		} else {
			if (this.state.developer === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				return (
					<div className="admin-developer">
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
										autoComplete="off"
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
										autoComplete="off"
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
										autoComplete="off"
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
										autoComplete="off"
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
							</fieldset>
						</form>
					</div>
				)
			}
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
				.then((developerResponse) => {
					this.setState({
						developer: developerResponse,
						name: developerResponse.name,
						description: developerResponse.description,
						website: developerResponse.website,
						email: developerResponse.email,
					});
				});
		}
	}

	validName() {
		return this.state.name.length > 0;
	}

	validDescription() {
		return this.state.description.length > 0;
	}

	validWebsite() {
		// TODO: Check for regexp
		return true;
	}

	validEmail() {
		// TODO: Check for regexp
		return this.state.email.length > 0 && true;
	}

	validForm() {
		return this.validName() && this.validDescription() && this.validWebsite() && this.validEmail();
	}


}

AdminDeveloper.propTypes = propTypes;
AdminDeveloper.defaultProps = defaultProps;

export default AdminDeveloper;
