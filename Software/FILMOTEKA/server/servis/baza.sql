PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `tip_korisnika` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `naziv` varchar(100) NOT NULL,
  `opis` text,
  UNIQUE(`naziv`)
);

INSERT INTO `tip_korisnika` (`id`, `naziv`, `opis`) VALUES
(1, 'registrirani korisnik', NULL),
(2, 'admin', NULL),
(3, 'gost', NULL);

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `korime` varchar(100) NOT NULL,
  `lozinka` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `ime` varchar(50) DEFAULT NULL,
  `prezime` varchar(100) DEFAULT NULL,
  `adresa` text,
  `tip_korisnika_id` INTEGER NOT NULL,
  `aktiviran` tinyint NOT NULL DEFAULT '0',
  `totp` text,
  `aktivacijski_kod` text,
  UNIQUE(`korime`),
  UNIQUE(`email`),
  FOREIGN KEY(tip_korisnika_id) REFERENCES tip_korisnika(id)
);

CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `naziv` varchar(200) NOT NULL,
  `datum` date DEFAULT NULL,
  `opis` text,
  `korisnik_id` int NOT NULL,
  `odobren` tinyint DEFAULT NULL,
  UNIQUE(`naziv`),
  FOREIGN KEY(korisnik_id) REFERENCES korisnik(id)
);

CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `naziv` varchar(200) NOT NULL,
  UNIQUE(`naziv`)
);

CREATE TABLE IF NOT EXISTS `zanr_has_film` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY(`zanr_id`, `film_id`),
  FOREIGN KEY(zanr_id) REFERENCES zanr(id),
  FOREIGN KEY(film_id) REFERENCES film(id)
);
