import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlanjePodatakaService } from '../servisi/slanje-podataka.service';
import { Router } from '@angular/router';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['prijava.component.scss'
  ]
})
export class PrijavaComponent {

  captcha: string;
  korime!: string;
  lozinka!: string;
  errorMessage!: string;

constructor(private servisPodaci : AutentifikacijaService, private router: Router) {
  this.captcha ='';

}
  
  resolved(captchaResponse:string) {
    this.captcha = captchaResponse;
  }

  login() {
    const data = {
      korime: this.korime,
      lozinka: this.lozinka,
    };
    
    this.servisPodaci.login(data).subscribe(
      (odgovor) => {
        if(odgovor.session) {
          localStorage.setItem('jwt', odgovor.session.jwt);
          localStorage.setItem('uloga', odgovor.session.uloga);
          location.assign('/');
        }
        else {
          this.errorMessage = odgovor.error;
        }
      });
  }
  
}
