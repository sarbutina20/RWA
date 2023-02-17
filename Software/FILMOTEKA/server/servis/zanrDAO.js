const Baza = require("./baza.js");

class ZanrDAO {

constructor() {
	this.baza = new Baza();
}   

dajSve = async function () {
    let sql = "SELECT * FROM zanr;"
    var podaci = await this.baza.izvrsiUpit(sql, []);
    return podaci;
}

dodaj = async function (zanr) {
    console.log(zanr)
    let sql = `INSERT INTO zanr (naziv) VALUES (?)`;
    let podaci = [zanr.naziv];
    await this.baza.izvrsiUpit(sql,podaci);
    return true;
}

obrisiSve = async function () {
    let sql = "DELETE FROM zanr WHERE id NOT IN (SELECT zanr_id FROM zanr_has_film)";
    await this.baza.izvrsiUpit(sql,[]);
    return true;
}



daj = async function (id) {
    
    let sql = "SELECT * FROM zanr WHERE id=?;"
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    
    if(podaci.length == 1)
        return podaci[0];
    else 
        return null;
}

obrisi = async function (id) {
    let sql = "DELETE FROM zanr WHERE id=?";
    await this.baza.izvrsiUpit(sql,[id]);
    return true;
}


azuriraj = async function (id, zanr) {
    let sql = `UPDATE zanr SET naziv=? WHERE id=?`;
    let podaci = [zanr.naziv, id];
    await this.baza.izvrsiUpit(sql,podaci);
    return true;
}




}


module.exports = ZanrDAO;