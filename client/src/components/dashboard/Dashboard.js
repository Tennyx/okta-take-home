import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import './dashboard.css'
import axios from 'axios';

export default withOktaAuth(class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			userId: '',
			userFirstName: '',
			accessToken: '',
			idToken: '',
			responseCode : null,
			responseMessage : ''
		}

		this.logout = this.logout.bind(this);
		this.getData = this.getData.bind(this);
		this.addTask = this.addTask.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		
		this.url = '/api/v1/tasks'
	}

	async logout () {
		this.props.authService.logout('/');
	}

	getData() {
		const accessToken = this.props.authState.accessToken
		const idToken = this.props.authState.idToken;
		const parsedToken = JSON.parse(atob(idToken.split('.')[1]));
		console.log(parsedToken);
		const userFirstName = parsedToken.name.split(' ')[0];
		const userId = parsedToken.sub;

		const config = {
			headers: { 'Authorization' : `Bearer ${accessToken}`}
		};
		
		axios.
		get(this.url, config)
		.then((res) => {
			console.log(res);
			console.log(userId);
			const userData = res.data.find(element => element.id == userId);
			this.setState({
				tasks : userData.tasks,
				userId : userId,
				userFirstName : userFirstName,
				accessToken : accessToken,
				idToken : idToken,
				responseCode : res.status,
				responseMessage : res.statusText
			});
		})
		.catch((error) => {
			console.log(error);
		});	
	}

	addTask() {
		console.log(this.state.accessToken);
		const config = {
			headers: { 'Authorization' : `Bearer ${this.state.accessToken}`}
		};
		
		axios.
		post(this.url, {'dummyData' : 'dummyData'}, config)
		.then((res) => {
			console.log(res);
			this.setState({
				responseCode : res.data.status,
				responseMessage : res.data.message
			});
		})
		.catch((error) => {
			console.log(error);
		});	
	}

	updateTask() {
		const config = {
			headers: { 'Authorization' : `Bearer ${this.state.accessToken}`}
		};
		
		axios.
		put(this.url, {'dummyData' : 'dummyData'}, config)
		.then((res) => {
			console.log(res);
			this.setState({
				responseCode : res.data.status,
				responseMessage : res.data.message
			});
		})
		.catch((error) => {
			console.log(error);
		});	
	}


	deleteTask() {
		console.log(this.state.accessToken);
		const config = {
			headers: { 'Authorization' : `Bearer ${this.state.accessToken}`}
		};
		
		axios.
		delete(this.url, config)
		.then((res) => {
			console.log(res);
			this.setState({
				responseCode : res.data.status,
				responseMessage : res.data.message
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
		return(
			<>
				<div className="logo-wrapper"><img src={process.env.PUBLIC_URL + '/todo.png'} /></div>
				<div className="dashboard-wrapper">
					<h1>{'Welcome to your To-Do List, ' + this.state.userFirstName}!</h1>
					<h3>To Dos:</h3>
					<div className="to-do-wrapper">
					{
						(this.state.tasks).map((task) =>
							<>
								<div className="to-do-item">
									{task}
									<button className="update-button" onClick={this.updateTask}>UPDATE</button>
									<button className="delete-button" onClick={this.deleteTask}>DELETE</button>
								</div>
								
							</>
						)
					}
					</div>
					<div className="btn-wrapper">
						<div><button className="add-button" onClick={this.addTask}>ADD TASK</button></div><br/>
						<a href="#" className="logout" onClick={this.logout}>LOGOUT</a>
					</div>
					<hr />
					<h1>Response from Server:</h1>
					<div className="response-wrapper">
						<div className="response-code">{this.state.responseCode}</div>
						<div className="response-message">{this.state.responseMessage}</div>
					</div>
				</div>
			</>
		);
	}
});