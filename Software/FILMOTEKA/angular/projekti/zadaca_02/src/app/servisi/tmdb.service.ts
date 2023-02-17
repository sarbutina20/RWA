import { Injectable } from '@angular/core';
import { environment } from 'projekti/zadaca_02/enviroments/environment.prod';
import { FilmoviI } from './FilmoviI';
import { FilmoviTmdbI, FilmTmdbI } from './FilmoviTmdbI';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  filmoviTMDB?: FilmoviTmdbI;
  restServis = environment.restServis;
  filmovi = new Array<FilmoviI>();
  constructor() {
    let filmovi = localStorage.getItem("filmoviTMDB");
    if (filmovi == null) {
      this.osvjeziFilmove(1, "");
    } else {
      this.filmoviTMDB = JSON.parse(filmovi);
    }
  }

  async osvjeziFilmove(stranica: number, kljucnaRijec: string): Promise<FilmoviI[]> {
    let parametri = "?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec;
    let o = (await fetch(this.restServis + "tmdb/filmovi" + parametri)) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text()) as FilmoviTmdbI;
      console.log(r);
      this.filmoviTMDB = r;
      localStorage.setItem("filmoviTMDB", JSON.stringify(r));
      //return this.dajFilmove();
      this.filmovi = [];
      for (let filmTMDB of this.filmoviTMDB.results) {
        let film: FilmoviI = {
          id: filmTMDB.id,
          naziv: filmTMDB.original_title,
           opis: filmTMDB.overview,
          zanr_id: 0,
          datum: filmTMDB.release_date,
          odobren: 0
        };
        this.filmovi.push(film);
      }
      console.log(this.filmovi);
      return this.filmovi;
      
    }
    return [];
  }
  

  dajFilmove(): Array<FilmoviI> {
    if (this.filmovi.length == 0) {
      if (this.filmoviTMDB == undefined) {
        return new Array<FilmoviI>();
      } else if (this.filmoviTMDB.results.length == 0) {
        return new Array<FilmoviI>();
      } else {
        
        for (let filmTMDB of this.filmoviTMDB.results) {
          let film: FilmoviI = {
            id: filmTMDB.id,
            naziv: filmTMDB.original_title,
           opis: filmTMDB.overview,
            zanr_id: 0,
            datum: filmTMDB.release_date,
            odobren: 0
          };
          this.filmovi.push(film);
        }
        return this.filmovi;
      }
    } else {
      return this.filmovi;
    }
  }
  

  dajFilm(naziv: string): FilmTmdbI | null {
    if (this.filmoviTMDB == undefined)
      return null;
    if (this.filmoviTMDB.results.length == 0)
      return null;
    for (let film of this.filmoviTMDB.results) {
      if (film.original_title == naziv) {
        return film;
      }
    }
    return null;
  }
}

