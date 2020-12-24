const app = new Vue({
  el: '#page',
  data: {
    button: false,
    treeStatus: 'on',
    songs: [],
    selectedSong: null,
    chose: '',
  },
  methods: {
    start() {
      alert(this.canzoni[this.chose].nome);
    },
    async ligthOn() {
      await this.toggleLight('on');
    },
    async ligthOff() {
      await this.toggleLight('off');
    },
    async toggleLight(status) {
      const resposne = await fetch(status, {
        method: 'GET',
      });
    },
    fetchSongs() {
      fetch('songs', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((json) => { this.songs = json; })
        .catch((e) => console.error(e));
    },
    async playSong() {
      try {
        const response = await fetch(`play?songId=${this.selectedSong.ID}`, {
          method: 'GET',
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchSongs();
  },
});
