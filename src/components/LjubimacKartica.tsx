import { useState, useEffect } from "react";
import type { Ljubimac } from "../models/types";
import Dugme from "./Dugme";
import "./LjubimacKartica.css";

interface Props {
  ljubimac: Ljubimac;
}

// Mapiranje rase na dog.ceo API naziv rase
function rasaNaApiNaziv(rasa: string): string {
  const mapa: Record<string, string> = {
    labrador: "labrador",
    "labrador retriver": "labrador",
    "labrador retriever": "labrador",
    "golden retriver": "retriever/golden",
    "golden retriever": "retriever/golden",
    "nemački ovčar": "germanshepherd",
    "nemacki ovcar": "germanshepherd",
    pudla: "poodle",
    pudlica: "poodle",
    buldog: "bulldog/english",
    dalmatinac: "dalmatian",
    husky: "husky",
    "siberian husky": "husky",
    buldžija: "bulldog/french",
    "francuski buldog": "bulldog/french",
    boks: "boxer",
    bokser: "boxer",
    doberman: "doberman",
    rotvajler: "rottweiler",
    rottweiler: "rottweiler",
    čivava: "chihuahua",
    chihuahua: "chihuahua",
    beagle: "beagle",
    šnaucer: "schnauzer/giant",
    "border koli": "collie/border",
    "border collie": "collie/border",
    dalmatian: "dalmatian",
    corgi: "corgi/cardigan",
    "shar pei": "sharpei",
    akita: "akita",
    basenji: "basenji",
    maltez: "maltese",
    maltese: "maltese",
    šihtzu: "shihtzu",
    "shih tzu": "shihtzu",
    yorkshire: "yorkshire",
    "yorkshire terrier": "yorkshire",
  };
  const kljuc = rasa.toLowerCase().trim();
  return mapa[kljuc] || "labrador"; // default labrador ako rasa nije poznata
}

export default function LjubimacKartica({ ljubimac }: Props) {
  const [slika, setSlika] = useState<string>("");
  const [ucitava, setUcitava] = useState(false);
  const [greska, setGreska] = useState(false);

  useEffect(() => {
    if (ljubimac.vrsta.toLowerCase() !== "pas") return;

    const apiRasa = rasaNaApiNaziv(ljubimac.rasa);
    setUcitava(true);
    setGreska(false);

    fetch(`https://dog.ceo/api/breed/${apiRasa}/images/random`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSlika(data.message);
        } else {
          setGreska(true);
        }
      })
      .catch(() => setGreska(true))
      .finally(() => setUcitava(false));
  }, [ljubimac.id, ljubimac.rasa, ljubimac.vrsta]);

  return (
    <div className="ljubimac-kartica">
      <div className="ljubimac-slika-box">
        {ljubimac.vrsta.toLowerCase() === "pas" ? (
          ucitava ? (
            <div className="slika-loader">⏳</div>
          ) : greska || !slika ? (
            <div className="slika-fallback">🐶</div>
          ) : (
            <img src={slika} alt={ljubimac.ime} className="ljubimac-foto" />
          )
        ) : (
          <div className="slika-fallback">
            {ljubimac.vrsta === "Mačka" ? "🐱" : "🐾"}
          </div>
        )}
      </div>
      <h3>{ljubimac.ime}</h3>
      <span className="tag-l">{ljubimac.vrsta}</span>
      {ljubimac.rasa && <span className="tag-l">{ljubimac.rasa}</span>}
      <p>Starost: {ljubimac.starost} god.</p>
      {ljubimac.vrsta.toLowerCase() === "pas" && !greska && slika && (
        <small className="api-info">📸 Slika rase: dog.ceo API</small>
      )}
      <Dugme tekst="Detalji" tip="primarno" />
    </div>
  );
}
