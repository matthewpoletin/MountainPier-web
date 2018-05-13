"use strict";

import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./home/home";
import About from "./about/about";
import Signup from "./signup/signup";
import Login from "./login/login";
import Remind from "./remind/remind";
import Settings from "./settings/settings";
import User from "./user/user";
import Friends from "./user/friends/friends";
import Games from "./games/games";
import Game from "./game/game";
import Search from "./search/search";
import EULA from "./about/eula/eula";

import DeveloperHome from "../developer/home/home"
import DeveloperDocs from "../developer/docs/docs"
import DeveloperGames from "../developer/games/games"
import DeveloperGame from "../developer/game/game"
import DeveloperNewGame from "../developer/game-new/game-new"
import DeveloperApps from "../developer/apps/apps"
import DeveloperApp from "../developer/app/app"
import DeveloperNewApp from "../developer/app-new/app-new"

import AdminHome from "./../admin/home/home";
import AdminUsers from "./../admin/users/users";
import AdminServers from "./../admin/servers/servers";

/** Class for main react component */
class Main extends Component {

	render() {
		return (
			<div className="Main">
				<main>
					<Switch>
						<Route exact path={'/'} component={Home}/>
						<Route exact path={'/about'} component={About}/>
						<Route exact path={'/about/eula'} component={EULA}/>

						<Route path={'/signup'} component={Signup}/>
						<Route path={'/login'} component={Login}/>
						<Route path={'/remind'} component={Remind}/>

						<Route path={'/settings'} component={Settings}/>

						<Route exact path={'/search'} component={Search}/>
						<Route exact path={'/users/:username'} component={User}/>
						<Route path={'/users/:username/friends'} component={Friends}/>
						<Route exact path={'/games'} component={Games}/>
						<Route path={'/games/:name'} component={Game}/>
						{/*<Route path={'/games/:name/servers'} component={GameServers}/>*/}

						<Route exact path={'/developers'} component={DeveloperHome}/>
						<Route path={'/developers/docs'} component={DeveloperDocs}/>
						<Route exact path={'/developers/games'} component={DeveloperGames}/>
						<Route path={'/developers/games/:gameId'} component={DeveloperGame}/>
						<Route path={'/developers/games/new'} component={DeveloperNewGame}/>
						<Route exact path={'/developers/apps'} component={DeveloperApps}/>
						<Route path={'/developers/apps/:appId'} component={DeveloperApp}/>
						<Route path={'/developers/apps/new'} component={DeveloperNewApp}/>

						<Route exact path={'/admin'} component={AdminHome}/>
						<Route path={'/admin/users'} component={AdminUsers}/>
						<Route path={'/admin/servers'} component={AdminServers}/>
						<Route path={'/admin/channels'} component={AdminServers}/>
					</Switch>
				</main>
			</div>
		);
	}

}

export default Main;