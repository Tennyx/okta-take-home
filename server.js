const express = require('express');
const bodyParser = require('body-parser');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-477362.okta.com/oauth2/default'
});

let taskData = [ 
			{ id: '00ufakijkfkZpYVn84x6', tasks: ['Do dishes', 'Do laundry', 'Pickup groceries']},
			{ id: '00ufcx1vkG8gMH3Z84x6', tasks: ['Take car to mechanic', 'Make lunch for kids', 'Pickup kids from school']} 
		];

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function authorizeUser(req, res, resData) {
	const accessTokenString = req.headers.authorization.split(' ')[1];

	oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
	.then(jwt => {
		res.send(resData);
	})
	.catch(err => {
		console.log(err);
	});
}

app.get('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, taskData);
	// const accessTokenString = req.headers.authorization.split(' ')[1];

	// oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
	// .then(jwt => {
	// 	res.send(taskData);
	// })
	// .catch(err => {
	// 	console.log(err);
	// });
});

app.post('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 201, message: 'POST verified, task created'});
	// const accessTokenString = req.headers.authorization.split(' ')[1];

	// oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
	// .then(jwt => {
	// 	res.send({status : 201, message: 'POST verified, task created'});
	// })
	// .catch(err => {
	// 	console.log('error here', err);
	// });
	// res.send(
	// 	{status : 201, message: 'POST verified, task created'}
	// );
});

app.put('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 200, message: 'PUT verified, task updated'});
	// res.send(
	// 	{status : 200, message: 'PUT verified, task updated'}
	// );
});

app.delete('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 200, message: 'DELETE verified, task deleted'});
	// const accessTokenString = req.headers.authorization.split(' ')[1];

	// oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
	// .then(jwt => {
	// 	res.send({status : 200, message: 'DELETE verified, task deleted'});
	// })
	// .catch(err => {
	// 	console.log(err);
	// });
	// res.send(
	// 	{status : 200, message: 'DELETE verified, task deleted'}
	// );
});

app.listen(port, () => console.log(`Listening on port ${port}`));