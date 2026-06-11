import { useState } from "react";
import "./Kontakt.css";


interface FormData {
  ime: string;
  email: string;
  telefon: string;
  ljubimac: string;
  vrstaUpita: string;
  poruka: string;
}

const INITIAL_FORM: FormData = {
  ime: "",
  email: "",
  telefon: "",
  ljubimac: "",
  vrstaUpita: "",
  poruka: "",
};


const RADNO_VREME = [
  { dan: "Ponedeljak", sati: "09:00 – 17:00", otvoreno: true },
  { dan: "Utorak",     sati: "09:00 – 17:00", otvoreno: true },
  { dan: "Sreda",      sati: "09:00 – 17:00", otvoreno: true },
  { dan: "Četvrtak",   sati: "09:00 – 17:00", otvoreno: true },
  { dan: "Petak",      sati: "09:00 – 17:00", otvoreno: true },
  { dan: "Subota",     sati: "Zatvoreno",       otvoreno: false },
  { dan: "Nedelja",    sati: "Zatvoreno",       otvoreno: false },
];


function isCurrentlyOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
}


export default function Kontakt() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = isCurrentlyOpen();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.ime || !form.email || !form.poruka) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }, 900);
  };

  return (
    <div className="kontakt-page">

     
      <header className="kontakt-header">
        <h1>Kontaktirajte nas</h1>
        <p>
          Ispod možete pronaći sve kontakt informacije naše ambulante. Pozovite nas
          ili popunite obrazac i naš tim će Vam pomoći da pronađete pravi termin za
          Vašeg ljubimca.
        </p>
      </header>

      <div className="kontakt-body">

        
        <div className="kontakt-card">
          <div className="kontakt-card-title">-- Kontakt informacije --</div>
          <div className="kontakt-info-rows">

            <div className="kontakt-info-row">
              <div className="kontakt-icon">📍</div>
              <div>
                <div className="kontakt-info-label">Adresa</div>
                <div className="kontakt-info-value">
                  Bulevar Zoranа Đinđića 42<br />
                  11000 Beograd, Srbija
                </div>
              </div>
            </div>

            <div className="kontakt-info-row">
              <div className="kontakt-icon">📞</div>
              <div>
                <div className="kontakt-info-label">Telefon</div>
                <div className="kontakt-info-value">
                  <a href="tel:+381112345678">+381 11 234-5678</a>
                </div>
              </div>
            </div>

            <div className="kontakt-info-row">
              <div className="kontakt-icon">✉️</div>
              <div>
                <div className="kontakt-info-label">Email</div>
                <div className="kontakt-info-value">
                  <a href="mailto:info@stsvet.rs">info@stsvet.rs</a>
                </div>
              </div>
            </div>

            <div className="kontakt-info-row">
              <div className="kontakt-icon">🚨</div>
              <div>
                <div className="kontakt-info-label">Hitni slučajevi</div>
                <div className="kontakt-info-value">
                  <span className="emergency">
                    <a href="tel:+381641234567" style={{ color: "inherit" }}>
                      +381 64 123-4567
                    </a>
                  </span>
                  <br />
                  <span style={{ fontSize: 12, color: "#999" }}>
                    Dostupno 24h / 7 dana
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        
        <div className="kontakt-card">
          <div className="kontakt-card-title">
            -- Radno vreme --
            {open && <span className="radno-badge">Otvoreno sada</span>}
          </div>
          <div className="radno-vreme-grid">
            {RADNO_VREME.map((r) => (
              <div key={r.dan} className="radno-vreme-row">
                <span className="radno-dan">{r.dan}</span>
                <span className={`radno-sati${r.otvoreno ? "" : " zatvoreno"}`}>
                  {r.sati}
                </span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="kontakt-map-card">
          <div className="kontakt-map-header">
            <div className="kontakt-card-title">-- Pronađite nas --</div>
          </div>
         
          <iframe
            className="kontakt-map-frame"
            title="Lokacija STS Vet ambulante"
            src="https://www.openstreetmap.org/export/embed.html?bbox=20.4550%2C44.8070%2C20.4750%2C44.8180&layer=mapnik&marker=44.8125%2C20.4650"
            allowFullScreen
          />
        </div>

        
        <div className="kontakt-card kontakt-form-card">
          <div className="kontakt-card-title">-- Pošaljite nam poruku --</div>

          <div className="kontakt-form">

            <div className="form-group">
              <label htmlFor="ime">Vaše ime i prezime *</label>
              <input
                id="ime"
                name="ime"
                type="text"
                placeholder="Npr. Marija Petrović"
                value={form.ime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email adresa *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="primer@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefon">Broj telefona</label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                placeholder="+381 6x xxx xxxx"
                value={form.telefon}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ljubimac">Ime ljubimca</label>
              <input
                id="ljubimac"
                name="ljubimac"
                type="text"
                placeholder="Npr. Reks, Mića..."
                value={form.ljubimac}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label htmlFor="vrstaUpita">Vrsta upita</label>
              <select
                id="vrstaUpita"
                name="vrstaUpita"
                value={form.vrstaUpita}
                onChange={handleChange}
              >
                <option value="">-- Izaberite --</option>
                <option value="zakazivanje">Zakazivanje termina</option>
                <option value="info">Informacije o usluzi</option>
                <option value="cena">Upit o ceni</option>
                <option value="hitno">Hitni slučaj</option>
                <option value="ostalo">Ostalo</option>
              </select>
            </div>

            <div className="form-group full">
              <label htmlFor="poruka">Poruka *</label>
              <textarea
                id="poruka"
                name="poruka"
                placeholder="Opišite Vaš upit detaljnije..."
                value={form.poruka}
                onChange={handleChange}
              />
            </div>

            <div className="form-submit-row">
              <button
                className="btn-posalji"
                onClick={handleSubmit}
                disabled={loading || !form.ime || !form.email || !form.poruka}
              >
                {loading ? "Slanje..." : "Pošaljite poruku"}
              </button>

              {submitted && (
                <span className="form-success">
                  Poruka je uspešno poslata! Javićemo Vam se uskoro.
                </span>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}