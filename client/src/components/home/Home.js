import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {
	constructor(props) {
		super(props)
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	async login() {
		this.props.authService.login('/');
	}

	async logout () {
		this.props.authService.logout('/');
	}

	componentDidMount() {

	}

	render() {
		if(this.props.authState.isPending){
			return null
		}
		else {
			if(this.props.authState.isAuthenticated) {
				return <Redirect to={{ pathname: '/dashboard' }} />;
				{/*
				const token = this.props.authState.idToken;
				const parsedToken = JSON.parse(atob(token.split('.')[1]));
				const firstName = parsedToken.name.split(' ')[0];
				const greeting = 'Welcome to the App, ' + firstName;
				const button = <button onClick={this.logout}>Logout</button>;
				return(
					<div>
						{greeting}!
						{button}
					</div>
				);
				*/}
			}
			else {
				const greeting = 'Welcome to the App, login or sign up to get going!';
				const button = <button onClick={this.login}>Login</button>;
				return(
					<div>
						{/*<Link to='/'>Home</Link><br/>
						<Link to='/protected'>Protected</Link><br/>*/}
						{greeting}!
						{button}
					</div>
				);
			}
		}
	}
});