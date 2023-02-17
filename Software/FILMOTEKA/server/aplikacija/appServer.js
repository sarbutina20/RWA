const konst= require("../konstante.js");
const express = require('express');

const kolacici = require('cookie-parser');
const Konfiguracija = require("../konfiguracija.js");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const cors = require('cors');
const session = require("express-session");

const server = express();

let port;

server.use("/",express.static(__dirname+'/angular'));

function pokreniServer() {
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cors());
    server.use(kolacici())
    server.use(session({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));

    pripremiPutanjePocetna();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();
    pripremiPutanjeDokumentacija();
    pripremiPutanjeZanrovi();
    pripremiPutanjeProfil();

    server.use('/dokumentacija', express.static("../dokumentacija"));
    server.use('/slike', express.static('../slike'));
    server.use("/js", express.static(__dirname + "/js"));
    server.use("/css", express.static(__dirname + "/css"));


    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

let konf = new Konfiguracija();

async function ucitajPort() {
    const gas = await konf.dohvatiAppPort();
    port = gas;
}

konf.ucitajKonfiguraciju().then(ucitajPort).then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function pripremiPutanjePocetna() {
    server.get("/uloga", htmlUpravitelj.pocetna);
    

    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}

function pripremiPutanjePretrazivanjeFilmova() {

    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeDokumentacija() {

}

function pripremiPutanjeProfil() {



    server.put('/azurirajProfil', htmlUpravitelj.azurirajProfil);
}

function pripremiPutanjeZanrovi() {
    server.post('/azurirajZanr/:id', htmlUpravitelj.zanrovi);

    server.get('/BazaZanrovi', fetchUpravitelj.BazaZanrovi);
    server.post('/obrisiZanrove', fetchUpravitelj.obrisiZanrove);
    server.get('/obrisiZanrove', fetchUpravitelj.obrisiZanrove);
}   

function pripremiPutanjeAutentifikacija() {
    server.get("/sesija/:imestr", htmlUpravitelj.sesija);

    server.get("/korisnickiPodaci", fetchUpravitelj.korPodaci);

    server.post("/registracija", htmlUpravitelj.registracija);

    server.get("/odjava", htmlUpravitelj.odjava);
    server.post("/odjava", htmlUpravitelj.odjava);


    server.post("/prijava", htmlUpravitelj.prijava);

    server.get("/getJWT", fetchUpravitelj.getJWT);
}
