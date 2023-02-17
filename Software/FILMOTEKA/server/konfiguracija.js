const ds = require("fs/promises");

class Konfiguracija {
    
    constructor() {
        this.konf = {};
    }

    dajKonf() {
        return this.konf;
    }

    async ucitajKonfiguraciju() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        this.konf = pretvoriJSONkonfig(podaci);

        console.log(this.konf);
    }

    async dohvatiPort() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        var nizPodataka = podaci.split("\n");
        var i = 1;
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(i == 6) return vrijednost;
            i++;
            
        }
    }

    async dohvatiAppPort() {
        var podaci = await ds.readFile(process.argv[2], "UTF-8");
        var nizPodataka = podaci.split("\n");
        var i = 1;
        for (let podatak of nizPodataka) {
            var podatakNiz = podatak.split("=");
            var naziv = podatakNiz[0];
            var vrijednost = podatakNiz[1];
            if(i == 7) return vrijednost;
            i++;
            
        }
    }

}

function pretvoriJSONkonfig(podaci) {
    console.log(podaci);
    let konf = {};
    var nizPodataka = podaci.split("\n");
    var i = 1;
    for (let podatak of nizPodataka) {
        var podatakNiz = podatak.split("=");
        var naziv = podatakNiz[0];
        var vrijednost = podatakNiz[1];
        var re = new RegExp('');

        switch(i) {
            case 1: {
                re = new RegExp('^(?=(.*[a-zA-Z].*){2,})(?=(.*[0-9].*){2,})[a-zA-Z0-9\S]{15,20}$');
                break;
                
            }               
            case 2: {
                re = new RegExp('^(?=(.*[0-9].*){3,})(?=(.*[a-zA-Z].*){3,})(?=(.*[^\p{L}\d\s_].*){3,}).{20,100}');
                break;
            }
            case 3: {
                re = new RegExp('^([5-9]|[1-9][0-9]|100)$');
                break;
            }
        }

        var ok = re.test(vrijednost);
        if(!ok) {
            switch(i) {
                case 1:
                    console.error("Nisu zadovoljeni kriteriji za vrijednost korisnickog imena (Veličina: 15-20, 2 slova, 2 broja)");
                    break;
                case 2:
                    console.error("Nisu zadovoljeni kriteriji za vrijednost lozinke (Veličina: 20-100, 3 slova, 3 broja, 3 specijalna znaka)");
                    break;
                case 3:
                    console.error("Nisu zadovoljeni kriteriji za vrijednost broja podataka koji se prikazuje na stranicama (Broj od 5 do 100)");
                    break;
            }
            process.exit();
        }
        konf[naziv] = vrijednost;
        i++;
    }
    return konf;
}

module.exports=Konfiguracija;