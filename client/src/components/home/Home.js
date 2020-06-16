import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';
import './home.css'

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

	render() {
		if(this.props.authState.isPending){
			return null
		}
		else {
			if(this.props.authState.isAuthenticated) {
				return <Redirect to={{ pathname: '/dashboard' }} />;
			}
			else {
				return(
					<>
						<div className="logo-wrapper"><img src={process.env.PUBLIC_URL + '/todo.png'} /></div>
						<div className="home-wrapper">
							<h1>Welcome to the To-Do list, login to view or modify your list!</h1>
							<button className="login-button" onClick={this.login}>Login</button>
						</div>
					</>
				);
			}
		}
	}
});