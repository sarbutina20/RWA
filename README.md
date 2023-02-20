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


