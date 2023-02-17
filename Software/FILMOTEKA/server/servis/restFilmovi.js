const FilmoviDAO = require("./filmoviDAO.js");

exports.getFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json");

    let parametri = zahtjev.query;
    console.log(parametri);
    let fdao = new FilmoviDAO();

    if(parametri.stranica == null || parametri.brojFilmova==null){
        fdao.dajSve().then((filmovi) => {
            odgovor.send(filmovi);
        });
    }
    else {
        fdao.dajFiltrirano(parametri).then((filmovi) => {
            console.log(filmovi);
            odgovor.send(filmovi);
        });
    }

    
   

    
}

exports.getOdobreni = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmoviDAO();
    let bool = zahtjev.params.bool;
    if(bool == 0 || bool == 1) {
        fdao.dajOdobreno(bool).then((filmovi) => {
            console.log(filmovi);
            odgovor.send(JSON.stringify(filmovi));
        });
    }
}

exports.postFilmovi = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let fdao = new FilmoviDAO();
    fdao.dodaj(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}


exports.getFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmoviDAO();
    let id = zahtjev.params.id;
    fdao.daj(id).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}

exports.postFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = { greska: "metoda nije dopuštena" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FilmoviDAO();
    let id = zahtjev.params.id;
    fdao.obrisi(id).then((film) => {
        console.log(film);
        odgovor.send(JSON.stringify(film));
    });
}

exports.putFilm = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let fdao = new FilmoviDAO();
    fdao.azuriraj(id, podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}