import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { SlanjePodatakaService } from '../servisi/slanje-podataka.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['registracija.component.scss'
  ]
})
export class RegistracijaComponent {
  title = 'registracija';
  ime!: string;
  prezime!: string;
  email!:string;
  korime!: string;
  lozinka!: string;
  adresa!: string;
  errorMessage!: string;

  constructor(private servisPodaci : AutentifikacijaService, private router:Router) {
    
  }

  registracija() {
    this.servisPodaci.registracija(this.ime,this.prezime, this.email,this.korime, this.lozinka, this.adresa).subscribe(
      (odgovor) => {
        if(odgovor.uspjeh) location.assign('/prijava');
        else this.errorMessage = "Neuspješna odjava";
      }
    );
  }

}
