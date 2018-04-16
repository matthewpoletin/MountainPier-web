import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
	render() {
		this.username = "Matthewpoletin";
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
								<li className={"pure-menu-item"}>
									<Link to={`/user/${this.username}`} className={"pure-menu-link"}>
										<img src={"/"} width={100} height={100} alt={""}/>
									</Link>
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
