const parsedSongs = require('./songs.json');

class SongManager {
  constructor() {
    this.songs = parsedSongs;
  }

  getSong(songId) {
    const found = this.songs.find((s) => s.ID === songId);
    if (found) return { ...found };
    return null;
  }
}

module.exports = new SongManager();
