const app = new Vue({
  el: '#page',
  data: {
    button: false,
    treeStatus: "on",
    canzoni: [
    {
      nome: 'prova 1',
      canzone: '',
    },
    {
      nome: 'prova 2',
      canzone: '',
    },
    ],
    chose: '',
  },
  methods: {
    start() {
      alert(this.canzoni[this.chose].nome);
    },
    async ligthOn() {
      await this.toggleLight("on");
    },
    async ligthOff() {
      await this.toggleLight("off");
    },
    async toggleLight(status) {
      const resposne = await fetch(status, {
        method: "GET",
      });
    }
  },
});
