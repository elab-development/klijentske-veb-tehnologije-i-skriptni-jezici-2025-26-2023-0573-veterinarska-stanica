# Veterinarska ambulanta

Aplikacija za veterinarsku ambulantu napravljena u okviru projekta iz predmeta **Klijentske veb tehnologije i skriptni jezici**.

Aplikacija omogućava prikaz osnovnih stranica veterinarske stanice, rad sa korisnikom, ljubimcima, uslugama i zakazivanjem veterinarskih termina.

## Tehnologije

Projekat je rađen korišćenjem sledećih tehnologija:

- React
- TypeScript
- Vite
- React Router DOM
- CSS

## Pokretanje projekta

Pre pokretanja potrebno je instalirati sve zavisnosti:

```bash
npm install
```

Nakon toga se aplikacija pokreće komandom:

```bash
npm run dev
```

Aplikacija se zatim otvara u browseru na adresi koju prikaže terminal, najčešće:

```txt
http://localhost:5173/
```

## Instalacija React Router-a

Ako `react-router-dom` nije instaliran, instalira se komandom:

```bash
npm install react-router-dom
```

## Struktura projekta

Osnovna struktura projekta:

```txt
src/
├── components/
├── context/
│   └── AppContext.tsx
├── models/
│   └── types.ts
├── pages/
│   ├── Zakazivanje.tsx
│   └── Zakazivanje.css
├── App.tsx
├── App.css
└── main.tsx
```

## Opis važnih delova

### `src/models/types.ts`

U ovom fajlu se nalaze TypeScript interfejsi koji definišu strukturu podataka u aplikaciji.

Primeri modela:

- `Korisnik` — podaci o korisniku
- `Ljubimac` — podaci o ljubimcu
- `Usluga` — podaci o veterinarskoj usluzi
- `Termin` — podaci o zakazanom terminu
- `Recenzija` — podaci o recenziji korisnika

Ovi tipovi omogućavaju da TypeScript proverava da li se podaci koriste ispravno kroz aplikaciju.

### `src/context/AppContext.tsx`

Ovaj fajl služi za globalno stanje aplikacije.

U njemu se pravi:

- `AppContext` — zajednički prostor za podatke aplikacije
- `AppProvider` — komponenta koja obavija aplikaciju i daje joj podatke
- `useApp` — pomoćna funkcija preko koje druge komponente koriste podatke iz konteksta

Podaci se čuvaju pomoću `useState`, jer mogu da se menjaju tokom rada aplikacije.

U kontekstu se trenutno čuvaju:

- korisnik
- informacija da li je korisnik ulogovan
- lista ljubimaca
- lista termina

Takođe postoje funkcije za:

- prijavu korisnika
- odjavu korisnika
- ažuriranje korisnika
- dodavanje ljubimca
- dodavanje termina
- otkazivanje termina

### `src/pages/Zakazivanje.tsx`

Stranica za zakazivanje veterinarskog termina.

Trenutno sadrži osnovni raspored stranice:

- zaglavlje stranice
- deo za izbor usluge
- deo za izbor ljubimca
- deo za izbor datuma i vremena
- panel za pregled termina

Ova stranica predstavlja osnovu na koju se kasnije dodaje funkcionalnost za izbor usluge, ljubimca i potvrdu termina.

### `src/App.tsx`

Glavna komponenta aplikacije.

U ovom fajlu se podešava koje stranice se prikazuju korisniku. Ako se koristi `react-router-dom`, ovde se definišu rute aplikacije.

Primer rute za stranicu zakazivanja:

```tsx
<Route path="/zakazivanje" element={<Zakazivanje />} />
```

To znači da se stranica `Zakazivanje` prikazuje kada korisnik ode na adresu:

```txt
http://localhost:5173/zakazivanje
```

## Dostupne stranice

Trenutno je dodata stranica:

```txt
/zakazivanje
```

Stranica prikazuje osnovni izgled forme za zakazivanje veterinarskog termina.

## Test korisnik

Za prijavu u aplikaciju koristi se test nalog:

```txt
Email: test@mail.com
Lozinka: sifra123
```

## Napomene za razvoj

Tok rada na projektu:

1. Prvo se pravi osnovna struktura projekta.
2. Zatim se dodaju modeli u `types.ts`.
3. Nakon toga se pravi `AppContext.tsx` za globalno stanje.
4. Zatim se dodaju stranice i komponente.
5. Na kraju se povezuju stranice preko `App.tsx` i ruta.

Kod je podeljen na manje celine kako bi bio pregledniji i lakši za razumevanje.

## Autor

Projekat je napravljen za potrebe fakultetskog projekta iz predmeta Klijentske veb tehnologije i skriptni jezici.

---

## Napomena o izradi

Ovaj README fajl je generisan uz pomoć ChatGPT-a, na osnovu opisa projekta i strukture aplikacije.
