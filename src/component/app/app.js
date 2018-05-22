"use strict";

import React, { Component } from 'react';
import 'purecss';
import Header from "./header/header";
import Main from "./main";
import Footer from "./footer/footer";
import {getAuthenticatedUser, isAuthenticated} from "../../util/authentication";

/** Class for app react component. */
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
