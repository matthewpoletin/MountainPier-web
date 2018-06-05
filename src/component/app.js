"use strict";

import React, { Component } from "react";
import "purecss";
import {getAuthenticatedUser, isAuthenticated} from "../util/authentication";
import Header from "./app/header/header";
import Main from "./main";
import Footer from "./app/footer/footer";

/**
 * Class for app react component
 * @author Matthew Poletin
 */
class App extends Component {

	componentWillMount() {
		if (isAuthenticated()) {
			this.setState({isAuth: true});
			getAuthenticatedUser()
				.then(authUserResponse => {
					this.setState({authUser: authUserResponse});
				})
		}
		else {
			this.setState({isAuth: false});
		}
	}

	render() {
		return (
			<div className="app">
				<Header isAuth={this.state.isAuth} authUser={this.state.authUser}/>
				<Main isAuth={this.state.isAuth} authUser={this.state.authUser}/>
				<Footer/>
			</div>
		);
	}

}

export default App;
