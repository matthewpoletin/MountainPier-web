import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";

import User from "./User";
import Games from "./Games";
import Game from "./Game";

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

						<Route path={'/games'} component={Games}/>
						<Route path={'/games/:gameName'} component={Game}/>
						<Route path={'/user/:userId'} component={User}/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default Main;
