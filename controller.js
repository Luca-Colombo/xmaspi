// eslint-disable-next-line no-undef
const player = require('play-sound')((opts = {}));
const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

class Controller {
  constructor(debug = false) {
    this.debug = debug;
    this.playing = false;
  }

  playSong(songName) {
    this.playing = true;
    player.play(`${songName}`, (err) => {
      if (err) throw err;
    });
    this.playing = false;
  }

  async testFileParsing(fileName) {
    // this.playing = true;
    // const filePath = `songEncoding/${fileName}.csv`;

    // const rl = readline.createInterface({
    //   input: fs.createReadStream(filePath),
    //   crlfDelay: Infinity,
    // });

    // rl.on('line', (line) => {
    //   console.log(`Line from file: ${line}`);
    // });
    // this.playing = false;

    try {
      const filePath = `songEncoding/${fileName}.csv`;

      this.playing = true;

      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
      });

      const startTime = Date.now();

      // eslint-disable-next-line no-restricted-syntax
      for await (const line of rl) {
        while (this.playing) {
          if (this.debug) console.log(line);
          const nextStep = line.split(',');
          const currTime = Date.now() - startTime;
          if (parseInt(nextStep[0], 10) <= currTime) {

          }
        }
      }

      // rl.on('line', (line) => {
      //   // console.log(`Line from file: ${line}`);

      // });

      await once(rl, 'close');

      console.log('File processed.');
    } catch (err) {
      console.error(err);
    } finally {
      this.playing = false;
    }
  }
}

module.exports = new Controller();
