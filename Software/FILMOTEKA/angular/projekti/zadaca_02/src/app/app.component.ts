import { Component } from '@angular/core';
import { AutentifikacijaService } from './servisi/autentifikacija.service';
import { FilmoviService } from './servisi/filmovi.service';
import { FilmoviI } from './servisi/FilmoviI';
import { ZanrovI } from './servisi/ZanrovI';
import { ZanroviService } from './servisi/zanrovi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'zadaca_02';
  putanja = 'pocetna';
  uloga!: number;


  constructor(servis:AutentifikacijaService) {
    servis.inicijalnaProvjera().subscribe(

      (odgovor) => {
        if(odgovor.uloga==2) this.uloga = 2;
        else if(odgovor.uloga==1) this.uloga=1;
        else this.uloga=0;
      }
    
    );
  }


}
