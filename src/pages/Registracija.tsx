import { useState } from "react";
import "./Registracija.css";

export default function Registracija() {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    telefon: "",
    adresa: "",
    email: "",
    lozinka: "",
    potvrdiLozinku: "",
    imeLjubimca: "",
    vrsta: "",
    prihvataUslove: false,
    zeliObavjestenja: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.prihvataUslove) {
      alert("Morate prihvatiti uslove korišćenja.");
      return;
    }
    if (form.lozinka.length < 8) {
      alert("Lozinka mora imati najmanje 8 karaktera.");
      return;
    }
    if (form.lozinka !== form.potvrdiLozinku) {
      alert("Lozinke se ne podudaraju.");
      return;
    }
    console.log("Registracija:", form);
  };

  return (
    <div className="page-wrapper">
      <main className="main">
        <h1 className="page-title">REGISTRACIJA KORISNIKA</h1>
        <p className="page-subtitle">Molimo popunite sva obavezna polja (*)</p>

        <section className="card">
          <h2 className="section-title">-- LIČNI PODACI --</h2>

          <div className="row-2">
            <div className="field">
              <label>
                Ime: <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="Unesite ime"
                value={form.ime}
                onChange={(e) => update("ime", e.target.value)}
              />
            </div>
            <div className="field">
              <label>
                Prezime: <span className="req">*</span>
              </label>
              <input
                type="text"
                placeholder="Unesite prezime"
                value={form.prezime}
                onChange={(e) => update("prezime", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>
              Broj telefona: <span className="req">*</span>
            </label>
            <input
              type="tel"
              placeholder="+381 6x xxxxxxx"
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Adresa:</label>
            <input
              type="text"
              placeholder="Ulica i broj, grad"
              value={form.adresa}
              onChange={(e) => update("adresa", e.target.value)}
            />
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">-- PODACI ZA NALOG --</h2>

          <div className="field">
            <label>
              Email adresa: <span className="req">*</span>
            </label>
            <input
              type="email"
              placeholder="korisnik@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="row-2">
            <div className="field">
              <label>
                Lozinka: <span className="req">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.lozinka}
                onChange={(e) => update("lozinka", e.target.value)}
              />
            </div>
            <div className="field">
              <label>
                Potvrdi lozinku: <span className="req">*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.potvrdiLozinku}
                onChange={(e) => update("potvrdiLozinku", e.target.value)}
              />
            </div>
          </div>

          <p className="hint">Lozinka mora imati najmanje 8 karaktera</p>
        </section>

        <div className="checkboxes">
          <label className="check-label">
            <input
              type="checkbox"
              checked={form.prihvataUslove}
              onChange={(e) => update("prihvataUslove", e.target.checked)}
            />
            <span>
              Prihvatam <a href="#">uslove korišćenja</a> i{" "}
              <a href="#">politiku privatnosti</a>{" "}
              <span className="req">*</span>
            </span>
          </label>

          <label className="check-label">
            <input
              type="checkbox"
              checked={form.zeliObavjestenja}
              onChange={(e) => update("zeliObavjestenja", e.target.checked)}
            />
            <span>Želim da primam obaveštenja o akcijama i novostima</span>
          </label>
        </div>

        <button className="btn-register" onClick={handleSubmit}>
          REGISTRUJ SE
        </button>

        <p className="login-link">
          Već imate nalog? <a href="/prijava">Prijavite se ovde</a>
        </p>
      </main>
    </div>
  );
}
