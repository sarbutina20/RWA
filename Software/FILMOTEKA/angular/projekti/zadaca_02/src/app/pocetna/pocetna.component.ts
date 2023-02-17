import { Component } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviI } from '../servisi/FilmoviI';
import { ZanrovI } from '../servisi/ZanrovI';
import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-pocetna',
  templateUrl:'pocetna.component.html',
  styleUrls: ['pocetna.component.scss'
  ]
})
export class PocetnaComponent {
  zanrovi: ZanrovI[];
  filmovi: FilmoviI[];
  sviZanrovi: ZanrovI[];
  sviFilmovi: FilmoviI[];
  sviFilmoviPoZanrovima: FilmoviI[][];
  
  constructor(private filmoviServis: FilmoviService, private zanroviServis : ZanroviService) {
    this.zanrovi = [];
    this.filmovi = [];
    this.sviZanrovi = [];
    this.sviFilmovi = [];
    this.sviFilmoviPoZanrovima = [];
  }

  ngOnInit():void {
    this.provjeriPodatke();
    if (this.sviFilmoviPoZanrovima.length == 0) {
      setTimeout(this.provjeriPodatke.bind(this), 3000);
    }
   
  }

  async provjeriPodatke() {
    
    this.zanroviServis.fetchGenres().subscribe(genres => {
      this.sviZanrovi = genres;
    });
  
    for (let zanr of this.sviZanrovi) {
      let filmoviPoZanru = await this.moviesForGenre(zanr.id);
      if (filmoviPoZanru.length > 0) {
        this.sviFilmoviPoZanrovima.push(filmoviPoZanru);
      }

    }
  }

  async moviesForGenre(id : Number): Promise<FilmoviI[]> {
    if (id == 0 || id == 5) {
      return []; 
    }

    this.filmovi = await this.filmoviServis.dajFilmove(id);
    let genreMovies = [];
    if (this.filmovi.length === 0) {
      console.log('Polje filmovi je prazno');
      return []; 
    } else {
      for (let film of this.filmovi) {
        if (film.zanr_id === id) {
          genreMovies.push(film);
        }
        if (genreMovies.length >= 2) {
          break; 
        }
      }
      return genreMovies;
    }
  }






}
