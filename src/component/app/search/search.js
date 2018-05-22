"use strict";

import React, { Component } from 'react';
import UserService from "../../../service/userService";
import {Link} from "react-router-dom";

/** Class for search react component. */
class Search extends Component {

	constructor(props) {
		super(props);

		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			search: "",
			result: undefined,
		});
	}

	render() {
			return (
				<div className="search">

					<form className={"pure-form pure-form-aligned"} onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="pure-control-group">
								<label htmlFor="search">Search</label>
								<input id="search"
								       type="text"
								       placeholder="search"
								       onChange={this.handleSearchChange}
								       defaultValue={this.state.search}
								       autoComplete="username"
								/>
							</div>
							<div className="pure-controls">
								<button id="login"
								        type="submit"
								        className="pure-button pure-button-primary">
									Search
								</button>
							</div>
						</fieldset>
					</form>
					{this.result()}
				</div>
			);
	}

	result() {
		if (this.state.result !== undefined) {
			const users = this.state.result.content.map((user, index) =>
				<div className="user" style={{"display": "block"}} key={index}>
					<Link to={`/users/${user.username}`}>
						<div>
							{user.username}
						</div>
						<div>
							<img src={user.avatar} height={100} width={100} alt={""}/><br/>
						</div>
						<div>
							{user.id}
						</div>
					</Link>
				</div>
			);
			return (
				<div className="result">
					{users}
				</div>
			);
		} else {
			return null;
		}
	}

	handleSearchChange(event) {
		this.setState({
			search: event.target.value
		});
		this.handleSubmit(event);
		console.log('search: ' + event.target.value);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.search);
		UserService.getUsersWith({username: this.state.search})
			.then(users => {
				console.log(users);
				this.setState({
					result: users,
				});
			}).catch(error => {
				console.error(error);
			});
	}

}

export default Search;
