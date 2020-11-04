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
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get('/', (req, res) => res.json({ authKey: 'incorrect' }));
  app.use('/users', usersAPI);
  app.use('/messages', messagesAPI);
  const port = process.env.PORT || 5000;
  app.listen(port);
})();
