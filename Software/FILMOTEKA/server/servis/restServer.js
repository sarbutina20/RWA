const konst = require("../konstante.js");
const express = require('express');
const Konfiguracija = require("../konfiguracija.js");
const restKorisnici = require("./restKorisnik.js")
const restFilmovi = require("./restFilmovi.js")
const restZanrovi = require("./restZanr.js")
const RestTMDB = require("./restTMDB");
const cors = require('cors');


let port;
const server = express();

let konf = new Konfiguracija();

async function ucitajPort() {
    const gas = await konf.dohvatiPort();
    port = gas;
}

konf.ucitajKonfiguraciju().then(ucitajPort).then(pokreniServer).catch((greska) => {

    if (process.argv.length == 2)
        console.error("Potrebno je unjeti naziv datoteke!");
    else
        console.error("Naziv datoteke nije dobar: " + greska.path);
    process.exit()

});




function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());
    pripremiPutanjeKorisnik();
    pripremiPutanjeTMDB();

    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        let poruka = { greska: "Stranica nije pronađena!" }
        odgovor.json(poruka);
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function pripremiPutanjeKorisnik(){
    server.get("/api/korisnici",restKorisnici.getKorisnici);
    server.post("/api/korisnici",restKorisnici.postKorisnici);
    server.put("/api/korisnici",restKorisnici.putKorisnici);
    server.delete("/api/korisnici",restKorisnici.deleteKorisnici);

    server.get("/api/korisnici/:korime",restKorisnici.getKorisnik);
    server.post("/api/korisnici/:korime",restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime",restKorisnici.putKorisnik);
    
    server.delete("/api/korisnici/:korime",restKorisnici.deleteKorisnik);
    server.post("/api/korisnici/:korime/prijava",restKorisnici.getKorisnikPrijava);

    server.post("/api/korisnici/:korime/aktivacija",restKorisnici.postKorisnikAktivacija);
    server.put("/api/korisnici/:korime/aktivacija",restKorisnici.putKorisnikAktivacija);

    server.get("/api/filmovi/:id",restFilmovi.getFilm);
    server.post("/api/filmovi/:id",restFilmovi.postFilm);
    server.put("/api/filmovi/:id",restFilmovi.putFilm);
    server.delete("/api/filmovi/:id",restFilmovi.deleteFilm);

    server.get("/api/filmovi/",restFilmovi.getFilmovi);
    server.post("/api/filmovi/",restFilmovi.postFilmovi);

    server.get("/api/filmovi/odobreni/:bool",restFilmovi.getOdobreni);
    


    server.get("/api/zanr",restZanrovi.getZanrovi);
    server.post("/api/zanr",restZanrovi.postZanrovi);
    server.delete("/api/zanr",restZanrovi.deleteZanrovi);

    server.get("/api/zanr/:id",restZanrovi.getZanr);
    server.post("/api/zanr/:id",restZanrovi.postZanr);
    server.put("/api/zanr/:id",restZanrovi.putZanr);
    server.delete("/api/zanr/:id",restZanrovi.deleteZanr);

}

function pripremiPutanjeTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr",restTMDB.getZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi",restTMDB.getFilmovi.bind(restTMDB));
}

