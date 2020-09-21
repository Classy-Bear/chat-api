const express = require('express');
const cors = require('cors');

// Create an express app.
const app = express();
// Bring the datbase configuration.
const db = require('./config/databse');
// Port will only run local.
const port = 5000;



// Test the DB
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Body parser Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Homepage route
app.get('/', (req, res) => res.json({authKey: 'incorrect'}));

// API routes
app.use('/users', require('./routes/api/users'));
app.use('/messages', require('./routes/api/messages'));

// Run app
app.listen(5000, () => console.log(`http://localhost:${port}`));