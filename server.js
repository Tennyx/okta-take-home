const express = require('express');
const bodyParser = require('body-parser');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-477362.okta.com/oauth2/default'
});

let taskData = [ 
			{ id: '00ufakijkfkZpYVn84x6', tasks: ['Do dishes', 'Do laundry', 'Pickup groceries']},
			{ id: '00ufcx1vkG8gMH3Z84x6', tasks: ['Take car to mechanic', 'Make lunch for kids', 'Pickup kids from school']},
			{ id: '00ufdceycg6PvBhCO4x6', tasks: ['Take car to mechanic', 'Make lunch for kids', 'Pickup kids from school']},
			{ id: '00ufmznxng8j8eAYX4x6', tasks: ['Take car to mechanic', 'Make lunch for kids', 'Pickup kids from school']}  
		];

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function authorizeUser(req, res, resData, requiresAdmin) {
	const accessTokenString = req.headers.authorization.split(' ')[1];

	oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
	.then(jwt => {
		if(requiresAdmin){
			console.log(jwt);
			jwt.claims.is_admin ? 
			res.send(resData) :
			res.send({status : 401, message: 'Unauthorized'})
		}
		else {
			res.send(resData);
		}
		
	})
	.catch(err => {
		console.log(err);
	});
}

app.get('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, taskData, false);
});

app.post('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 201, message: 'POST verified, task created'}, true);
});

app.put('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 200, message: 'PUT verified, task updated'}, true);
});

app.delete('/api/v1/tasks', (req, res) => {
	authorizeUser(req, res, {status : 200, message: 'DELETE verified, task deleted'}, true);
});

app.listen(port, () => console.log(`Listening on port ${port}`));