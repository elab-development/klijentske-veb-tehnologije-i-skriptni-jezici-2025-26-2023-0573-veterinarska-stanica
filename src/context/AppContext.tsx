import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { Korisnik, Ljubimac, Termin } from "../models/types";

interface SacuvaniNalog {
  korisnik: Korisnik;
  lozinka: string;
}

interface AppContextType {
  korisnik: Korisnik | null;
  jeUlogovan: boolean;
  ljubimci: Ljubimac[];
  termini: Termin[];

  prijavi: (email: string, lozinka: string) => boolean;
  registruj: (korisnik: Korisnik, lozinka: string) => boolean;
  odjavi: () => void;

  azurirajKorisnika: (k: Korisnik) => void;
  dodajLjubimca: (l: Omit<Ljubimac, "id">) => void;
  otkaziTermin: (id: number) => void;
  dodajTermin: (t: Omit<Termin, "id">) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const testKorisnik: Korisnik = {
  ime: "Sara",
  prezime: "Ječmenica",
  email: "test@mail.com",
  telefon: "+381 64 1234567",
  adresa: "Cara Dušana 12, Pančevo",
};

const pocetniLjubimci: Ljubimac[] = [
  {
    id: 1,
    ime: "Reks",
    vrsta: "Pas",
    rasa: "Labrador",
    starost: 4,
  },
  {
    id: 2,
    ime: "Maza",
    vrsta: "Mačka",
    rasa: "Persijska",
    starost: 2,
  },
];

const pocetniTermini: Termin[] = [
  {
    id: 1,
    datum: "5.12.2026.",
    usluga: "Redovni pregled",
    ljubimac: "Reks",
    status: "Potvrdjeno",
  },
  {
    id: 2,
    datum: "22.01.2027.",
    usluga: "Vakcinacija",
    ljubimac: "Maza",
    status: "Na čekanju",
  },
];

function ucitajNalog(): SacuvaniNalog | null {
  const sacuvaniNalog = localStorage.getItem("registrovaniNalog");

  if (!sacuvaniNalog) {
    return null;
  }

  try {
    return JSON.parse(sacuvaniNalog) as SacuvaniNalog;
  } catch {
    localStorage.removeItem("registrovaniNalog");
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const sacuvaniNalog = ucitajNalog();

  const [korisnik, setKorisnik] = useState<Korisnik | null>(
    sacuvaniNalog?.korisnik ?? null,
  );

  const [jeUlogovan, setJeUlogovan] = useState(
    localStorage.getItem("jeUlogovan") === "true",
  );

  const [ljubimci, setLjubimci] = useState<Ljubimac[]>(pocetniLjubimci);

  const [termini, setTermini] = useState<Termin[]>(pocetniTermini);

  const prijavi = (email: string, lozinka: string): boolean => {
    const nalog = ucitajNalog();

    if (nalog && nalog.korisnik.email === email && nalog.lozinka === lozinka) {
      setKorisnik(nalog.korisnik);
      setJeUlogovan(true);
      localStorage.setItem("jeUlogovan", "true");

      return true;
    }

    if (email === "test@mail.com" && lozinka === "sifra123") {
      setKorisnik(testKorisnik);
      setJeUlogovan(true);
      localStorage.setItem("jeUlogovan", "true");

      return true;
    }

    return false;
  };

  const registruj = (noviKorisnik: Korisnik, lozinka: string): boolean => {
    const noviNalog: SacuvaniNalog = {
      korisnik: noviKorisnik,
      lozinka,
    };

    localStorage.setItem("registrovaniNalog", JSON.stringify(noviNalog));

    localStorage.setItem("jeUlogovan", "true");

    setKorisnik(noviKorisnik);
    setJeUlogovan(true);

    return true;
  };

  const odjavi = () => {
    setJeUlogovan(false);
    localStorage.removeItem("jeUlogovan");
  };

  const azurirajKorisnika = (k: Korisnik) => {
    setKorisnik(k);

    const nalog = ucitajNalog();

    if (nalog) {
      const azuriraniNalog: SacuvaniNalog = {
        korisnik: k,
        lozinka: nalog.lozinka,
      };

      localStorage.setItem("registrovaniNalog", JSON.stringify(azuriraniNalog));
    }
  };

  const dodajLjubimca = (l: Omit<Ljubimac, "id">) => {
    const noviLjubimac: Ljubimac = {
      ...l,
      id: Date.now(),
    };

    setLjubimci((prev) => [...prev, noviLjubimac]);
  };

  const otkaziTermin = (id: number) => {
    setTermini((prev) => prev.filter((termin) => termin.id !== id));
  };

  const dodajTermin = (t: Omit<Termin, "id">) => {
    const noviTermin: Termin = {
      ...t,
      id: Date.now(),
    };

    setTermini((prev) => [...prev, noviTermin]);
  };

  return (
    <AppContext.Provider
      value={{
        korisnik,
        jeUlogovan,
        ljubimci,
        termini,
        prijavi,
        registruj,
        odjavi,
        azurirajKorisnika,
        dodajLjubimca,
        otkaziTermin,
        dodajTermin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useApp mora biti korišćen unutar AppProvider komponente.");
  }

  return ctx;
}
