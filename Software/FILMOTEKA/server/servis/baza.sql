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


INSERT INTO `korisnik` (`id`, `korime`, `lozinka`, `email`, `ime`, `prezime`, `adresa`, `tip_korisnika_id`, `aktiviran`, `totp`, `aktivacijski_kod`) VALUES
(1, 'obican', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'obican@foi.hr', 'Obican', 'Korisnik', 'Obicna adresa 12', 1, 1, 'obicanTOTPKod', NULL),
(2, 'administrator', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'administrator@foi.hr', 'sdfg', '', '', 2, 1, 'administratorTOTPKod', 'administratorAktKod'),
(3, 'sarbutina20', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'sarbutina20@student.foi.hr', 'Sebastian', 'Arbutina', 'Ulica Julija Merlića 9', 2, 1, NULL, NULL),
(12, 'probnareg', '0a274ce13585c2018c73ae8aad898de417b34fb12b6417e61c2e1b642f37fadf', 'fidadi5729@hostovz.com', 'Probna', 'Registracija', 'MojaUlica', 1, 1, 'AAAAAAA', '123456789'),
(14, 'novikor', '9fafcaec3e0ee42cbbec3d1f8154a146006e76c5bb7fb20c0614bde64fd913cf', 'yixemos476@ktasy.com', 'Novi', 'Korisnik', NULL, 1, 1, 'AABAKCAAAIAAAAZGAIERABIABAAAABRJAZDRRBIAAAAAACIGAAARCAIBAZDAACAAAZBRAAAAARAAAAAAAZAAAAAHAACRABRJARDAAAA', '97004'),
(16, 'drugikor', '9fafcaec3e0ee42cbbec3d1f8154a146006e76c5bb7fb20c0614bde64fd913cf', 'copoxe3151@hoxds.com', 'Drugi', 'Korisnik', NULL, 1, 1, 'BAARMAAAAMAAEBICAADRAARABADRAAAAAIAACARAARARABIAAAEAKBZHAECRCAABAIERMAAABEAAGAAAAAAAAAIAAAAAAAAAAAAAAAA', '24102'),
(17, 'ciletan', '9fafcaec3e0ee42cbbec3d1f8154a146006e76c5bb7fb20c0614bde64fd913cf', 'ciletan116@sopulit.com', 'Cile', 'Tan', NULL, 1, 1, 'AZAAMAABA5AAAAAFAADROAZAAAAAAAAAAABAECIAAABAAAZAAECAAAADAABAAAIHARAAEAIAAAEAEAAAAACRIAAGAAAAAAZGAMAAKAI', '28217'),
(18, 'yogivey', '9fafcaec3e0ee42cbbec3d1f8154a146006e76c5bb7fb20c0614bde64fd913cf', 'yogivey941@lance7.com', 'yogi', 'vey', NULL, 1, 1, 'AAARICIAAABRKBZHAZCAABRFAICAABRAAACRAAAABEAAAAABA5BRAAAFAACRRCABAAAAKBRDBAAACAAAAACRKBAHBAAAABIDARAAAAA', '17351'),
(20, 'iolic', '0a274ce13585c2018c73ae8aad898de417b34fb12b6417e61c2e1b642f37fadf', 'dacal45985@kuvasin.com', 'Ivica', 'Olić', NULL, 1, 1, 'AZARIAAEAACAABIAARDAAAAAAABRRCAAAIAAGBAJARAAMAAAAZAAMBIAAADRAAAAARCAABZAAAAAACIAAACARAAAAADAAAAJAABAICI', '42364');


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

INSERT INTO `film` (`id`, `naziv`, `datum`, `opis`, `korisnik_id`, `odobren`) VALUES
(2, 'Bullet Train', '2022-11-08', NULL, 1, 1),
(3, 'Elvis', '2022-10-19', NULL, 1, 1),
(4, 'Pinocchio', '2019-08-20', '123456', 1, 1),
(5, 'Hellraiser', '2022-10-07', NULL, 1, 0),
(6, 'Poor Kids', '2022-10-17', NULL, 1, 1),
(7, 'Arrival', '2022-10-12', NULL, 1, 1),
(8, 'Full Metal Jacket', '2022-10-07', NULL, 2, 1),
(9, 'Apocalypse Now', '2022-10-15', NULL, 2, 1),
(10, 'The Notebook', '2022-10-09', NULL, 2, 1),
(11, 'Casablanca', '2022-10-01', NULL, 2, 1),
(12, 'When We Were Kings', '2022-10-02', NULL, 3, 0),
(13, 'Hoop Dreams', '2022-10-03', NULL, 3, 1),
(14, 'Rocky', '2022-10-03', NULL, 3, 1),
(15, 'Top Gun: Maverick', '2022-10-27', NULL, 3, 1),
(16, 'The Godfather', '2022-10-19', NULL, 1, 0),
(17, 'The Dark Knight', '2022-10-26', NULL, 2, 0),
(18, 'The Rock', '2022-10-21', NULL, 3, 1),
(19, 'Beetlejuice', '2022-10-18', NULL, 1, 1),
(20, 'Beyond', '2022-12-13', NULL, 2, 1),
(21, 'Orphan', '2022-12-11', NULL, 2, 1);

SELECT * FROM `film`;



CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `naziv` varchar(200) NOT NULL,
  UNIQUE(`naziv`)
);


INSERT INTO `zanr` (`id`, `naziv`) VALUES
(7, 'Avantura'),
(6, 'Dokumentarni'),
(4, 'Drama'),
(3, 'Horor'),
(8, 'Ratni'),
(9, 'Romanticni'),
(2, 'SF'),
(10, 'Sportski'),
(1, 'xvx');


CREATE TABLE IF NOT EXISTS `zanr_has_film` (
  `zanr_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  PRIMARY KEY(`zanr_id`, `film_id`),
  FOREIGN KEY(zanr_id) REFERENCES zanr(id),
  FOREIGN KEY(film_id) REFERENCES film(id)
);

INSERT INTO `zanr_has_film` (`zanr_id`, `film_id`) VALUES
(1, 2),
(4, 3),
(7, 4),
(3, 5),
(6, 6),
(2, 7),
(8, 8),
(8, 9),
(4, 10),
(9, 10),
(9, 11),
(10, 12),
(6, 13),
(10, 14),
(1, 15),
(4, 16),
(1, 17),
(7, 17),
(1, 18),
(2, 20),
(3, 21);

