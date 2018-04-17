import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./home/home";
import About from "./about/about";
import Signup from "./signup/signup";
import Login from "./login/login";


import User from "./user/user";

import Users from "../admin/users/users";

class Main extends Component {
	render() {
		return (
			<div className="Main">
				<main>
					<Switch>
						<Route exact path={'/'} component={Home}/>
						<Route path={'/about'} component={About}/>
						<Route path={'/signup'} component={Signup}/>
						<Route path={'/login'} component={Login}/>

						<Route path={'/admin/users'} component={Users}/>
						<Route path={'/user/:username'} component={User}/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default Main;
