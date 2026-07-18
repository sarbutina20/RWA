const konst = require("../konstante.js");
const mail = require("./moduli/mail.js")

const portRest = 12242;
class Autentifikacija {

    async dodajKorisnika(korisnik) {
        
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: korisnik.lozinka,
            email: korisnik.email,
            korime: korisnik.korime,
            aktiviran: 1,
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici", parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijski_kod: kod }),
            headers: zaglavlje
        }

        return await fetch("localhost:" + portRest + "/api/korisnici/" + korime + "/aktivacija", parametri)
    }

    async azurirajProfil(korisnik, korime) {
 
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ ime: korisnik.ime, prezime: korisnik.prezime, adresa: korisnik.adresa }),
            headers: zaglavlje
        }
        return await fetch("localhost:" + portRest + "/api/korisnici/" + korime, parametri);
        
    }

    async azurirajZanr(zanr, id) {
        
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ naziv: zanr.naziv }),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + portRest + "/api/zanr/" + id, parametri);
        
    }

    async obrisiZanrove() {
        
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + portRest + "/api/zanr/", parametri);
        
    }

    async prijaviKorisnika(korime, lozinka) {
        
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici/" + korime + "/prijava", parametri);
        
        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

}

module.exports = Autentifikacija;
