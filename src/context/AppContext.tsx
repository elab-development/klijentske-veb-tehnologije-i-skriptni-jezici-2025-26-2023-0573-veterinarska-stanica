import { createContext } from "react";
import type { Korisnik, Ljubimac, Termin } from "../models/types";

interface AppContextType {
  korisnik: Korisnik | null;
  jeUlogovan: boolean;
  ljubimci: Ljubimac[];
  termini: Termin[];
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
