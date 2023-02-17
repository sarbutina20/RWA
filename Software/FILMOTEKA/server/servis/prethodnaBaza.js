const konst = require("../konstante.js");
const mysql = require(konst.dirModula + "mysql2");
const ds = require("fs");

class Baza {

    izvrsiUpit(sql, podaciZaSQL){
        return new Promise((uspjeh,neuspjeh) => {
            this.vezaDB.query(sql, podaciZaSQL, (greska, rezultat) => {
                if(greska)
                    neuspjeh(greska);
                else
                    uspjeh(rezultat);
            });
        });
    }

}

module.exports = Baza;