console.log("Online");
var app = new Vue({
    el: '#page',
    data: {
        button: false,
        canzoni: [{
            nome: "prova 1",
            canzone: "",
        },
        {
            nome: "prova 2",
            canzone: "",
        },
    ],
    chose: '',
    },
    methods: {
        start(){
            alert(this.canzoni[this.chose].nome)
        },
    }
})