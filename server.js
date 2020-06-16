const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/tasks', (req, res) => {
  res.send([ 
  	{ id: '00ufakijkfkZpYVn84x6', tasks: ['Do dishes', 'Do laundry', 'Pickup groceries']},
  	{ id: '00ufcx1vkG8gMH3Z84x6', tasks: ['Take car to mechanic', 'Make lunch for kids', 'Pickup kids from school']} 
  ]);
});

app.post('/api/v1/tasks', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));