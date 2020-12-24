const songs = require('./songs.json');

class SongManager {
  constructor() {
    this.songs = songs;
  }

  get songs() {
    return this.songs;
  }

  getSong(songId) {
    const found = this.songs.find((s) => s.ID === songId);
    if (found) return { ...found };
    return null;
  }
}

module.exports = new SongManager();
