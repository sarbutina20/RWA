# Filmoteka

## Opis projekta
Filmoteka je projekt kreiran za predmet Razvoj web aplikacija i vođen je zahtjevima specificiranih od strane profesora.
Filmoteka je web aplikacija koja se sastoji od 2 servera od kojih jedan poslužuje datoteke kreirane u Angularu, a drugi predstavlja REST server koji poslužuje korisničke zahtjeve.
Svaki server se pokreće na zasebnom portu koji se čita iz datoteke, ali se nalaze na istom fizičkom poslužitelju.  
Za rad aplikacije potrebno je osposobiti MySQL bazu podataka u kojoj su pohranjeni filmovi, korisnici...  
  
REST server predstavlja aplikativno programsko sučelje (API) prema bazi podataka i prema vanjskom servisu (TMDB), a koji koristi web aplikacija za pristup podacima.
Ako datoteka konfiguracije ne postoji pri podizanju servera, javlja se greška i poslužitelj prestaje s
radom. Ako konfiguracijska datoteka postoji, radi se provjera postoje li svi potrebni konfiguracijski podaci unutar konfiguracijske datoteke.
Provjera konfiguracijskih podataka se vrši putem RegExa. Ako zahtjev ne postoji ili nije dozvoljen javljaju se greške.  


## Tablica 1. Pregled resursa, metoda i parametara REST servisa
| Resurs parametri | GET čitanje | POST kreiranje | PUT ažuriranje | DELETE brisanje
| --- | --- | --- | --- | --- |
| api/korisnici | vraća listu korisnika | kreira novog korisnika | | | Odrađeno sve |
| api/korisnici/korime | vraća određenog korisnika | “metoda nije dopuštena” (405)" | Ažurira određenog korisnika | 
| api/korisnici/korime/aktivacija | | “metoda nije dopuštena “ (405) | Aktivira novog korisnika | 
| api/korisnici/korime/prijava | | Provjerava podatke prijave i vraća je li korisnik uspješno prijavljen | | 
| api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d ILI z ILI n]] | vraća listu određenog broja filmova za neku stranicu (broj), opcionalno filtrirano po datumu unosa (datum) i/ili žanru (idZanr) i/ili nazivu filma (dioNazivFilma), te može sortirati uzlazno po datumu (d), nazivu (n) ili žanru (z) | Uz dobivene podatke čita sve podatke o filmu s vanjskog servisa i dodaje novi film | |
| api/filmovi/id | Vraća podatke određenog filma (id) | “metoda nije dopuštena” (405) | Ažurira podatke određenog filma | Briše određeni film 
| api/zanr/ | Vraća listu žanrova | Dodaje novi žanr | | Briše sve žanrove za koje ne postoji film.
| api/zanr/id | Vraća podatke određenog žanra (id) | “metoda nije dopuštena” (405) | Ažurira postojeći žanr | Briše određeni žanr|
| api/tmdb/zanr | Prosljeđuje lisu žanrova koji vrati servis TMDB | | | 
| api/tmdb/filmovi?kljucaRijec=rijec1[,rijec2]&stranica=broj | Prosljeđuje listu filmova koju vrati servis TMDB, filtriranu po ključnoj riječi (kljucaRijec) i/ili stranici (broj) | | | 

## Tablica 2. Pregled funkcionalnosti Web aplikacije
| Uloga    | Stranica/e                     | Opis                                                                                         | Odrađeno               |
| -------- | ------------------------------ | -------------------------------------------------------------------------------------------- | ---------------------- |
| Gost     | Početna                        | Prikazuje popis žanrova u bazi podataka i nasumice prikazuje 2 filma za svaki žanr koji postoje u bazi podataka.          | Odrađeno.              |
| Gost     | Dokumentacija                  | Prikazuje stranicu dokumentacija.html opisanu ranije                                         | Odrađeno               |
| Gost     | Registracija, Prijava, Odjava  | Gost se može se registrirati kao novi korisnik. Lozinka se u bazu ne smije spremati u čitljivom obliku i treba koristiti sol kod spremanja. Kod prijave treba koristiti autentikacija s lozinkom. Jednom prijavljeni korisnik može se odjaviti kad želi. | Odrađeno               |               
| Korisnik | Profil                         | Vidi svoje podatke (ime, prezime, korisničko ime, e-mail, …) i može ih ažurirati. Korisničko ime i e-mail se ne mogu ažurirati.  | Odrađeno               |
| Korisnik | Filmovi pregled                | Vidi popis svih filmova koji postoje u bazi, može filmove filtrirati po žanru i/ili datumu unosa. Datumsko filtriranje čita podatke od unesenog datuma do današnjeg datuma. Može uzlazno sortirati filmove po nazivu filma, datumu ili nazivu žanra. Može kliknuti na naziv filma i dobiti sve podatke o filmu.          | Odrađen samo popis     |                    |
| Korisnik | Filmovi pretraživanje          | Može upisati ključne riječi po kojima se pretražuju filmovi sa servisa TMDB (preko api/tmdb). Broj stranica nalazi se u podatku “total_pages”. Ako pronađe film koji mu se sviđa može kliknuti na dodaj u bazu. Film se svim dobivenim                   | Nije implementirano     |
|          |                                |              | dodavanje filma u bazu. |
|          |                                |                |                       

