const express = require('express');
const cors = require('cors');
const db = require('./modules/config/databse');
const usersAPI = require('./modules/routes/api/users');
const messagesAPI = require('./modules/routes/api/messages');

(async () => {
  try {
    await db.authenticate();
  } catch {
    return;
  }
  const port = process.env.PORT || 5000;
  express()
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .get('/', (req, res) => res.json({ authKey: 'incorrect' }))
    .use('/users', usersAPI)
    .use('/messages', messagesAPI)
    .listen(port);
})();
