const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js");
const { filmoviPretrazivanje } = require("./fetchUpravitelj.js");
let auth = new Autentifikacija();

exports.pocetna = async function (zahtjev, odgovor) {
    if (zahtjev.session) {
        if (zahtjev.session.uloga == 1) odgovor.send({ uloga: 1 });
        else if (zahtjev.session.uloga == 2) odgovor.send({ uloga: 2 });
    }
    else odgovor.send({ uloga: 0 });
}




exports.registracija = async function (zahtjev, odgovor) {
    if (zahtjev.method == "GET") odgovor.redirect("/");
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            odgovor.send({ uspjeh: 1 });
        } else {
            odgovor.send({ error });
        }
    }
}

exports.profil = async function (zahtjev, odgovor) {
    if (zahtjev.method == "GET") odgovor.redirect("/");
    else {
        let greska = "";
        let korime = zahtjev.session.korime;
        if (zahtjev.session.uloga == 0 || zahtjev.session.uloga == null || zahtjev.session.uloga == undefined) {
            odgovor.status(500).send("Stranica nije dostupna ulozi gost");
        }
        else {
            if (zahtjev.method == "POST") {
                odgovor.json(await auth.azurirajProfil(zahtjev.body, zahtjev.session.korime));
            }
            else {
                odgovor.send({ uspjeh: 1 });
            }

        }
    }

}

exports.azurirajProfil = async function (zahtjev, odgovor) {

  
    let response = await auth.azurirajProfil(zahtjev.body, zahtjev.session.korime);
    odgovor.send(response);

}

exports.odjava = async function (zahtjev, odgovor) {

    zahtjev.session.destroy(err => {
        if (err) {
            odgovor.status(400).send('Odjavljivanje neuspješno');
        } else {
            odgovor.send({uspjeh:1})
        }
    });


};

exports.prijava = async function (zahtjev, odgovor) {
    if (zahtjev.method == "GET") odgovor.redirect("/");
    if (zahtjev.method == "POST") {

        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;

        var korisnik = await auth.prijaviKorisnika(korime, lozinka);

        let k = JSON.parse(korisnik);

        if (korisnik) {

            zahtjev.session.jwt = jwt.kreirajToken(k);
            zahtjev.session.korisnik = k.ime + " " + k.prezime;
            zahtjev.session.korime = k.korime;
            zahtjev.session.uloga = k.tip_korisnika_id;

            odgovor.send({ session: zahtjev.session });
            return;
        }
        else {

            odgovor.send(JSON.stringify({ error: 'Neispravni podaci' }));
        }
    }

}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    if (zahtjev.method == "GET") odgovor.redirect("/");
    else {
        if (zahtjev.session.uloga == 0 || zahtjev.session.uloga == null || zahtjev.session.uloga == undefined) {
            odgovor.status(500).send("Stranica nije dostupna ulozi gost");
        }
        else {
            odgovor.send({ uspjeh: 1 });
        }
    }

}

exports.sesija = async function (zahtjev, odgovor) {

    let ime = zahtjev.params.imestr;
    if (ime == "zanrovi") {
        if (zahtjev.session.uloga == 2) odgovor.send({ uspjeh: 1 });
        else odgovor.status(500).send("Stranica nije dostupna ulozi gost");
    }
    else if (ime == "profil") {
        if (zahtjev.session.uloga == 2 || zahtjev.session.uloga == 1) odgovor.send({ uspjeh: 1 });
        else odgovor.status(500).send("Stranica nije dostupna ulozi gost");
    }
    else if (ime == "filmovipretrazivanje") {
        if (zahtjev.session.uloga == 2 || zahtjev.session.uloga == 1) odgovor.send({ uspjeh: 1 });
        else odgovor.status(500).send("Stranica nije dostupna ulozi gost");

    }
    else {
        odgovor.send({ uspjeh: 1 });
    }

}




exports.zanrovi = async function (zahtjev, odgovor) {
    if (zahtjev.method == "GET") odgovor.redirect("/");
    else {
        if (zahtjev.session.uloga != 2) {
            odgovor.status(500).send("Stranica je dostupna samo ulozi administrator");
        }
        else {
            if (zahtjev.method == "POST") {
                odgovor.json(await auth.azurirajZanr(zahtjev.body, zahtjev.params.id));
            }
            else {
                odgovor.send({ uspjeh: 1 });
              

            }
        }
    }
}



