import { Component } from '@angular/core';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviI } from '../servisi/FilmoviI';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filmovipregled',
  templateUrl: 'filmovipregled.component.html',
  styleUrls: ['filmovipregled.component.scss'
  ]
})
export class FilmovipregledComponent {
  filmovi: FilmoviI[];
  sviFilmovi: FilmoviI[];
  title = "filmovipregled"
  errorMessage!: string;
  pristup!:boolean;

  constructor(private filmoviServis : FilmoviService, private servis:AutentifikacijaService, private router: Router,) {
    this.filmovi = [];
    this.sviFilmovi = [];
    servis.ucitajStranicu(this.title).subscribe(
      async (odgovor: { uspjeh: any; }) => {
        if(odgovor.uspjeh) {
          this.pristup=true;
          let proba = await filmoviServis.getSviFilmovi();
          this.sviFilmovi = proba;
      }
        else this.errorMessage = "Neautorizirani pristup";
    }
    );
  }

}
