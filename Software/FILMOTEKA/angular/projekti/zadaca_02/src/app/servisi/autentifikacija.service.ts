import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './KorisnikI';

@Injectable({
  providedIn: 'root'
})
export class AutentifikacijaService {

  constructor(private http: HttpClient) { }

  inicijalnaProvjera() {
    interface Odgovor {
      uloga:any
    }
    return this.http.get<Odgovor>('/uloga');
  }

  ucitajStranicu(imeStr:string) {
    interface Odgovor {
      uspjeh: any
    }
    console.log(imeStr);
    return this.http.get<Odgovor>('/sesija/'+imeStr);
  }

  filmoviPretrazivanje() {
    interface Odgovor {
      uspjeh: any
    }

    return this.http.get<Odgovor>('/filmoviPretrazivanje');
  }

  

  login(data:any) {

    interface Odgovor {
      uspjeh:any,
      session: any,
      error:any
    }
    return this.http.post<Odgovor>('/prijava', data);

  }

  odjava() {

    interface Odgovor {
      uspjeh: any
    }

    return this.http.get<Odgovor>('/odjava');

  }


  registracija(ime:string, prezime:string, email:string, korime: string, lozinka: string,adresa:string) {
    interface Odgovor {
      uspjeh: any,
      error:any
    }

    const data = {
      ime: ime,
      prezime: prezime,
      email: email,
      korime: korime,
      lozinka: lozinka,
      adresa: adresa
    };

    return this.http.post<Odgovor>('/registracija', data);
  }
}
