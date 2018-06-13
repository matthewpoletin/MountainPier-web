"use strict";

import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./search.css";
import UserService from "../../../service/userService";

/**
 * Class for search react component
 * @author Matthew Poletin
 */
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
								<input
									id="search"
								    type="search"
								    placeholder="search"
								    onChange={this.handleSearchChange}
								    defaultValue={this.state.search}
								    autoComplete="username"
								/>
							</div>
							<div className="pure-controls">
								<button
									id="search"
									type="submit"
									className="pure-button pure-button-primary"
								>
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
		if (this.state.result === undefined) {
			return null;
		} else {
			return (
				<div className="result">
					{this.state.result.content.map((user, index) => { return (
						<div className="user" style={{"display": "block"}} key={index}>
							<div className="user-avatar">
								<Link to={`/users/${user.username}`}>
									<img src={user.avatar} height={100} width={100} alt={""}/>
								</Link>
							</div>
							<div className="user-username">
								<Link to={`/users/${user.username}`}>
									{user.username}
								</Link>
							</div>
							<hr/>
						</div>
					)})}
				</div>
			);
		}
	}

	handleSearchChange(event) {
		this.setState({
			search: event.target.value
		});
		this.handleSubmit(event);
	}

	handleSubmit(event) {
		event.preventDefault();
		UserService.getUsersWith({username: this.state.search})
			.then(users => {
				this.setState({
					result: users,
				});
			}).catch(error => {
				console.error(error);
			});
	}

}

export default Search;
