// eslint-disable-next-line no-undef
const player = require('play-sound')((opts = {}));
// const readline = require('readline');
const lineReader = require('line-reader');

// eslint-disable-next-line import/no-unresolved
const { Gpio } = require('onoff');
const config = require('./config.json');

const songManager = require('./songs/songManager');

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

  playSong(songId) {
    try {
      const songDet = songManager.getSong(songId);
      if (!songDet) {
        throw new Error(`Song not found with id ${songId}`);
      }
      const songFilePath = `songs/music/${songDet.FILE_AUDIO}`;
      const encodingFilePath = `songs/encoding/${songDet.ENCODING_FILE}`;

      this.playing = true;

      const lights = this.getLightsPin();

      // const rl = readline.createInterface({
      //   input: fs.createReadStream(encodingFilePath),
      //   crlfDelay: Infinity,
      // });

      lights[lights.length - 1].writeSync(1);

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
                  if (this.debug) console.log('END reached.');
                  this.turnOffLights();
                  return false;
                }
              }
            }
            currTime = Date.now() - startTime;
          }
        } else {
          if (this.debug) console.log('Stopping reading');
          this.turnOffLights();
          return false;
        }

        if (last) {
          if (this.debug) console.log('File processed.');
          this.turnOffLights();
          return false;
        }
      });
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

  // eslint-disable-next-line class-methods-use-this
  getSongList() {
    return songManager.songs;
  }
}

module.exports = new Controller(true);
