import { useState } from "react";
import "./Zakazivanje.css";

const USLUGE_LISTA = [
  { naziv: "Opšti pregled i dijagnoza", cena: "1.500 din" },
  { naziv: "Vakcinacija", cena: "2.000 din" },
  { naziv: "Sterilizacija / Kastracija", cena: "6.000 din" },
  { naziv: "Rendgen snimanje", cena: "3.500 din" },
  { naziv: "Ultrazvuk", cena: "4.000 din" },
];

const TEST_LJUBIMCI = [
  { id: 1, ime: "Reks", vrsta: "Pas", rasa: "Labrador", starost: 4 },
  { id: 2, ime: "Maza", vrsta: "Mačka", rasa: "Persijska", starost: 2 },
];

export default function Zakazivanje() {
  const [izabranaUsluga, setIzabranaUsluga] = useState("");
  const [izabranLjubimac, setIzabranLjubimac] = useState<number | null>(null);

  const ljubimacObj = TEST_LJUBIMCI.find((l) => l.id === izabranLjubimac);

  return (
    <div className="zakazivanje-stranica">
      <div className="zakazivanje-header">
        <h1>Zakazivanje veterinarskog termina</h1>
        <p>Pratite korake da biste zakazali termin za vašeg ljubimca.</p>
      </div>

      <div className="zakazivanje-layout">
        <div className="zakazivanje-forma">
          <div className="forma-sekcija">
            <h3>-- KORAK 1: IZBOR USLUGE --</h3>
            {USLUGE_LISTA.map((u) => (
              <label
                key={u.naziv}
                className={`usluga-opcija ${izabranaUsluga === u.naziv ? "izabrana" : ""}`}
              >
                <input
                  type="radio"
                  name="usluga"
                  value={u.naziv}
                  checked={izabranaUsluga === u.naziv}
                  onChange={() => setIzabranaUsluga(u.naziv)}
                />
                <span>{u.naziv}</span>
                <span className="usluga-cena">od {u.cena}</span>
              </label>
            ))}
          </div>

          <div className="forma-sekcija">
            <h3>-- KORAK 1B: IZBOR LJUBIMCA --</h3>
            <div className="ljubimci-red">
              {TEST_LJUBIMCI.map((l) => (
                <div
                  key={l.id}
                  className={`ljubimac-opcija ${izabranLjubimac === l.id ? "izabran" : ""}`}
                  onClick={() => setIzabranLjubimac(l.id)}
                >
                  <div className="lj-slika">
                    {l.vrsta === "Pas" ? "🐶" : "🐱"}
                  </div>
                  <strong>{l.ime}</strong>
                  <span className="tag-l">{l.vrsta}</span>
                  <p>
                    {l.rasa}, {l.starost} god.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="forma-sekcija">
            <h3>-- KORAK 2: DATUM I VREME --</h3>
            <p>Ovde ce biti kalendar...</p>
          </div>
        </div>

        <div className="pregled-panel">
          <h3>-- PREGLED TERMINA --</h3>
          <div className="pregled-red">
            <small>Izabrana usluga:</small>
            <strong>{izabranaUsluga || "—"}</strong>
          </div>
          <div className="pregled-red">
            <small>Ljubimac:</small>
            <strong>
              {ljubimacObj ? `${ljubimacObj.ime} (${ljubimacObj.rasa})` : "—"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
