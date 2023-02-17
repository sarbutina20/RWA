import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ProfilComponent } from './profil/profil.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { FilmoviPretrazivanjeComponent } from './filmovi-pretrazivanje/filmovi-pretrazivanje.component';
import { FilmovipregledComponent } from './filmovipregled/filmovipregled.component';
import { FilmComponent } from './film/film.component';
import { RecaptchaModule } from 'ng-recaptcha';


const routes:Routes=[
  {path:"pocetna", component:PocetnaComponent},
  {path:"", component:PocetnaComponent},
  {path:"prijava", component:PrijavaComponent},
  {path:"registracija", component:RegistracijaComponent},
  {path:"dokumentacija", component:DokumentacijaComponent},
  {path:"filmoviPretrazivanje", component:FilmoviPretrazivanjeComponent},
  {path:"filmoviPregled", component:FilmovipregledComponent},
  {path:"profil", component:ProfilComponent},
  {path:"zanrovi", component:ZanroviComponent},
  {path:"odjava", component:OdjavaComponent},
  { path: 'film/:id', component: FilmComponent }
  //{path:"", redirectTo:"pocetna", pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    ProfilComponent,
    DokumentacijaComponent,
    ZanroviComponent,
    PocetnaComponent,
    OdjavaComponent,
    FilmoviPretrazivanjeComponent,
    FilmovipregledComponent,
    FilmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
