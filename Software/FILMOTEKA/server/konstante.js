function dohvatiTajnu(naziv) {
    const tajna = process.env[naziv];
    if (typeof tajna !== "string" || tajna.length < 32) {
        throw new Error(`${naziv} mora biti postavljen i sadržavati najmanje 32 znaka.`);
    }
    return tajna;
}

module.exports = {
    dirModula : "/usr/lib/node_modules/",
    podaciZaBazu : process.env.PODACI_ZA_BAZU,
    dirPortova: "/var/www/RWA/2022/",
    tajniKljucJWT: dohvatiTajnu("JWT_SECRET"),
    tajniKljucSesija: dohvatiTajnu("SESSION_SECRET")
}
