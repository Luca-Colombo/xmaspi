// eslint-disable-next-line no-undef
const player = require('play-sound')((opts = {}));
const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

const { Gpio } = require('onoff');
const config = require('./config.json');

class Controller {
  constructor(debug = false) {
    this.debug = debug;
    this.playing = false;
    this.leds = config.pins.map((pin) => new Gpio(pin, 'out'));
  }

  getLightsPin() {
    return this.leds.slice(0, 6);
  }

  turnOnLights() {
    this.getLightsPin.forEach((led) => led.writeSync(1));
  }

  turnOffLights() {
    this.getLightsPin.forEach((led) => led.writeSync(0));
  }

  // playSong(songName) {
  //   this.playing = true;
  //   player.play(`${songName}`, (err) => {
  //     if (err) throw err;
  //   });
  //   this.playing = false;
  // }

  async playSong(fileName) {
    try {
      let songFilePath = `songs/${fileName}.wav`;
      if(!fs.existsSync(songFilePath)) {
        songFilePath = `songs/${fileName}.mp3`;
      }
      const filePath = `songEncoding/${fileName}.csv`;

      this.playing = true;

      const lights = this.getLightsPin();

      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });


      player.play(`${songName}`, (err) => {
        if (err) throw err;
      });

      const startTime = Date.now();

      // eslint-disable-next-line no-restricted-syntax
      for await (const line of rl) {
        while (this.playing) {
          if (this.debug) console.log(line);
          const nextStep = line.split(',');
          const currTime = Date.now() - startTime;
          if (parseInt(nextStep[0], 10) <= currTime) {
            for(let i = 0; i < lights.length; i++) {
              if(nextStep[i+1] === "255") { // Channel number 1 is encoded in second position ad so on.
                lights[i].writeSync(1);
              } else {
                lights[i].writeSync(0);
              }

              // if END command is found in the encoding file
              if(nextStep[1] === "END"){
                this.turnOffLights();
              }
            }
          }
        }
      }
      // rl.close();

      console.log('File processed.');
    } catch (err) {
      console.error(err);
    } finally {
      this.playing = false;
    }
  }

  clearLeds() {
    this.turnOffLights();
    this.leds.forEach((led) => led.unexport());
  }
}

module.exports = new Controller(true);
