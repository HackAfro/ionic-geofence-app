require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/ping', (req, res) => {
  const { lat, lng } = req.body;
  const data = {
    lat,
    lng,
  };

  pusher.trigger('location', 'ping', data);
  res.json(data);
});

app.post('/notify', (req, res) => {
  const { lat, lng } = req.body;
  const data = {
    lat,
    lng,
  };

  pusher.trigger('geofence', 'exit', data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
