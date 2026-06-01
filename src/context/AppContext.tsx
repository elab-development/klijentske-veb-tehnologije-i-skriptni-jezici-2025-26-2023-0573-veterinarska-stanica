import { createContext } from "react";
import type { Korisnik, Ljubimac, Termin } from "../models/types";

interface AppContextType {
  korisnik: Korisnik | null;
  jeUlogovan: boolean;
  ljubimci: Ljubimac[];
  termini: Termin[];
}

const AppContext = createContext<AppContextType | null>(null);
