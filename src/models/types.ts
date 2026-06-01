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

export class TerminManager {
  private termini: Termin[];

  constructor(termini: Termin[]) {
    this.termini = termini;
  }

  getTermini(): Termin[] {
    return this.termini;
  }

  otkaziTermin(id: number): Termin[] {
    this.termini = this.termini.filter((t) => t.id !== id);
    return this.termini;
  }

  dodajTermin(termin: Omit<Termin, "id">): Termin {
    const novi: Termin = { ...termin, id: Date.now() };
    this.termini.push(novi);
    return novi;
  }

  getAktivneTermine(): Termin[] {
    return this.termini.filter((t) => t.status !== "Otkazano");
  }
}
