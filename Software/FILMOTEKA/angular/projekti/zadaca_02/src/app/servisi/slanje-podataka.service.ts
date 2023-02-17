import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Korisnik } from './KorisnikI';
import { Observable } from 'rxjs';
import { environment } from 'projekti/zadaca_02/enviroments/environment';




@Injectable({
  providedIn: 'root'
})
export class SlanjePodatakaService {
  

  constructor(private http: HttpClient) { }

  restServis = environment.restServis;

  azurirajProfil(podaci:any) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.restServis+`korisnici/${podaci.korime}`, podaci, {headers});
    console.log(this.restServis+`korisnici/${podaci.korime}`);
  }


  dohvatiKorisnickiPodaci(): Observable<Korisnik> {
    return this.http.get<Korisnik>('/korisnickiPodaci');
  }

  dohvatiSesiju() {
    let odgovor = this.http.get('/sesija');
    console.log(odgovor);
    return odgovor;
  }

  
  

}
