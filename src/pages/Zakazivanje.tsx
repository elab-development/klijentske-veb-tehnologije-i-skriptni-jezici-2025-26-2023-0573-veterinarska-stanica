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

const SLOBODNI_TERMINI = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];
const ZAUZETI = ["09:00", "11:00", "14:00"];

export default function Zakazivanje() {
  const [izabranaUsluga, setIzabranaUsluga] = useState("");
  const [izabranLjubimac, setIzabranLjubimac] = useState<number | null>(null);
  const [izabranDan, setIzabranDan] = useState<number | null>(null);
  const [izabranoVreme, setIzabranoVreme] = useState("");
  const [napomena, setNapomena] = useState("");
  const [potvrdjeno, setPotvrdjeno] = useState(false);

  const ljubimacObj = TEST_LJUBIMCI.find((l) => l.id === izabranLjubimac);
  const uslugaObj = USLUGE_LISTA.find((u) => u.naziv === izabranaUsluga);
  const mozePotvrditi =
    izabranaUsluga !== "" &&
    izabranLjubimac !== null &&
    izabranDan !== null &&
    izabranoVreme !== "";

  const prviDan = 2;
  const daniUMesecu = 31;

  if (potvrdjeno) {
    return (
      <div className="zakazivanje-stranica">
        <div className="uspeh-box">
          <div className="uspeh-ikona">✅</div>
          <h2>Termin uspešno zakazan!</h2>
          <p>Poslaćemo vam potvrdu na email adresu.</p>
          <button className="nazad-btn" onClick={() => setPotvrdjeno(false)}>
            Zakaži novi termin
          </button>
        </div>
      </div>
    );
  }

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
            <div className="napomena-polje">
              <label>Napomena (simptomi, posebni zahtevi):</label>
              <textarea
                placeholder="Unesite napomenu za veterinara..."
                value={napomena}
                onChange={(e) => setNapomena(e.target.value)}
              />
            </div>
          </div>

          <div className="forma-sekcija">
            <h3>-- KORAK 2: DATUM I VREME --</h3>
            <div className="kalendar-layout">
              <div>
                <div className="kalendar-header">Maj 2026</div>
                <div className="kalendar-grid">
                  {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map(
                    (d) => (
                      <div key={d} className="dan-naziv">
                        {d}
                      </div>
                    ),
                  )}
                  {Array.from({ length: prviDan }).map((_, i) => (
                    <div key={`p${i}`} />
                  ))}
                  {Array.from({ length: daniUMesecu }, (_, i) => i + 1).map(
                    (d) => (
                      <div
                        key={d}
                        className={`dan ${izabranDan === d ? "izabran-dan" : ""} ${d === 8 ? "danas" : ""}`}
                        onClick={() => setIzabranDan(d)}
                      >
                        {d}
                      </div>
                    ),
                  )}
                </div>
                <div className="legenda">
                  <span className="leg-izabran"></span>Izabran
                  <span className="leg-zauzet"></span>Zauzeto
                  <span className="leg-danas"></span>Danas
                </div>
              </div>

              {izabranDan && (
                <div className="termini-lista">
                  <h4>
                    Slobodni termini — {izabranDan < 10 ? "0" : ""}
                    {izabranDan}. maj:
                  </h4>
                  <div className="termini-grid">
                    {SLOBODNI_TERMINI.map((t) => (
                      <button
                        key={t}
                        className={`termin-btn ${ZAUZETI.includes(t) ? "zauzet" : ""} ${izabranoVreme === t ? "izabrano-v" : ""}`}
                        disabled={ZAUZETI.includes(t)}
                        onClick={() => setIzabranoVreme(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="forma-sekcija">
            <button
              className={`potvrdi-btn ${mozePotvrditi ? "" : "disabled"}`}
              disabled={!mozePotvrditi}
              onClick={() => setPotvrdjeno(true)}
            >
              POTVRDI TERMIN
            </button>
            {!mozePotvrditi && (
              <p className="upozorenje">
                Molimo izaberite uslugu, ljubimca, datum i vreme.
              </p>
            )}
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
          <div className="pregled-red">
            <small>Datum i vreme:</small>
            <strong>
              {izabranDan && izabranoVreme
                ? `${izabranDan}.01.2025. ${izabranoVreme}`
                : "—"}
            </strong>
          </div>
          <div className="pregled-red">
            <small>Procenjena cena:</small>
            <strong>{uslugaObj ? `od ${uslugaObj.cena}` : "—"}</strong>
          </div>
          <div className="napomene-box">
            <strong>ℹ Važne napomene:</strong>
            <p>• Molimo vas da stignete 5 min pre termina</p>
            <p>• Potvrditi ili otkazati termin možete najkasnije 2h pre</p>
            <p>• Potvrdni SMS će biti poslat na vaš broj</p>
          </div>
          <div className="kontakt-box">
            <strong>Pitanja?</strong>
            <p>📞 +381 13 123 456</p>
            <p>✉ info@vetsts.rs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
