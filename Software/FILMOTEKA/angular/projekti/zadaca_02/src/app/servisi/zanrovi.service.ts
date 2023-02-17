import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projekti/zadaca_02/enviroments/environment.prod';
import { Observable, shareReplay } from 'rxjs';
import { ZanrovI } from './ZanrovI';

@Injectable({
  providedIn: 'root'
})
export class ZanroviService {

  restServis = environment.restServis;
  zanroviTMDB?: ZanrovI;
  zanrovi = new Array<ZanrovI>();
  private genres: ZanrovI[] = [];

  constructor(private http: HttpClient) {
    let zanrovi = localStorage.getItem("zanrovi");
    if (zanrovi == null) {
      //this.osvjeziFilmove();
    } else {
      this.zanroviTMDB = JSON.parse(zanrovi);
    }
  }


  fetchGenres(): Observable<ZanrovI[]> {
    return this.http.get<ZanrovI[]>(this.restServis + 'zanr').pipe(shareReplay(1));
  }

  azurirajZanr(id: number, data: { naziv: string }) {
    const url = this.restServis + `zanr/${id}`;

    this.http.put(url, data).subscribe();
  }






}
