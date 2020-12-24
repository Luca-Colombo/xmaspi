const express = require('express');
const path = require('path');

const Controller = require('./controllerTest');

const app = express();
const port = 3000;

const config = require('./config.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/play', (req, res) => {
  res.json({ status: 'playing' });
  Controller.playSong('./songs/santatown.mp3');
});
app.get('/dump', (req, res) => {
  res.json({ status: 'dumping' });
  Controller.playSong('santatown');
  console.log('dumped');
});
app.get('/stop', (req, res) => {
  res.json({ status: 'stopping' });
  Controller.stop();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const closeGracefully= function() {
//   console.log('Unexporting leds...');
//   leds.forEach((led) => led.unexport());
//   console.log('Exiting...');
//   process.exit();
// }
