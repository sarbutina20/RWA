import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { Korisnik } from '../servisi/KorisnikI';
import { SlanjePodatakaService } from '../servisi/slanje-podataka.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['profil.component.scss'
  ]
})
export class ProfilComponent {
  title = "profil"
  ime!: string;
  prezime!: string;
  email!: string;
  korime!: string;
  lozinka!: string;
  adresa!: string;

  
  errorMessage!: string;
  pristup!: boolean;

  korisnik!: Korisnik;
  formaProfil!: FormGroup;



  constructor(private servisPodaci: SlanjePodatakaService, private servis: AutentifikacijaService) {
    servis.ucitajStranicu(this.title).subscribe(
      async (odgovor: { uspjeh: any; }) => {
        if (odgovor.uspjeh) {
          this.pristup = true;
          this.servisPodaci.dohvatiKorisnickiPodaci().subscribe((korisnik: Korisnik) => {
            this.korisnik = korisnik;
            this.ime = korisnik.ime;
            this.prezime = korisnik.prezime;
            this.adresa = korisnik.adresa;
          });
        }
        else this.errorMessage = "Neautorizirani pristup";
      }
    );
  }


  async azurirajProfil() {
    console.log(this.korisnik.korime + this.ime + this.prezime + this.adresa);
    let podaci = {
      korime: this.korisnik.korime,
      ime: this.ime,
      prezime: this.prezime,
      adresa: this.adresa
    }
    
    this.servisPodaci.azurirajProfil(podaci).subscribe(data=> {
      console.log(data);

   });
    
  }
}
