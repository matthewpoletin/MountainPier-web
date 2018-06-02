"use strict";

import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";

import Home from "./app/home/home";
import About from "./app/about/about";
import Signup from "./app/signup/signup";
import Login from "./app/login/login";
import Remind from "./app/remind/remind";
import Settings from "./app/settings/settings";
import User from "./app/user/user";
import Friends from "./app/user/friends/friends";
import Games from "./app/games/games";
import Game from "./app/game/game";
import Search from "./app/search/search";
import EULA from "./app/about/eula/eula";

import Developer from "./developer/developer"

import Admin from "./admin/admin";

import OAuthTwitch from "./app/oauth/twitch";

import NotFound from "./app/notFound/notFound"

const propTypes = {
	isAuth: PropTypes.bool.isRequired,
	authUser: PropTypes.object,
};

const defaultProps = {
	isAuth: false,
	authUser: undefined,
};

/** Class for main react component */
class Main extends Component {

	render() {
		return (
			<div className="main">
				<main>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route exact path='/about' component={About}/>
						<Route exact path='/about/eula' component={EULA}/>

						<Route exact path='/signup' component={Signup}/>
						<Route exact path='/login' component={Login}/>
						<Route exact path='/remind' component={Remind}/>

						<Route exact path='/settings' render={() => <Settings page='personal' authUser={this.props.authUser}/>}/>}/>
						<Route exact path='/settings/personal' render={() => <Settings page='personal' authUser={this.props.authUser}/>}/>
						<Route exact path='/settings/password' render={() => <Settings page='password' authUser={this.props.authUser}/>}/>
						<Route exact path='/settings/accounts' render={() => <Settings page='accounts' authUser={this.props.authUser}/>}/>}/>
						<Route exact path='/settings/developer' render={() => <Settings page='developer' authUser={this.props.authUser}/>}/>}/>

						<Route exact path='/search' component={Search}/>
						<Route exact path='/users/:username' render={(props) => <User authUser={this.props.authUser} {...props} />}/>
						<Route exact path='/users/:username/friends' component={Friends}/>
						<Route exact path='/games' component={Games}/>
						<Route exact path='/games/:name' component={Game}/>

						<Route exact path='/developers' render={() => <Developer page='home' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/docs' render={() => <Developer page='docs' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/register' render={() => <Developer page='register' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/settings' render={() => <Developer page='settings' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/games' render={() => <Developer page='games' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/games/new' render={() => <Developer page='game-new' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/games/:gameId' render={(props) => <Developer page='game' authUser={this.props.authUser} {...props}/>}/>
						<Route exact path='/developers/apps' render={() => <Developer page='apps' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/apps/new' render={() => <Developer page='app-new' authUser={this.props.authUser}/>}/>
						<Route exact path='/developers/apps/:appId' render={(props) => <Developer page='app' authUser={this.props.authUser} {...props}/>}/>

						<Route exact path='/admin' render={() => <Admin page='home'/>}/>
						<Route exact path='/admin/games' render={() => <Admin page='games'/>}/>
						<Route exact path='/admin/users' render={() => <Admin page='users'/>}/>
						<Route exact path='/admin/servers' render={() => <Admin page='servers'/>}/>
						<Route exact path='/admin/channels' render={() => <Admin page='channels'/>}/>
						<Route exact path='/admin/developers' render={() => <Admin page='developers'/>}/>
						<Route exact path='/admin/apps' render={() => <Admin page='apps'/>}/>

						<Route path={'/oauth/twitch'} component={OAuthTwitch}/>

						<Route component={NotFound}/>
					</Switch>
				</main>
			</div>
		);
	}

}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
