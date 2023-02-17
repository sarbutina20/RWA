const konst = require("../konstante.js");
const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js");

const portRest = 12242;
class Autentifikacija {

    async dodajKorisnika(korisnik) {
        
        //let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        //let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);

        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
            email: korisnik.email,
            korime: korisnik.korime,
            aktiviran: 1,
            //totp: tajniTOTPkljuc
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
        
        console.log(kodovi.kreirajSHA256("rwa", "moja sol"));
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
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