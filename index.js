const express = require('express');
const path = require('path');

const controller = require('./controller');

const app = express();
const port = 3000;

const config = require('./config.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/on', (req, res) => {
  controller.turnOnLights();
  res.json({ status: 'on' });
  // ligthsOnly.forEach((led) => led.writeSync(1));
});
app.get('/off', (req, res) => {
  controller.turnOffLights();
  res.json({ status: 'off' });
  // ligthsOnly.forEach((led) => led.writeSync(0));
});
app.get('/play', (req, res) => {
  res.json({ status: 'playing' });
  controller.playSong('santatown').then();
});
app.get('/stop', (req, res) => {
  res.json({ status: 'stopping' });
  controller.stop();
});
// app.get('/dump', (req, res) => {
//   controller.testFileParsing('santatown');
//   res.json({ status: 'dumping' });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const closeGracefully= function() {
//   console.log('Unexporting leds...');
//   leds.forEach((led) => led.unexport());
//   console.log('Exiting...');
//   process.exit();
// }

process.on('SIGINT', () => {
  console.log('Unexporting leds...');
  controller.clearLeds();
  console.log('Exiting...');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Unexporting leds...');
  controller.clearLeds();
  console.log('Exiting...');
  process.exit();
});
