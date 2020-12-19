const player = require('play-sound')(opts={});

class Controller {
    constructor() {

    }

    playSong(songName){
        player.play(`${songName}`, (err) => {if(err) throw err});
    }
}

module.exports = new Controller();
