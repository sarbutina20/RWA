const ZanrDAO = require("./zanrDAO.js");

exports.getZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    zdao.dajSve().then((zanrovi) => {
        console.log(zanrovi);
        odgovor.send(JSON.stringify(zanrovi));
    });
}

exports.postZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    zdao.obrisiSve().then((zanrovi) => {
        console.log(zanrovi);
        odgovor.send(JSON.stringify(zanrovi));
    });
}

exports.putZanrovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { greska: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.getZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let id = zahtjev.params.id;
    zdao.daj(id).then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}

exports.postZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let zdao = new ZanrDAO();
    let id = zahtjev.params.id;
    zdao.obrisi(id).then((zanr) => {
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    });
}

exports.putZanr = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let zdao = new ZanrDAO();
    zdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}