# STS VET - Veterinarska stanica

Klijentska veb aplikacija za veterinarsku stanicu, izrađena korišćenjem React-a, TypeScript-a i Vite alata. Aplikacija omogućava korisnicima da pregledaju veterinarske usluge, filtriraju i pretražuju usluge, registruju se, prijave, zakažu termin, pregledaju profil, dodaju ljubimce i upravljaju zakazanim terminima.

## Članovi tima

- Stefan Ilić
- Sara Ječmenica
- Tamara Jokić

## Korišćene tehnologije

- React
- TypeScript
- Vite
- React Router DOM
- CSS
- LocalStorage
- Dog CEO API
- The Cat API
- Git i GitHub

## Pokretanje projekta lokalno

Prvo klonirati repozitorijum:

git clone https://github.com/elab-development/klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2023-0573-veterinarska-stanica.git

Ući u folder projekta:

cd klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2023-0573-veterinarska-stanica

Instalirati pakete:

npm install

Pokrenuti aplikaciju:

npm run dev

Aplikacija se pokreće na adresi:

http://localhost:5173

Za proveru produkcionog build-a:

npm run build

## Test korisnik

Za testiranje prijave može se koristiti nalog:

Email:

[test@mail.com](mailto:test@mail.com)

Lozinka:

sifra123

Takođe je moguće registrovati novi nalog kroz stranicu Registracija. Registrovani nalog se čuva u localStorage-u i može se koristiti za kasniju prijavu.

## Struktura projekta

src/
components/
Dugme.tsx
Footer.tsx
LjubimacKartica.tsx
Navbar.tsx
Polje.tsx

context/
AppContext.tsx

models/
types.ts

pages/
Kontakt.tsx
ONama.tsx
Pocetna.tsx
PojedinacnaUsluga.tsx
PolitikaPrivatnosti.tsx
Prijava.tsx
Profil.tsx
Registracija.tsx
Usluge.tsx
Zakazivanje.tsx

## Stranice aplikacije

Aplikacija sadrži sledeće stranice:

- Početna stranica - /
- Prijava - /prijava
- Registracija - /registracija
- Zakazivanje termina - /zakazivanje
- Moj profil - /profil
- Usluge - /usluge
- Pojedinačna usluga - /usluga/:id
- Kontakt - /kontakt
- O nama - /o-nama
- Politika privatnosti - /politika-privatnosti

Stranice /zakazivanje i /profil su zaštićene rute. Korisnik mora biti prijavljen da bi im pristupio.

## Glavne funkcionalnosti

Aplikacija omogućava:

- registraciju korisnika;
- prijavu korisnika;
- odjavu korisnika;
- čuvanje korisničkog naloga u localStorage;
- zaštitu ruta za profil i zakazivanje;
- pregled veterinarskih usluga;
- pretragu usluga;
- filtriranje usluga po kategoriji;
- filtriranje usluga po vrsti ljubimca;
- filtriranje po ceni;
- sortiranje usluga po popularnosti, oceni i ceni;
- paginaciju liste usluga;
- prikaz pojedinačne usluge;
- zakazivanje veterinarskog termina;
- izbor ljubimca, usluge, datuma i vremena;
- pregled zakazanih termina na profilu;
- otkazivanje termina;
- dodavanje ljubimca;
- izmenu korisničkih podataka;
- kontakt formu;
- prikaz podataka sa eksternih API-ja.

## Reusable komponente

U aplikaciji su kreirane i korišćene sledeće reusable komponente:

- Navbar - navigacioni meni aplikacije;
- Footer - podnožje aplikacije;
- Dugme - univerzalna komponenta za dugmad;
- Polje - univerzalna komponenta za unos podataka;
- LjubimacKartica - kartica za prikaz ljubimca.

Ove komponente se koriste na više mesta kroz aplikaciju.

## React hooks

U aplikaciji se koriste React hooks:

- useState
- useEffect
- useContext
- useNavigate
- useParams
- useMemo

## Klase i interfejsi

U fajlu src/models/types.ts definisani su modeli, interfejsi i klase koje se koriste u aplikaciji.

Aktivno korišćene klase:

- TerminManager
- UslugaManager

TerminManager se koristi za rad sa terminima, dodavanje termina i otkazivanje termina.

UslugaManager se koristi za filtriranje, sortiranje i brojanje usluga po kategorijama.

Interfejsi sa metodama:

- ITerminManager
- IUslugaManager
- AppContextType

## API integracije

Aplikacija koristi dva smislena eksterna API-ja:

1. Dog CEO API

Koristi se za prikaz slika pasa u komponenti LjubimacKartica.

2. The Cat API

Koristi se za prikaz slike mačke na početnoj stranici.

U slučaju greške pri učitavanju API-ja, aplikacija prikazuje rezervni prikaz ili poruku, kako stranica ne bi prestala da radi.

## LocalStorage

Aplikacija koristi localStorage za čuvanje podataka:

- registrovaniNalog - podaci registrovanog korisnika;
- jeUlogovan - status prijave korisnika;
- zapamceniEmail - email adresa ako korisnik izabere opciju „Zapamti me“.

Ovi podaci se koriste u okviru aplikacije za prijavu, registraciju i zadržavanje statusa korisnika.

## Napomena

Projekat je izrađen kao seminarski rad iz predmeta Klijentske veb tehnologije i skriptni jezici. Za izradu projekta je korisecna pomoc sledećih AI modela: GPT-5.5
