const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors());

app.use(express.json());

let timerData = { time: 0, isRunning: false };

app.get('/api/timer', (req, res) => {
  res.json(timerData);
});

app.post('/api/start-stop', (req, res) => {
  timerData.isRunning = !timerData.isRunning;
  res.json(timerData);
});

app.post('/api/reset', (req, res) => {
  timerData.time = 0;
  timerData.isRunning = false;
  res.json(timerData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});