// eslint-disable-next-line no-undef
const player = require('play-sound')((opts = {}));
const { once } = require('events');
const fs = require('fs');
// const readline = require('readline');
const lineReader = require('line-reader');

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
    this.getLightsPin().forEach((led) => led.writeSync(1));
  }

  turnOffLights() {
    this.getLightsPin().forEach((led) => led.writeSync(0));
  }

  // playSong(songName) {
  //   this.playing = true;
  //   player.play(`${songName}`, (err) => {
  //     if (err) throw err;
  //   });
  //   this.playing = false;
  // }

  playSong(fileName) {
    try {
      let songFilePath = `songs/${fileName}.wav`;
      if (!fs.existsSync(songFilePath)) {
        songFilePath = `songs/${fileName}.mp3`;
      }
      const encodingFilePath = `songEncoding/${fileName}.csv`;

      this.playing = true;

      const lights = this.getLightsPin();

      // const rl = readline.createInterface({
      //   input: fs.createReadStream(encodingFilePath),
      //   crlfDelay: Infinity,
      // });

      this.songProcess = player.play(`${songFilePath}`, (err) => {
        if (err) throw err;
      });

      const startTime = Date.now();
      lineReader.eachLine(encodingFilePath, (line, last) => {
        console.log(last);
        if (this.playing) {
          if (this.debug) console.log(line);
          const nextStep = line.split(',');
          let currTime = Date.now() - startTime;
          const nextStepTiming = parseInt(nextStep[0], 10);
          while (currTime <= nextStepTiming) {
            if (nextStepTiming <= currTime) {
              for (let i = 0; i < lights.length; i += 1) {
                if (nextStep[i + 1] === '255') { // Channel number 1 is encoded in second position ad so on.
                  lights[i].writeSync(1);
                } else {
                  lights[i].writeSync(0);
                }

                // if END command is found in the encoding file
                if (nextStep[1] === 'END') {
                  this.turnOffLights();
                  return false;
                }
              }
            }
            currTime = Date.now() - startTime;
          }
        } else {
          console.log('Stopping reading');
          return false;
        }

        if (last) {
          this.turnOffLights();
          return false;
        }
      });

      // eslint-disable-next-line no-restricted-syntax
      // for await (const line of rl) {
      //   if (this.playing) {
      //     if (this.debug) console.log(line);
      //     const nextStep = line.split(',');
      //     let currTime = Date.now() - startTime;
      //     const nextStepTiming = parseInt(nextStep[0], 10);
      //     while(currTime <= nextStepTiming) {
      //       if (nextStepTiming <= currTime) {
      //         for(let i = 0; i < lights.length; i++) {
      //           if(nextStep[i+1] === "255") { // Channel number 1 is encoded in second position ad so on.
      //             lights[i].writeSync(1);
      //           } else {
      //             lights[i].writeSync(0);
      //           }

      //           // if END command is found in the encoding file
      //           if(nextStep[1] === "END"){
      //             this.turnOffLights();
      //           }
      //         }
      //       }
      //       currTime = Date.now() - startTime;
      //     }
      //   }
      // }
      // rl.close();

      console.log('File processed.');
    } catch (err) {
      console.error(err);
    } finally {
      // this.stop();
    }
  }

  stop() {
    this.playing = false;
    if (this.songProcess.exitCode === null) {
      this.songProcess.kill();
    }
  }

  clearLeds() {
    this.turnOffLights();
    this.leds.forEach((led) => led.unexport());
  }
}

module.exports = new Controller(true);
