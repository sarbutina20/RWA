import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { SlanjePodatakaService } from '../servisi/slanje-podataka.service';

@Component({
  selector: 'app-odjava',
  template: `
    <p *ngIf="errorMessage">
    </p>
  `,
  styles: [
  ]
})
export class OdjavaComponent {
  errorMessage!: string;
constructor(private servis : AutentifikacijaService,private router: Router) {
servis.odjava().subscribe(
  (odgovor) => {
    if(odgovor.uspjeh) {
      localStorage.clear();
      location.assign('/');
  }
    else this.errorMessage = "Neuspješna odjava";
  }
)
}
}
