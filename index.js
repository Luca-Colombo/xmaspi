const express = require('express');
const path = require('path');

const controller = require('./controller');

const app = express();
const port = 3000;

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
  const { songId } = req.query;
  controller.playSong(songId).then();
  res.json({ status: 'playing' });
});
app.get('/stop', (req, res) => {
  controller.stop();
  res.json({ status: 'stopped' });
});
app.get('/songs', (req, res) => {
  res.json(controller.getSongList());
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
