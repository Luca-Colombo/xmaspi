const express = require('express');
const path = require('path');

const Controller = require("./controller");


const app = express();
const port = 3000;

const { Gpio } = require('onoff');

const config = require('./config.json');

const leds = config.pins.map((pin) => new Gpio(pin, 'out'));
const ligthsOnly = leds.slice(0,6);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/on', (req, res) => {
  res.json({status: "on"})
  ligthsOnly.forEach((led) => led.writeSync(1));
});
app.get('/off', (req, res) => {
  res.json({status: "off"})
  ligthsOnly.forEach((led) => led.writeSync(0));
});
app.get("/play", (req, res) => {
  res.json({status: "playing"})
  Controller.playSong("./songs/santatown.mp3")
})

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
  leds.forEach((led) => led.unexport());
  console.log('Exiting...');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Unexporting leds...');
  leds.forEach((led) => led.unexport());
  console.log('Exiting...');
  process.exit();
});
