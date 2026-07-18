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
		let brojFilmova = Number(parametri.brojFilmova);
		let stranica = Number(parametri.stranica);
		let datum = parametri.datum;
		let naziv = parametri.naziv;
		let sortiraj = parametri.sortiraj;
		let zanr = parametri.zanr;

		if (!Number.isInteger(brojFilmova) || brojFilmova <= 0 ||
			!Number.isInteger(stranica) || stranica <= 0) {
			throw new TypeError("stranica and brojFilmova must be positive integers");
		}

		// Nazivi SQL stupaca ne mogu se zadati parametrima pa su dopušteni samo unaprijed određeni stupci.
		const stupciZaSortiranje = {
			d: "film.datum",
			n: "film.naziv",
			z: "zanr_has_film.zanr_id"
		};
		const sort = stupciZaSortiranje[sortiraj];
		const trebaSpojZanra = zanr != null || sortiraj === "z";
		const uvjeti = [];
		const podaciZaSQL = [];

		let sql = "SELECT film.* FROM film";
		if (trebaSpojZanra) {
			sql += " JOIN zanr_has_film ON film.id = zanr_has_film.film_id";
		}

		if (datum != null) {
			uvjeti.push("film.datum = ?");
			podaciZaSQL.push(datum);
		}
		if (naziv != null) {
			uvjeti.push("film.naziv = ?");
			podaciZaSQL.push(naziv);
		}
		if (zanr != null) {
			uvjeti.push("zanr_has_film.zanr_id = ?");
			podaciZaSQL.push(zanr);
		}
		if (uvjeti.length > 0) {
			sql += " WHERE " + uvjeti.join(" AND ");
		}
		if (sort != null) {
			sql += " ORDER BY " + sort + " ASC";
		}

		sql += " LIMIT ? OFFSET ?;";
		podaciZaSQL.push(brojFilmova, (stranica - 1) * brojFilmova);

		var podaci = await this.baza.izvrsiUpit(sql, podaciZaSQL);
		
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
