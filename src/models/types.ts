export interface Korisnik {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  adresa: string;
}

export interface Ljubimac {
  id: number;
  ime: string;
  vrsta: string;
  rasa: string;
  starost: number;
  slika?: string;
}

export interface Usluga {
  id: number;
  naziv: string;
  opis: string;
  cena: number;
  kategorija: string;
  vrsteLjubimaca: string[];
  ocena: number;
  brojRecenzija: number;
  slika: string;
}

export interface KorakUsluge {
  naslov: string;
  opis: string;
}

export interface UslugaPrikaz {
  id: number;
  naziv: string;
  opis: string;
  kategorija: string;
  vrste: string[];
  cena: number;
  ocene: number;
  brojOcena: number;
  slika: string;
  opisDetaljno?: string[];
  ukljucuje?: string[];
  koraci?: KorakUsluge[];
}

export interface FilterUslugaOpcije {
  search: string;
  kategorija: string;
  vrsteFilter: string[];
  minCena: number;
  maxCena: number;
  sort: string;
}

export interface Termin {
  id: number;
  datum: string;
  usluga: string;
  ljubimac: string;
  status: "Potvrdjeno" | "Na čekanju" | "Otkazano";
}

export interface Rezencija {
  autor: string;
  ocena: number;
  komentar: string;
  datum: string;
}

export interface ITerminManager {
  getTermini(): Termin[];
  dodajTermin(termin: Omit<Termin, "id">): Termin[];
  otkaziTermin(id: number): Termin[];
  getAktivneTermine(): Termin[];
}

export interface IUslugaManager {
  filtrirajUsluge(opcije: FilterUslugaOpcije): UslugaPrikaz[];
  pronadjiPoId(id: number): UslugaPrikaz | undefined;
  izracunajBrojPoKategoriji(kategorija: string): number;
}

export class TerminManager implements ITerminManager {
  private termini: Termin[];

  constructor(termini: Termin[]) {
    this.termini = [...termini];
  }

  getTermini(): Termin[] {
    return this.termini;
  }

  dodajTermin(termin: Omit<Termin, "id">): Termin[] {
    const noviTermin: Termin = {
      ...termin,
      id: Date.now(),
    };

    return [...this.termini, noviTermin];
  }

  otkaziTermin(id: number): Termin[] {
    return this.termini.filter((termin) => termin.id !== id);
  }

  getAktivneTermine(): Termin[] {
    return this.termini.filter((termin) => termin.status !== "Otkazano");
  }
}

export class UslugaManager implements IUslugaManager {
  private usluge: UslugaPrikaz[];

  constructor(usluge: UslugaPrikaz[]) {
    this.usluge = [...usluge];
  }

  filtrirajUsluge(opcije: FilterUslugaOpcije): UslugaPrikaz[] {
    const { search, kategorija, vrsteFilter, minCena, maxCena, sort } = opcije;

    let filtriraneUsluge = this.usluge.filter((usluga) => {
      const odgovaraPretrazi =
        search.trim() === "" ||
        usluga.naziv.toLowerCase().includes(search.toLowerCase());

      const odgovaraKategoriji =
        kategorija === "" || usluga.kategorija === kategorija;

      const odgovaraVrsti =
        vrsteFilter.length === 0 ||
        vrsteFilter.some((vrsta) => usluga.vrste.includes(vrsta));

      const odgovaraCeni = usluga.cena >= minCena && usluga.cena <= maxCena;

      return (
        odgovaraPretrazi && odgovaraKategoriji && odgovaraVrsti && odgovaraCeni
      );
    });

    filtriraneUsluge = [...filtriraneUsluge].sort((a, b) => {
      if (sort === "popularnost") {
        return b.brojOcena - a.brojOcena;
      }

      if (sort === "cena_asc") {
        return a.cena - b.cena;
      }

      if (sort === "cena_desc") {
        return b.cena - a.cena;
      }

      if (sort === "ocena") {
        return b.ocene - a.ocene;
      }

      return 0;
    });

    return filtriraneUsluge;
  }

  pronadjiPoId(id: number): UslugaPrikaz | undefined {
    return this.usluge.find((usluga) => usluga.id === id);
  }

  izracunajBrojPoKategoriji(kategorija: string): number {
    return this.usluge.filter((usluga) =>
      kategorija ? usluga.kategorija === kategorija : true,
    ).length;
  }
}
