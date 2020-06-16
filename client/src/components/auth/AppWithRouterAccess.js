import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from '../home/Home';
import Dashboard from '../dashboard/Dashboard';
import Login from './Login';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
	constructor(props) {
		super(props);
		this.onAuthRequired = this.onAuthRequired.bind(this);
	}

	onAuthRequired() {
		this.props.history.push('/login');
	}

	render() {
		return (
			<Security issuer='https://dev-477362.okta.com/oauth2/default'
			clientId='0oafalkvxdifq1B684x6'
			redirectUri={window.location.origin + '/implicit/callback'}
			onAuthRequired={this.onAuthRequired}
			pkce={true}>
				<Route path='/' exact={true} component={Home} />
				<SecureRoute path='/dashboard' exact={true} component={Dashboard} />
				<SecureRoute path='/protected' component={Protected} />
				<Route path='/login' render={() => <Login baseUrl='https://dev-477362.okta.com' />} />
				<Route path='/implicit/callback' component={LoginCallback} />
			</Security>
		);
	}
});