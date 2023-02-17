import { NgZone, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { FilmoviService } from '../servisi/filmovi.service';
import { FilmoviI } from '../servisi/FilmoviI';
import { FilmoviTmdbI } from '../servisi/FilmoviTmdbI';
import { SlanjePodatakaService } from '../servisi/slanje-podataka.service';
import { TmdbService } from '../servisi/tmdb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filmovi-pretrazivanje',
  templateUrl: 'filmovi-pretrazivanje.component.html',
  styleUrls: ['filmovi-pretrazivanje.component.scss'
  ]
})
export class FilmoviPretrazivanjeComponent implements OnInit {
  title = "filmovipretrazivanje"
  errorMessage!: string;
  pristup!: boolean;

  filmovi: Array<FilmoviI> = new Array<FilmoviI>();
  sviFilmovi?: Array<FilmoviI>;

  kljucnaRijec = "";
  page=1;
  totalPages = 1;


  constructor(private servis: AutentifikacijaService, private filmoviServis: TmdbService, private ngZone: NgZone) {

  }
  ngOnInit(): void {
    this.servis.ucitajStranicu(this.title).subscribe(
      (odgovor: { uspjeh: any; }) => {
        if (odgovor.uspjeh) {
          this.pristup = true;
          this.dajFilmove();
        }
        else this.errorMessage = "Neautorizirani pristup";
      }
    );
    
  }

  async dajFilmove(stranica: number = 1): Promise<void> {
    this.filmovi = await this.filmoviServis.osvjeziFilmove(stranica, this.kljucnaRijec);
    if (this.filmoviServis.filmoviTMDB) {
      this.page = this.filmoviServis.filmoviTMDB.page;
      this.totalPages = this.filmoviServis.filmoviTMDB.total_pages;

    }
  }

  promijeniStranicu(stranica: number): void {
    this.ngZone.run(() => {
      this.dajFilmove(stranica);
      });
  }

  filtriraj(event: any) {
    if (event.target) {
      let kljucnaRijec = event.target.value;
      console.log("KLUCNA REC"+kljucnaRijec);
      this.filmoviServis.osvjeziFilmove(1, kljucnaRijec).then((filmovi: FilmoviI[]) => {
        this.filmovi = filmovi;
        if (this.filmoviServis.filmoviTMDB) {
          this.page = this.filmoviServis.filmoviTMDB.page;
          this.totalPages = this.filmoviServis.filmoviTMDB.total_pages;
        }
      });
    }
  }

}