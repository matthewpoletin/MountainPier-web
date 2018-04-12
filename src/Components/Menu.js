import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	title: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

const defaultProps = {
	title: 'MountainPier'
};

class MyComponent extends Component {
	render() {
		const list = [
			'Sign in',
			'Sign up',
			'Game'
		];
		const {title, username} = this.props;
		return (
			<div className="MyComponent">
				<h1>{title}</h1>
				<h3>{username}</h3>
			</div>
		);
	}
}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;
