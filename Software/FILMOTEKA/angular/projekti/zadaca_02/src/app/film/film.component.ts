import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviI } from '../servisi/FilmoviI';

@Component({
  selector: 'app-film',
  template: `
    <div *ngIf="errorMessage">{{errorMessage}}</div>
    <div>
      <h1> Naziv: {{film.naziv}}</h1>
      <p> Opis: {{film.opis}}</p>
      <p>Datum: {{film.datum}}</p>
      <p>Odobren: {{film.odobren}}</p>
    </div>
  `,
  styleUrls: ['film.component.scss'

  ]
})
export class FilmComponent implements OnInit {
  film: any;
  errorMessage!: string;

  constructor(private route: ActivatedRoute,
    private filmoviServis: FilmoviService) { }

  ngOnInit(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    let id = idString ? +idString : null;

    this.filmoviServis.getFilm(id!)
      .then(film => {
        this.film = film;
        if (this.film.datum == 0 || this.film.datum == "" || this.film.datum == undefined || this.film.datum == null) this.film.datum = "Ne postoji datum";
        if (this.film.opis == 0 || this.film.opis == "" || this.film.opis == undefined || this.film.opis == null) this.film.opis = "Ne postoji opis";
      })
      .catch(error => this.errorMessage = error);

    console.log(this.film);
  }

}
