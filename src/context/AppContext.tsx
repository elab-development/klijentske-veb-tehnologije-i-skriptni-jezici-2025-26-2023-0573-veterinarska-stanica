import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { Korisnik, Ljubimac, Termin } from "../models/types";

interface AppContextType {
  korisnik: Korisnik | null;
  jeUlogovan: boolean;
  ljubimci: Ljubimac[];
  termini: Termin[];
  prijavi: (email: string, lozinka: string) => boolean;
  odjavi: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const pocetniLjubimci: Ljubimac[] = [
  { id: 1, ime: "Reks", vrsta: "Pas", rasa: "Labrador", starost: 4 },
  { id: 1, ime: "Maza", vrsta: "Mačka", rasa: "Persijska", starost: 2 },
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [korisnik, setKorisnik] = useState<Korisnik | null>({
    ime: "Sara",
    prezime: "Ječmenica",
    email: "sara@email.com",
    telefon: "+381 64 1234567",
    adresa: "Cara Dušana 12, Pančevo",
  });

  const [jeUlogovan, setJeUlogovan] = useState(false);
  const [ljubimci, setLjubimci] = useState<Ljubimac[]>(pocetniLjubimci);
  const [termini, setTermini] = useState<Termin[]>(pocetniTermini);

  const prijavi = (email: string, lozinka: string): boolean => {
    if (email === "test@mail.com" && lozinka === "sifra123") {
      setJeUlogovan(true);
      return true;
    }
    return false;
  };

  const odjavi = () => setJeUlogovan(false);

  return (
    <AppContext.Provider
      value={{ korisnik, jeUlogovan, ljubimci, termini, prijavi, odjavi }}
    >
      {children}
    </AppContext.Provider>
  );
}
