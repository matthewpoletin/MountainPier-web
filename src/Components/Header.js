import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
	render() {
		const list = [
			{
				title: 'Game',
				link: '/about'
			},
			{
				title: 'Sign in',
				link: '/login',
			},
			{
				title: 'Sign up',
				link: '/join'
			},
		];
		return (
			<div className="Header">
				<header>
					<div className={"pure-menu pure-menu-horizontal"}>
						<nav>
							<Link to={"/"} className={"pure-menu-heading pure-menu-link"}>
								<img src={"/"} height={100} width={100} alt={""}/>
							</Link>
							<ul className={"pure-menu-list"}>
								<li className={"pure-menu-item"}>
									<Link to={'/about'} className={"pure-menu-link"}>About</Link>
								</li>
								<li className={"pure-menu-item"}>
									<Link to={'/signup'} className={"pure-menu-link"}>Signup</Link>
								</li>
								<li className={"pure-menu-item"}>
									<Link to={'/login'} className={"pure-menu-link"}>Login</Link>
								</li>
							</ul>
						</nav>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
