import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Polje from "../components/Polje";
import Dugme from "../components/Dugme";
import LjubimacKartica from "../components/LjubimacKartica";
import "./Profil.css";

export default function Profil() {
  const {
    korisnik,
    jeUlogovan,
    ljubimci,
    termini,
    azurirajKorisnika,
    otkaziTermin,
    dodajLjubimca,
    odjavi,
  } = useApp();
  const navigate = useNavigate();
  const [imeEdit, setImeEdit] = useState(korisnik?.ime || "");
  const [prezEdit, setPrezEdit] = useState(korisnik?.prezime || "");
  const [emailEdit, setEmailEdit] = useState(korisnik?.email || "");
  const [telEdit, setTelEdit] = useState(korisnik?.telefon || "");
  const [adrEdit, setAdrEdit] = useState(korisnik?.adresa || "");
  const [aktivniTab, setAktivniTab] = useState("podaci");
  const [showDodajLjubimca, setShowDodajLjubimca] = useState(false);
  const [novIme, setNovIme] = useState("");
  const [novVrsta, setNovVrsta] = useState("");
  const [novRasa, setNovRasa] = useState("");
  const [novStarost, setNovStarost] = useState("");
  const [sacuvano, setSacuvano] = useState(false);

  if (!jeUlogovan) {
    return (
      <div className="nije-ulogovan">
        <h2>Morate biti prijavljeni</h2>
        <Dugme
          tekst="Idi na prijavu"
          tip="primarno"
          onClick={() => navigate("/prijava")}
        />
      </div>
    );
  }

  const sacuvajPodatke = () => {
    azurirajKorisnika({
      ime: imeEdit,
      prezime: prezEdit,
      email: emailEdit,
      telefon: telEdit,
      adresa: adrEdit,
    });
    setSacuvano(true);
    setTimeout(() => setSacuvano(false), 2000);
  };

  const handleDodajLjubimca = () => {
    if (!novIme || !novVrsta) return;
    dodajLjubimca({
      ime: novIme,
      vrsta: novVrsta,
      rasa: novRasa,
      starost: Number(novStarost) || 0,
    });
    setNovIme("");
    setNovVrsta("");
    setNovRasa("");
    setNovStarost("");
    setShowDodajLjubimca(false);
  };

  return (
    <div className="profil-stranica">
      <aside className="profil-sidebar">
        <div className="profil-avatar">👤</div>
        <div className="profil-ime">
          <br></br>
          {korisnik?.ime} {korisnik?.prezime}
        </div>
        <div className="profil-email">
          {korisnik?.email}
          <br></br>
        </div>
        {["podaci", "ljubimci", "termini", "istorija", "obavestenja"].map(
          (t) => (
            <button
              key={t}
              className={`sidebar-btn ${aktivniTab === t ? "aktivan" : ""}`}
              onClick={() => setAktivniTab(t)}
            >
              {
                {
                  podaci: "Moji podaci",
                  ljubimci: "Moji ljubimci",
                  termini: "Termini",
                  istorija: "Istorija poseta",
                  obavestenja: "Obaveštenja",
                }[t]
              }
            </button>
          ),
        )}
        <button
          className="sidebar-btn odjava-btn"
          onClick={() => {
            odjavi();
            navigate("/prijava");
          }}
        >
          Odjava
        </button>
      </aside>

      <main className="profil-sadrzaj">
        {aktivniTab === "podaci" && (
          <div className="sekcija-profil">
            <h2>-- LIČNI PODACI --</h2>
            <div className="dva-polja">
              <Polje label="Ime" value={imeEdit} onChange={setImeEdit} />
              <Polje label="Prezime" value={prezEdit} onChange={setPrezEdit} />
            </div>
            <div className="dva-polja">
              <Polje
                label="Email"
                value={emailEdit}
                onChange={setEmailEdit}
                type="email"
              />
              <Polje label="Telefon" value={telEdit} onChange={setTelEdit} />
            </div>
            <Polje label="Adresa" value={adrEdit} onChange={setAdrEdit} />
            {sacuvano && <p className="uspeh-poruka">✅ Podaci su sačuvani!</p>}
            <Dugme
              tekst="IZMENI PODATKE"
              tip="sekundarno"
              onClick={sacuvajPodatke}
            />
          </div>
        )}

        {aktivniTab === "ljubimci" && (
          <div className="sekcija-profil">
            
              <h2>-- MOJI LJUBIMCI --</h2>
              
            
            <div className="ljubimci-grid">
              {ljubimci.map((l) => (
                <LjubimacKartica key={l.id} ljubimac={l} />
              ))}
              <div
                className="ljubimac-kartica dodaj-kartica"
                onClick={() => setShowDodajLjubimca(true)}
              >
                <div className="plus-ikona">+</div>
                <p>Dodaj novog ljubimca</p>
              </div>
            </div>
            {showDodajLjubimca && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Dodaj ljubimca</h3>
                  <Polje
                    label="Ime"
                    value={novIme}
                    onChange={setNovIme}
                    placeholder="npr. Reks"
                    required
                  />
                  <Polje
                    label="Vrsta"
                    value={novVrsta}
                    onChange={setNovVrsta}
                    placeholder="Pas / Mačka / ..."
                    required
                  />
                  <Polje
                    label="Rasa"
                    value={novRasa}
                    onChange={setNovRasa}
                    placeholder="npr. Labrador"
                  />
                  <Polje
                    label="Starost (god)"
                    value={novStarost}
                    onChange={setNovStarost}
                    type="number"
                    placeholder="npr. 3"
                  />
                  <div className="modal-dugmad">
                    <Dugme
                      tekst="Dodaj"
                      tip="primarno"
                      onClick={handleDodajLjubimca}
                    />
                    <Dugme
                      tekst="Otkaži"
                      tip="opasnost"
                      onClick={() => setShowDodajLjubimca(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {aktivniTab === "termini" && (
          <div className="sekcija-profil">
            <h2>-- PREDSTOJEĆI TERMINI --</h2>
            <table className="termini-tabela">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Usluga</th>
                  <th>Ljubimac</th>
                  <th>Status</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
                {termini.map((t) => (
                  <tr key={t.id}>
                    <td>{t.datum}</td>
                    <td>{t.usluga}</td>
                    <td>{t.ljubimac}</td>
                    <td>
                      <span
                        className={`status-badge status-${t.status === "Potvrdjeno" ? "potvrdjeno" : "cekanje"}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="otkaziBtn"
                        onClick={() => otkaziTermin(t.id)}
                      >
                        Otkaži
                      </button>
                    </td>
                  </tr>
                ))}
                {termini.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "20px",
                      }}
                    >
                      Nema predstojecih termina
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ marginTop: "16px" }}>
              <Dugme
                tekst="+ Zakaži novi termin"
                tip="sekundarno"
                onClick={() => navigate("/zakazivanje")}
              />
            </div>
          </div>
        )}

        {(aktivniTab === "istorija" || aktivniTab === "obavestenja") && (
          <div className="sekcija-profil">
            <h2>
              {
                {
                  istorija: "-- ISTORIJA POSETA --",
                  obavestenja: "-- OBAVEŠTENJA --",
                }[aktivniTab]
              }
            </h2>
            <p style={{ color: "#888" }}>Ova sekcija je trenutno prazna.</p>
          </div>
        )}
      </main>
    </div>
  );
}
