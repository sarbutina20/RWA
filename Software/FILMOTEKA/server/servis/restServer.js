const konst = require("../konstante.js");
const express = require('express');
const Konfiguracija = require("../konfiguracija.js");
const restKorisnici = require("./restKorisnik.js")
const restFilmovi = require("./restFilmovi.js")
const restZanrovi = require("./restZanr.js")
const autorizacija = require("./autorizacija.js");
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
    server.put("/api/korisnici",autorizacija.zahtijevaAdministratora,restKorisnici.putKorisnici);
    server.delete("/api/korisnici",autorizacija.zahtijevaAdministratora,restKorisnici.deleteKorisnici);

    server.get("/api/korisnici/:korime",restKorisnici.getKorisnik);
    server.post("/api/korisnici/:korime",autorizacija.zahtijevaAdministratora,restKorisnici.postKorisnik);
    server.put("/api/korisnici/:korime",autorizacija.zahtijevaVlastitiRacunIliAdministratora,restKorisnici.putKorisnik);
    
    server.delete("/api/korisnici/:korime",autorizacija.zahtijevaAdministratora,restKorisnici.deleteKorisnik);
    server.post("/api/korisnici/:korime/prijava",restKorisnici.getKorisnikPrijava);

    server.post("/api/korisnici/:korime/aktivacija",autorizacija.zahtijevaAdministratora,restKorisnici.postKorisnikAktivacija);
    server.put("/api/korisnici/:korime/aktivacija",autorizacija.zahtijevaAdministratora,restKorisnici.putKorisnikAktivacija);

    server.get("/api/filmovi/:id",restFilmovi.getFilm);
    server.post("/api/filmovi/:id",autorizacija.zahtijevaPrijavu,restFilmovi.postFilm);
    server.put("/api/filmovi/:id",autorizacija.zahtijevaAdministratora,restFilmovi.putFilm);
    server.delete("/api/filmovi/:id",autorizacija.zahtijevaAdministratora,restFilmovi.deleteFilm);

    server.get("/api/filmovi/",restFilmovi.getFilmovi);
    server.post("/api/filmovi/",autorizacija.zahtijevaPrijavu,restFilmovi.postFilmovi);

    server.get("/api/filmovi/odobreni/:bool",restFilmovi.getOdobreni);
    


    server.get("/api/zanr",restZanrovi.getZanrovi);
    server.post("/api/zanr",autorizacija.zahtijevaAdministratora,restZanrovi.postZanrovi);
    server.delete("/api/zanr",autorizacija.zahtijevaAdministratora,restZanrovi.deleteZanrovi);

    server.get("/api/zanr/:id",restZanrovi.getZanr);
    server.post("/api/zanr/:id",autorizacija.zahtijevaAdministratora,restZanrovi.postZanr);
    server.put("/api/zanr/:id",autorizacija.zahtijevaAdministratora,restZanrovi.putZanr);
    server.delete("/api/zanr/:id",autorizacija.zahtijevaAdministratora,restZanrovi.deleteZanr);

}

function pripremiPutanjeTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
    server.get("/api/tmdb/zanr",restTMDB.getZanr.bind(restTMDB));
    server.get("/api/tmdb/filmovi",restTMDB.getFilmovi.bind(restTMDB));
}

