"use strict";

import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./home/home";
import About from "./about/about";
import Signup from "./signup/signup";
import Login from "./login/login";
import Settings from "./settings/settings";
import User from "./user/user";
import Friends from "./user/friends/friends";
import Games from "./games/games";
import Game from "./game/game";
import Users from "../admin/users/users";

/** Class for main react component */
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
						<Route path={'/settings'} component={Settings}/>

						<Route exact path={'/users/:username'} component={User}/>
						<Route path={'/users/:username/friends'} component={Friends}/>
						<Route exact path={'/games'} component={Games}/>
						<Route path={'/games/:name'} component={Game}/>
						{/*<Route path={'/games/:name/servers'} component={Servers}/>*/}

						<Route path={'/admin/users'} component={Users}/>
					</Switch>
				</main>
			</div>
		);
	}

}

export default Main;
