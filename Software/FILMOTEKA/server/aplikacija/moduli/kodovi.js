const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);

const VELICINA_KLJUCA = 64;
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

exports.hashirajLozinku = async function(lozinka) {
	const sol = crypto.randomBytes(16);
	const hash = await scrypt(lozinka, sol, VELICINA_KLJUCA, {
		N: SCRYPT_N,
		r: SCRYPT_R,
		p: SCRYPT_P
	});
	return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${sol.toString('hex')}$${hash.toString('hex')}`;
}

exports.provjeriLozinku = async function(lozinka, spremljeniHash) {
	if (typeof spremljeniHash !== 'string') return false;

	const dijelovi = spremljeniHash.split('$');
	if (dijelovi.length !== 6 || dijelovi[0] !== 'scrypt') return false;

	const n = Number(dijelovi[1]);
	const r = Number(dijelovi[2]);
	const p = Number(dijelovi[3]);
	const sol = Buffer.from(dijelovi[4], 'hex');
	const ocekivaniHash = Buffer.from(dijelovi[5], 'hex');
	if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p) ||
		sol.length === 0 || ocekivaniHash.length === 0) return false;

	const dobiveniHash = await scrypt(lozinka, sol, ocekivaniHash.length, { N: n, r, p });
	return crypto.timingSafeEqual(ocekivaniHash, dobiveniHash);
}

exports.dajNasumceBroj = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
