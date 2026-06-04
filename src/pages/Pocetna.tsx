import { useState } from "react";
import "./Pocetna.css";

const usluge = [
  {
    id: 1,
    naziv: "Pregled i dijagnoza",
    opis: "Opšti pregled zdravstvenog stanja vašeg ljubimca.",
    cena: "od 1500 din",
    slika: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
  },
  {
    id: 2,
    naziv: "Vakcinacija",
    opis: "Zaštita ljubimca od zaraznih bolesti.",
    cena: "od 2000 din",
    slika: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  {
    id: 3,
    naziv: "Hirurgija",
    opis: "Operativni zahvati u sterilnim uslovima.",
    cena: "od 8000 din",
    slika: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  },
];

const recenzije = [
  { ime: "Marko P.", ocena: 5, tekst: "Odlična usluga, preporučujem svima!" },
  { ime: "Ana S.", ocena: 4, tekst: "Ljubazno osoblje, brzo zakazivanje." },
  { ime: "Jovana M.", ocena: 5, tekst: "Moj pas se oseća kao kod kuće!" },
];

const vrsjeUsluga = [
  "Pregled i dijagnoza",
  "Vakcinacija",
  "Hirurgija",
  "Stomatologija",
  "Dermatologija",
];

export default function Pocetna() {
  const [forma, setForma] = useState({ ime: "", usluga: "", datum: "" });

  const updateForma = (field: string, value: string) =>
    setForma((prev) => ({ ...prev, [field]: value }));

  const handleZakazivanje = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!forma.ime || !forma.usluga || !forma.datum) {
      alert("Molimo popunite sva polja.");
      return;
    }
    alert(`Termin zakazan za ${forma.ime} — ${forma.usluga} — ${forma.datum}`);
  };

  return (
    <div className="page-wrapper">
      
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-text">STS VET</span>
          <span className="logo-sub">vet</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="nav-active">Početna</a></li>
          <li><a href="/usluge">Usluge</a></li>
          <li><a href="/kontakt">Kontakt</a></li>
          <li><a href="/prijava" className="nav-btn">Prijava</a></li>
        </ul>
      </nav>

      
      <section className="hero">
        <div className="hero-overlay" />
        <img
          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1400&q=80"
          alt="Veterinar"
          className="hero-img"
        />
        <div className="hero-content">
          <h1>Dobro došli u Veterinarsku Ambulantu!</h1>
          <p>Zajedno brinemo o vašim ljubimcima.</p>
          <div className="hero-btns">
            <a href="/zakazivanje" className="btn-primary">ZAKAŽI TERMIN</a>
            <a href="/usluge" className="btn-outline">POGLEDAJ USLUGE</a>
          </div>
        </div>
      </section>

      
      <section className="features">
        {[
          { icon: "🩺", naziv: "Iskusni veterinari", opis: "Više od 10 god. iskustva" },
          { icon: "🔬", naziv: "Moderna oprema", opis: "Najnovija tehnologija" },
          { icon: "⚡", naziv: "Hitne intervencije", opis: "Dostupni 24/7" },
          { icon: "💰", naziv: "Povoljne cene", opis: "Transparentni cenovnik" },
        ].map((f) => (
          <div className="feature-item" key={f.naziv}>
            <span className="feature-icon">{f.icon}</span>
            <strong>{f.naziv}</strong>
            <span>{f.opis}</span>
          </div>
        ))}
      </section>

      
      <section className="section">
        <h2 className="section-heading">-- POPULARNE USLUGE --</h2>
        <div className="usluge-grid">
          {usluge.map((u) => (
            <div className="usluga-card" key={u.id}>
              <img src={u.slika} alt={u.naziv} className="usluga-img" />
              <div className="usluga-body">
                <h3>{u.naziv}</h3>
                <p>{u.opis}</p>
                <div className="usluga-footer">
                  <span className="usluga-cena">{u.cena}</span>
                  <a href={`/usluga/${u.id}`} className="btn-info">Više info</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center-btn">
          <a href="/usluge" className="btn-outline-purple">POGLEDAJ SVE USLUGE</a>
        </div>
      </section>

      
      <section className="section two-col">
        
        <div className="booking-col">
          <h2 className="section-heading">-- ZAKAŽI TERMIN BRZO --</h2>
          <div className="booking-card">
            <div className="field">
              <label>Ime i prezime:</label>
              <input
                type="text"
                placeholder="Unesite ime..."
                value={forma.ime}
                onChange={(e) => updateForma("ime", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Vrsta usluge:</label>
              <select
                value={forma.usluga}
                onChange={(e) => updateForma("usluga", e.target.value)}
              >
                <option value="">Izaberite uslugu ▼</option>
                {vrsjeUsluga.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Datum:</label>
              <input
                type="date"
                value={forma.datum}
                onChange={(e) => updateForma("datum", e.target.value)}
              />
            </div>
            <button className="btn-zakazi" onClick={handleZakazivanje}>
              ZAKAŽI
            </button>
          </div>
        </div>

        
        <div className="reviews-col">
          <h2 className="section-heading">-- RECENZIJE KORISNIKA --</h2>
          <div className="reviews-list">
            {recenzije.map((r) => (
              <div className="review-card" key={r.ime}>
                <div className="review-header">
                  <strong>{r.ime}</strong>
                  <span className="stars">{"★".repeat(r.ocena)}{"☆".repeat(5 - r.ocena)}</span>
                </div>
                <p>"{r.tekst}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}