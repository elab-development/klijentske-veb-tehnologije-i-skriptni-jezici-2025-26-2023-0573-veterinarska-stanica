import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Polje from "../components/Polje";
import Dugme from "../components/Dugme";
import "./Registracija.css";

export default function Registracija() {
  const { registruj } = useApp();
  const navigate = useNavigate();

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

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      form.ime.trim() === "" ||
      form.prezime.trim() === "" ||
      form.telefon.trim() === "" ||
      form.email.trim() === "" ||
      form.lozinka.trim() === ""
    ) {
      alert("Popunite sva obavezna polja.");
      return;
    }

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

    const uspesnaRegistracija = registruj(
      {
        ime: form.ime,
        prezime: form.prezime,
        telefon: form.telefon,
        adresa: form.adresa,
        email: form.email,
      },
      form.lozinka,
    );

    if (uspesnaRegistracija) {
      alert("Uspešno ste se registrovali.");
      navigate("/zakazivanje");
    }
  };

  return (
    <div className="page-wrapper">
      <main className="main">
        <h1 className="page-title">REGISTRACIJA KORISNIKA</h1>

        <p className="page-subtitle">Molimo popunite sva obavezna polja (*)</p>

        <section className="card">
          <h2 className="section-title">-- LIČNI PODACI --</h2>

          <div className="row-2">
            <Polje
              label="Ime"
              value={form.ime}
              onChange={(val) => update("ime", val)}
              placeholder="Unesite ime"
              required
            />

            <Polje
              label="Prezime"
              value={form.prezime}
              onChange={(val) => update("prezime", val)}
              placeholder="Unesite prezime"
              required
            />
          </div>

          <Polje
            label="Broj telefona"
            value={form.telefon}
            onChange={(val) => update("telefon", val)}
            type="tel"
            placeholder="+381 6x xxxxxxx"
            required
          />

          <Polje
            label="Adresa"
            value={form.adresa}
            onChange={(val) => update("adresa", val)}
            placeholder="Ulica i broj, grad"
          />
        </section>

        <section className="card">
          <h2 className="section-title">-- PODACI ZA NALOG --</h2>

          <Polje
            label="Email adresa"
            value={form.email}
            onChange={(val) => update("email", val)}
            type="email"
            placeholder="korisnik@email.com"
            required
          />

          <div className="row-2">
            <Polje
              label="Lozinka"
              value={form.lozinka}
              onChange={(val) => update("lozinka", val)}
              type="password"
              placeholder="••••••••"
              required
            />

            <Polje
              label="Potvrdi lozinku"
              value={form.potvrdiLozinku}
              onChange={(val) => update("potvrdiLozinku", val)}
              type="password"
              placeholder="••••••••"
              required
            />
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

        <Dugme tekst="REGISTRUJ SE" tip="primarno" onClick={handleSubmit} />

        <p className="login-link">
          Već imate nalog? <Link to="/prijava">Prijavite se ovde</Link>
        </p>
      </main>
    </div>
  );
}
