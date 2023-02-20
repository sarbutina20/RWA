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
| api/filmovi/?stranica=broj&brojFilmova=broj[&datum=datum][&zanr=idZanr][&naziv=dioNazivFilma][&sortiraj=[d | z | n]] | vraća listu određenog broja filmova za neku stranicu (broj), opcionalno filtrirano po datumu unosa (datum) i/ili žanru (idZanr) i/ili nazivu filma (dioNazivFilma), te može sortirati uzlazno po datumu (d), nazivu (n) ili žanru (z) | Uz dobivene podatke čita sve podatke o filmu s vanjskog servisa i dodaje novi film | |
| api/filmovi/id | Vraća podatke određenog filma (id) | “metoda nije dopuštena” (405) | Ažurira podatke određenog filma | Briše određeni film 
| api/zanr/ | Vraća listu žanrova | Dodaje novi žanr | | Briše sve žanrove za koje ne postoji film.
| api/zanr/id | Vraća podatke određenog žanra (id) | “metoda nije dopuštena” (405) | Ažurira postojeći žanr | Briše određeni žanr|
| api/tmdb/zanr | Prosljeđuje lisu žanrova koji vrati servis TMDB | | | 
| api/tmdb/filmovi?kljucaRijec=rijec1[,rijec2]&stranica=broj | Prosljeđuje listu filmova koju vrati servis TMDB, filtriranu po ključnoj riječi (kljucaRijec) i/ili stranici (broj) | | | 


