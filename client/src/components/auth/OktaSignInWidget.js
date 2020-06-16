import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import './signInWidgetStyle.css';

export default class OktaSignInWidget extends Component {
	componentDidMount() {
		const el = ReactDOM.findDOMNode(this);
		this.widget = new OktaSignIn({
			baseUrl: this.props.baseUrl,
			authParams: {
				pkce: true
			},
			features: {
				registration: true
			},
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
			colors: {
			  brand: '#000000'
			}
		});
		this.widget.renderEl({el}, this.props.onSuccess, this.props.onError)
	}

	componentWillUnmount() {
		this.widget.remove();
	}

	render() {
		return <div />;
	}
}