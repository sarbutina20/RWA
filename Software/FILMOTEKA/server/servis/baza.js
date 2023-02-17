"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('baza.sqlite');


db.exec("PRAGMA foreign_keys = ON;");
class Baza {
    izvrsiUpit(sql, podaciZaSQL) {
        return new Promise((uspjeh, neuspjeh) => {
            db.all(sql, podaciZaSQL, (greska, rezultat) => {
                if (greska) {
                    neuspjeh(greska);
                }
                else {
                    uspjeh(rezultat);
                }
            });
        });
    }
}
module.exports = Baza;
