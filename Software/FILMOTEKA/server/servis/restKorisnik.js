const KorisnikDAO = require("./korisnikDAO.js");
const kodovi = require("../aplikacija/moduli/kodovi.js");

exports.getKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    kdao.dajSve().then((korisnici) => {
        console.log(korisnici);
        odgovor.send(JSON.stringify(korisnici));
    });
}

exports.postKorisnici = async function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = {
        ...zahtjev.body,
        lozinka: await kodovi.hashirajLozinku(zahtjev.body.lozinka)
    };
    let kdao = new KorisnikDAO();
    let poruka = await kdao.dodaj(podaci);
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    kdao.daj(korime).then((korisnik) => {
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    });
}

exports.getKorisnikPrijava = async function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    let korisnik = await kdao.daj(korime);
    let lozinkaJeIspravna = korisnik != null &&
        await kodovi.provjeriLozinku(zahtjev.body.lozinka, korisnik.lozinka);

    if (!lozinkaJeIspravna) {
        odgovor.status(401);
        return odgovor.send(JSON.stringify({greska: "Krivi podaci!"}));
    }

    const { lozinka, ...sigurniKorisnik } = korisnik;
    odgovor.send(JSON.stringify(sigurniKorisnik));
}
exports.postKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnik = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnik = function (zahtjev, odgovor) {
    console.log(zahtjev.body);
    odgovor.type("application/json")
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.azuriraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}



exports.postKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisnikAktivacija = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.aktiviraj(korime, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}
