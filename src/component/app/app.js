import React, { Component } from 'react';
import 'purecss'

import Header from "./header/header";
import Main from "./main";

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
