import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PojedinacnaUsluga.css";
import { SVE_USLUGE } from "./Usluge";


interface Recenzija {
  id: number;
  ime: string;
  ocena: number;
  datum: string;
  tekst: string;
}

interface Korak {
  naslov: string;
  opis: string;
}

interface UslugaDetalji {
  naziv: string;
  kategorija: string;
  vrste: string[];
  cena: number;
  cenaNapomena?: string;
  ocena: number;
  brojRecenzija: number;
  slika?: string;
  opis: string[];
  ukljucuje: string[];
  koraci: Korak[];
  recenzije: Recenzija[];
}


function StarRow({
  ocena,
  max = 5,
  size = 16,
}: {
  ocena: number;
  max?: number;
  size?: number;
}) {
  const full = Math.round(ocena);

  return (
    <span style={{ display: "flex", gap: 2, fontSize: size }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < full ? "star" : "star-empty"}>
          {i < full ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

function CheckIcon() {
  return (
    <span className="pu-check">
      <svg viewBox="0 0 12 12">
        <polyline points="2,6 5,9 10,3" />
      </svg>
    </span>
  );
}

export default function PojedinacnaUsluga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prikazanoRecenzija, setPrikazanoRecenzija] = useState(2);

  const osnovna = SVE_USLUGE.find((u) => u.id === Number(id));

  if (!osnovna) {
    return <h2 style={{ padding: 20 }}>Usluga nije pronađena.</h2>;
  }

  
  const usluga: UslugaDetalji = {
    naziv: osnovna.naziv,
    kategorija: osnovna.kategorija,
    vrste: osnovna.vrste,
    cena: osnovna.cena,
    ocena: osnovna.ocene,
    brojRecenzija: osnovna.brojOcena,
    slika: osnovna.slika,

    cenaNapomena: "Detalji dostupni u ambulanti",

    opis: [
      osnovna.opis,
      "Detaljan opis ove usluge možete dobiti u ambulanti ili prilikom zakazivanja.",
    ],

    ukljucuje: [
      "Stručni veterinarski pregled",
      "Profesionalni pristup",
      "Saveti veterinara",
    ],

    koraci: [
      {
        naslov: "Zakazivanje",
        opis: "Izaberite termin i zakažite posetu.",
      },
      {
        naslov: "Dolazak",
        opis: "Dolazak u veterinarsku ambulantu.",
      },
      {
        naslov: "Usluga",
        opis: "Izvođenje veterinarske usluge.",
      },
    ],

    recenzije: [
      {
        id: 1,
        ime: "Korisnik",
        ocena: 5,
        datum: "2024",
        tekst: "Odlična usluga i profesionalan pristup.",
      },
    ],
  };

  const vidljiveRecenzije = usluga.recenzije.slice(0, prikazanoRecenzija);
  const ostatak = usluga.recenzije.length - prikazanoRecenzija;

  return (
    <div className="pu-page">
      
      <div className="pu-hero">
        {usluga.slika ? (
          <img className="pu-hero-img" src={usluga.slika} />
        ) : (
          <div className="pu-hero-img-placeholder" />
        )}

        <div className="pu-hero-info">
          <div className="pu-tags">
            <span className="pu-tag">{usluga.kategorija}</span>
            {usluga.vrste.map((v) => (
              <span key={v} className="pu-tag">
                {v}
              </span>
            ))}
          </div>

          <h1 className="pu-title">{usluga.naziv}</h1>

          <div className="pu-stars">
            <StarRow ocena={usluga.ocena} />
            <span className="pu-rating-text">
              {usluga.ocena}/5 ({usluga.brojRecenzija})
            </span>
          </div>

          <div className="pu-price-box">
            <div className="pu-price-label">Cena od:</div>
            <div className="pu-price">
              {usluga.cena.toLocaleString("sr-RS")} din
            </div>
            {usluga.cenaNapomena && (
              <div className="pu-price-note">{usluga.cenaNapomena}</div>
            )}
          </div>

          <div className="pu-hero-actions">
            <button className="btn-zakazi" onClick={() => navigate("/zakazivanje")}> Zakaži </button>
            <button className="btn-pozovi">Pozovi</button>
          </div>
        </div>
      </div>

      
      <section className="pu-section pu-opis">
        <div className="pu-section-title">-- Opis --</div>
        {usluga.opis.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      
      <section className="pu-section">
        <div className="pu-section-title">-- Šta uključuje --</div>
        <ul className="pu-includes-list">
          {usluga.ukljucuje.map((i, idx) => (
            <li key={idx}>
              <CheckIcon />
              {i}
            </li>
          ))}
        </ul>
      </section>

      
      <section className="pu-section">
        <div className="pu-section-title">-- Tok usluge --</div>

        <div className="pu-steps">
          {usluga.koraci.map((k, i) => (
            <div key={i} className="pu-step">
              <div className="pu-step-num">{i + 1}</div>
              <div>
                <div className="pu-step-title">{k.naslov}</div>
                <div className="pu-step-desc">{k.opis}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="pu-reviews-section">
        <div className="pu-reviews-header">
          <div className="pu-section-title">
            -- Recenzije ({usluga.brojRecenzija}) --
          </div>

          <button className="btn-dodaj-recenziju">
            + Dodaj recenziju
          </button>
        </div>

        <div className="pu-review-cards">
          {vidljiveRecenzije.map((r) => (
            <div key={r.id} className="pu-review-card">
              <div className="pu-review-top">
                <span className="pu-reviewer-name">{r.ime}</span>
                <span className="pu-review-date">{r.datum}</span>
              </div>

              <div className="pu-review-stars">
                <StarRow ocena={r.ocena} size={14} />
              </div>

              <p className="pu-review-text">{r.tekst}</p>
            </div>
          ))}
        </div>

        {ostatak > 0 && (
          <div className="pu-load-more">
            <button
              className="btn-ucitaj"
              onClick={() => setPrikazanoRecenzija((p) => p + 2)}
            >
              Učitaj još ({ostatak})
            </button>
          </div>
        )}
      </section>
    </div>
  );
}