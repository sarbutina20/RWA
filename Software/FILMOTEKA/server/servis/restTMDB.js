const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {

    constructor(api_kljuc) {
        this.tmdbKlijent = new TMDBklijent(api_kljuc);
        console.log(api_kljuc);
    }

    getZanr(zahtjev, odgovor) {
        //console.log(this);
        this.tmdbKlijent.dohvatiZanrove().then((zanrovi) => {
            console.log(zanrovi);
            odgovor.type("application/json");
            odgovor.send(zanrovi);
            //JSON.stringify
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }

    getFilmovi(zahtjev, odgovor) {
        console.log(this);
        odgovor.type("application/json")
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;
        
        if(stranica == null || rijeci==null){
            odgovor.status("417");
            odgovor.send({greska: "neocekivani podaci"});
            return;
        }

        this.tmdbKlijent.pretraziFilmove(rijeci,stranica).then((filmovi) => {
            //console.log(filmovi);
            odgovor.send(filmovi);
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }
}

module.exports = RestTMDB;