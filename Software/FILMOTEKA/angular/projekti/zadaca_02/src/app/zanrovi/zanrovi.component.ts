import { Component } from '@angular/core';
import { ZanrovI } from '../servisi/ZanrovI';
import { ZanroviService } from '../servisi/zanrovi.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-zanrovi',
  templateUrl: 'zanrovi.component.html',
  styleUrls: ['zanrovi.component.scss']
})
export class ZanroviComponent implements OnInit {
  title = "zanrovi"
  zanrovi: ZanrovI[];
  sviZanrovi: ZanrovI[];
  formaZanrovi!: FormGroup;
  errorMessage!: string;
  pristup!:boolean;

  constructor(private zanroviServis : ZanroviService, private servis:AutentifikacijaService) {
    this.zanrovi = [];
    this.sviZanrovi = [];
    servis.ucitajStranicu(this.title).subscribe(
      async (odgovor: { uspjeh: any; }) => {
        if(odgovor.uspjeh) {
          this.pristup=true;
          this.zanroviServis.fetchGenres().subscribe(genres => {
            this.sviZanrovi = genres;
          });
      }
        else this.errorMessage = "Neautorizirani pristup";
    }
    );
  }


  ngOnInit():void {
    this.servis.ucitajStranicu(this.title).subscribe(
      async (odgovor: { uspjeh: any; }) => {
        if(odgovor.uspjeh) {
          this.pristup=true;
          this.zanroviServis.fetchGenres().subscribe(genres => {
            this.sviZanrovi = genres;
          });
      }
        else this.errorMessage = "Neautorizirani pristup";
    }
    );
  }  

    azurirajZanr(id: number, podaci:any) {
      this.zanroviServis.azurirajZanr(id, podaci);
    }



}

