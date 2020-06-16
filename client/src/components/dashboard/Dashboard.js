import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import axios from 'axios';

export default withOktaAuth(class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			userId: '',
			userFirstName: ''
		}

		this.logout = this.logout.bind(this);
		this.getData = this.getData.bind(this);
	}

	async logout () {
		this.props.authService.logout('/');
	}

	getData() {
		const accessToken = this.props.authState.accessToken
		const idToken = this.props.authState.idToken;
		const parsedToken = JSON.parse(atob(idToken.split('.')[1]));
		const userFirstName = parsedToken.name.split(' ')[0];
		const userId = parsedToken.sub;

		const url = '/api/v1/tasks';
		const config = {
			headers: { 'Authorization' : `Bearer ${accessToken}`}
		};
		
		axios.
		get(url, config)
		.then((res) => {
			const userData = res.data.find(element => element.id == userId);
			this.setState({
				tasks : userData.tasks,
				userId : userId,
				userFirstName : userFirstName
			});
		})
		.catch((error) => {
			console.log(error);
		});	
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const greeting = 'Welcome to the App, ' + this.state.userFirstName;
		return(
			<div>
				{greeting}!
				<button onClick={this.logout}>Logout</button>
				{
					(this.state.tasks).map((task) =>
						<div>{task}</div>
					)
				}
			</div>
		);
	}
});