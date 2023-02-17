const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {

		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}

	daj = async function (korime) {
		
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		console.log(korisnik)
		let sql = `INSERT INTO korisnik (korime, lozinka, email, ime, prezime, adresa, tip_korisnika_id, aktiviran, totp)
					VALUES (?,?,?,?,?,?,?,?,?)`;
        let podaci = [korisnik.korime, korisnik.lozinka, korisnik.email, korisnik.ime, korisnik.prezime, korisnik.adresa, 1, korisnik.aktiviran, korisnik.totp];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql,[korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=?,  adresa=? WHERE korime=?`;
        let podaci = [korisnik.ime, korisnik.prezime, korisnik.adresa, korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	aktiviraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET aktivacijski_kod=?, aktiviran=1, tip_korisnika_id=1 WHERE korime=?`;
        let podaci = [korisnik.aktivacijski_kod, korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}


}

module.exports = KorisnikDAO;