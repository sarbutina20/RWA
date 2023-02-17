import { Injectable } from '@angular/core';
import { environment } from 'projekti/zadaca_02/enviroments/environment.prod';
import { FilmoviI } from './FilmoviI';
import { FilmoviTmdbI } from './FilmoviTmdbI';

@Injectable({
  providedIn: 'root'
})
export class FilmoviService {

  restServis = environment.restServis;
  filmoviTMDB?: FilmoviI;
  filmovi = new Array<FilmoviI>();

  constructor() { 
    let filmovi = localStorage.getItem("filmovi");
    if (filmovi == null) {
      //this.osvjeziFilmove();
    } else {
      this.filmoviTMDB = JSON.parse(filmovi);
    }
  }

  async dajFilmove(id:Number): Promise<FilmoviI[]> {
    const filmoviData = this.getFilmovi(id);
  
    this.filmovi = new Array<FilmoviI>();
    for (let film of await filmoviData) {
      
      let filmI: FilmoviI = {
        id: film.id,
        naziv: film.naziv,
        opis: film.opis,
        zanr_id: film.zanr_id,
        datum: film.datum,
        odobren: film.odobren      
      };
      
  
      this.filmovi.push(filmI);
    }
    localStorage.setItem("filmovi", JSON.stringify(this.filmovi));
    return this.filmovi;
  }
  
  async getFilmovi(id:Number): Promise<Array<any>> {
    try {
      const response = await fetch(`${this.restServis}filmovi?stranica=1&brojFilmova=2&zanr=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getSviFilmovi(): Promise<Array<any>> {
    try {
      const response = await fetch(`${this.restServis}filmovi`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getFilm(id:number): Promise<Array<any>> {
    try {
      const response = await fetch(`${this.restServis}filmovi/${id}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

}
