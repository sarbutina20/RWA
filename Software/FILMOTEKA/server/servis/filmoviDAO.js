const Baza = require("./baza.js");

class FilmDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function (stranica, brojFilmova) {
		
		let sql = "SELECT * FROM film;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		return podaci;
	}

	dajFiltrirano = async function (parametri) {
		
		let brojFilmova = parametri.brojFilmova;
		let stranica = parametri.stranica;
		let datum = parametri.datum;
		let naziv = parametri.naziv;
		let sortiraj = parametri.sortiraj;
		let zanr = parametri.zanr;
		let sort;
		switch(sortiraj) {
			case 'd': {
				sort = "datum";
				break;
			}
			case 'n': {
				sort = "naziv";
				break;
			}
			case 'z': {
				sort = "zanr_id";
				break;
			}
		}
		console.log(sort);
		
		console.log(parametri);

		//let sql = "SELECT * FROM film WHERE (datum IS NULL OR datum='" + datum + "') AND (naziv IS NULL OR naziv = '"+naziv +"') ORDER BY "+sort+ " ASC LIMIT " +  brojFilmova + " OFFSET " + ((stranica - 1) * brojFilmova)+";";

		let sql = "SELECT * FROM film";
		if(datum!=null) sql+=" WHERE datum = '" + datum + "'";
		if(naziv!=null) sql+=" WHERE naziv = '" + naziv + "'";
		if(zanr!=null) sql+=" JOIN zanr_has_film ON film.id = zanr_has_film.film_id WHERE zanr_has_film.zanr_id = " + zanr;
		if(sortiraj!=null) {
			if(sortiraj == 'z') sql+=" JOIN zanr_has_film ON film.id = zanr_has_film.film_id ORDER BY " + sort + " ASC "; 
			else sql+=" ORDER BY " + sort + " ASC "; 
		}
		
		

		sql += " LIMIT " +  brojFilmova + " OFFSET " + ((stranica - 1) * brojFilmova);
		sql += ";";


		console.log(sql); 
		var podaci = await this.baza.izvrsiUpit(sql, []);
		
		return podaci;
	}

	daj = async function (id) {
		
		let sql = "SELECT * FROM film WHERE id=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [id]);
		
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dajOdobreno = async function (bool) {
		
		let sql = "SELECT * FROM film WHERE odobren=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [bool]);
		
		return podaci;
	}

	obrisi = async function (id) {
		let sql = "DELETE FROM film WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
	}

	dodaj = async function (film) {
		console.log(film)
		let sql = `INSERT INTO film (naziv, datum, opis, korisnik_id, odobren) VALUES (?,?,?,?,?)`;
        let podaci = [film.naziv, film.datum, film.opis, film.korisnik_id, 0];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	azuriraj = async function (id, film) {
		let sql = `UPDATE film SET naziv=?, datum=?, opis=?, odobren=? WHERE id=?`;
        let podaci = [film.naziv, film.datum, film.opis, film.odobren, id];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = FilmDAO;