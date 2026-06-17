import { useState, useEffect } from "react";
import type { Ljubimac } from "../models/types";
import Dugme from "./Dugme";
import "./LjubimacKartica.css";

interface Props {
  ljubimac: Ljubimac;
}

export default function LjubimacKartica({ ljubimac }: Props) {
  const [slika, setSlika] = useState<string>("");
  const [ucitava, setUcitava] = useState(false);
  const [greska, setGreska] = useState(false);

  useEffect(() => {
    if (ljubimac.vrsta.toLowerCase() !== "pas") return;
    setUcitava(true);
    setGreska(false);

    fetch("https://dog.ceo/api/breeds/image/random")
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
