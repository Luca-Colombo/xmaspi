const express = require('express');

const app = express();
const port = 3000;

const { Gpio } = require('onoff');

const config = require('./config.json');

const leds = config.pins.map((pin) => new Gpio(pin, 'out'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/on', (req, res) => {
  res.send('ON!');
  leds.forEach((led) => led.writeSync(1));
});
app.get('/off', (req, res) => {
  res.send('OFF!');
  leds.forEach((led) => led.writeSync(0));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Unexporting leds...');
  leds.forEach((led) => led.unexport());
  console.log('Exiting...');
  process.exit();
});
