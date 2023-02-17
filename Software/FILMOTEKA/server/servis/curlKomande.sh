port=12220
server="localhost"
echo "GET"
curl -X GET "http://$server:$port/api/korisnici/"
echo ""
echo "POST"
#curl -X POST "http://$server:$port/api/korisnici/" -H 'Content-Type: application/json' -d '{"ime":"Test", "prezime":"Test", "lozinka":"123456", "email":"test3@foi.unizg.hr", "korime":"test"}'
echo ""
echo "DELETE"
curl -X DELETE "http://$server:$port/api/korisnici/"
echo ""
echo "PUT"
curl -X PUT "http://$server:$port/api/korisnici/"
echo ""
echo "GET"
curl -X GET "http://$server:$port/api/korisnici/pkos"
echo ""
echo "GET prijava tocna"
curl -X POST "http://$server:$port/api/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'
echo ""
echo "GET prijava kriva"
curl -X POST "http://$server:$port/api/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"12345"}'
echo ""
echo "PUT"
curl -X PUT "http://$server:$port/api/korisnici/pkos" -H 'Content-Type: application/json' -d '{"ime":"Test2", "prezime":"Test", "lozinka":"123456", "email":"test2@foi.unizg.hr"}'
echo ""
echo "DELETE"
curl -X DELETE "http://$server:$port/api/korisnici/test"
echo ""
echo "POST"
curl -X POST "http://$server:$port/api/korisnici/test"
echo ""



curl -X POST "http://spider.foi.hr:12242/api/korisnici/" -H "Content-Type: application/json" -d "{\"korime\":\"test\", \"lozinka\":\"123456\", \"email\":\"test3@foi.unizg.hr\", \"ime\":\"Test\", \"prezime\":\"Test\",\"adresa\":\"Ulica 123\"}"

curl -X PUT "http://spider.foi.hr:12242/api/korisnici/test" -H "Content-Type: application/json" -d "{\"ime\":\"Test2\", \"prezime\":\"Test\", \"lozinka\":\"123456\", \"email\":\"test2@foi.unizg.hr\", \"adresa\":\"Ulica 321\", \"aktiviran\":\"test2@foi.unizg.hr\"}"

curl -X PUT "http://spider.foi.hr:12242/api/korisnici/test/aktivacija" -H "Content-Type: application/json" -d "{\"aktiviran\":\"1\"}"

curl -X GET "http://spider.foi.hr:12242/api/filmovi/4"

curl -X PUT "http://spider.foi.hr:12242/api/filmovi/4" -H "Content-Type: application/json" -d "{\"naziv\":\"Pinocchio\", \"datum\":\"2019-08-20 10:22:34\", \"opis\":\"123456\", \"odobren\":\"1\"}"

curl -X DELETE "http://spider.foi.hr:12242/api/filmovi/4"

curl -X GET "http://spider.foi.hr:12242/api/zanr/"

curl -X POST "http://spider.foi.hr:12242/api/zanr/" -H "Content-Type: application/json" -d "{\"naziv\":\"Biografija\"}"

curl -X DELETE "http://spider.foi.hr:12242/api/zanr/"

curl -X GET "http://spider.foi.hr:12242/api/zanr/12"

curl -X PUT "http://spider.foi.hr:12242/api/zanr/12" -H "Content-Type: application/json" -d "{\"naziv\":\"Biografijski\"}"

curl -X DELETE "http://spider.foi.hr:12242/api/zanr/12"

curl -X GET "http://spider.foi.hr:12242/api/tmdb/zanr"

curl -X GET "http://spider.foi.hr:12242/api/tmdb/filmovi?kljucnaRijec=avatar&stranica=1"

curl -X GET "http://spider.foi.hr:12242/api/filmovi/?stranica=broj&brojFilmova=broj"
















