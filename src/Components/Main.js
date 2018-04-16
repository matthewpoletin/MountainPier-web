import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";

import Settings from "./Settings";

import User from "./User";
import Games from "./Games";
import Game from "./Game";
import Friends from "./Friends";
import Users from "./Users";

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


						<Route path={'/users'} component={Users}/>

						<Route path={'/user/:username'} component={User}/>

						<Route path={'/friends'} component={Friends}/>

						<Route path={'/games'} component={Games}/>
						<Route path={'/games/:gameName'} component={Game}/>

					</Switch>
				</main>
			</div>
		);
	}
}

export default Main;
