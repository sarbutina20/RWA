const jsonwebtoken = require("jsonwebtoken");
const konst = require("../konstante.js");
const KorisnikDAO = require("./korisnikDAO.js");

const ULOGA_KORISNIK = 1;
const ULOGA_ADMINISTRATOR = 2;

function posaljiGresku(odgovor, status, poruka) {
    odgovor.status(status).json({ greska: poruka });
}

function dohvatiToken(zahtjev) {
    const zaglavlje = zahtjev.headers.authorization;
    if (typeof zaglavlje !== "string") return null;

    // Prihvaća standardni Bearer oblik i sirovi token radi kompatibilnosti sa starijim klijentima.
    const dijelovi = zaglavlje.trim().split(/\s+/);
    if (dijelovi.length === 2 && dijelovi[0].toLowerCase() === "bearer") {
        return dijelovi[1];
    }
    return dijelovi.length === 1 ? dijelovi[0] : null;
}

function zahtijevaUloge(...dopusteneUloge) {
    return async function (zahtjev, odgovor, sljedeci) {
        const token = dohvatiToken(zahtjev);
        if (token == null) {
            return posaljiGresku(odgovor, 401, "Potrebna je prijava.");
        }

        try {
            const sadrzajTokena = jsonwebtoken.verify(token, konst.tajniKljucJWT);
            const korisnik = await new KorisnikDAO().daj(sadrzajTokena.korime);

            if (korisnik == null) {
                return posaljiGresku(odgovor, 401, "Korisnik iz tokena ne postoji.");
            }
            if (korisnik.aktiviran !== 1) {
                return posaljiGresku(odgovor, 403, "Korisnički račun nije aktiviran.");
            }
            if (!dopusteneUloge.includes(korisnik.tip_korisnika_id)) {
                return posaljiGresku(odgovor, 403, "Korisnik nema ovlasti za ovu radnju.");
            }

            // Provjereni podaci spremaju se na zahtjev kako ih kontroleri ne bi čitali iz nepouzdanog ulaza.
            zahtjev.autoriziraniKorisnik = korisnik;
            sljedeci();
        } catch (greska) {
            return posaljiGresku(odgovor, 401, "Token nije valjan ili je istekao.");
        }
    };
}

function zahtijevaVlastitiRacunIliAdministratora(zahtjev, odgovor, sljedeci) {
    return zahtijevaUloge(ULOGA_KORISNIK, ULOGA_ADMINISTRATOR)(zahtjev, odgovor, function () {
        const korisnik = zahtjev.autoriziraniKorisnik;
        if (korisnik.tip_korisnika_id !== ULOGA_ADMINISTRATOR &&
            korisnik.korime !== zahtjev.params.korime) {
            return posaljiGresku(odgovor, 403, "Dopuštena je izmjena samo vlastitog računa.");
        }
        sljedeci();
    });
}

module.exports = {
    zahtijevaPrijavu: zahtijevaUloge(ULOGA_KORISNIK, ULOGA_ADMINISTRATOR),
    zahtijevaAdministratora: zahtijevaUloge(ULOGA_ADMINISTRATOR),
    zahtijevaVlastitiRacunIliAdministratora
};
