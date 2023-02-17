const konst = require("../konstante.js");
const portRest = 12242;
const url = "http://localhost:" + portRest + "/api"
const kodovi = require("./moduli/kodovi.js")
class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi);
        return filmovi;
    }

    async dohvatiSveZanrove() {
        let odgovor = await fetch(url + "/zanr");
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async BazaZanrovi() {
        let odgovor = await fetch(url + "/zanr");
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci);
        console.log(zanrovi);
        return zanrovi;
    }

    async korisnickiPodaci(korime) {
        let odgovor = await fetch(url + "/korisnici/" + korime);
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci);
        return korisnik;
    }
    

    async dohvatiNasumceFilm(zanr) {
        let odgovor = await fetch(url + "/filmovi?stranica=1&brojFilmova=2&zanr="+zanr);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let rez = [filmovi[0], filmovi[1]];
        return rez;
    }

}



module.exports = FilmoviZanroviPretrazivanje;