"use strict";

import React, { Component } from 'react';
import 'purecss';
import Header from "./header/header";
import Main from "./main";

/** Class for app react component. */
class App extends Component {

	render() {
		return (
			<div className="App">
				<Header/>
				<Main/>
			</div>
		);
	}

}

export default App;
