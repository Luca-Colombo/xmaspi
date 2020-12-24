const parsedSongs = require('./songs.json');

class SongManager {
  constructor(songs) {
    this.songs = songs;
  }

  get songs() {
    return this.songs;
  }

  set songs(newSongs) {
    this.songs = newSongs;
  }

  getSong(songId) {
    const found = this.songs.find((s) => s.ID === songId);
    if (found) return { ...found };
    return null;
  }
}

module.exports = new SongManager(parsedSongs);
