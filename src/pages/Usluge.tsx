import { useState, useEffect } from "react";
import "./Usluge.css";
import { Link } from 'react-router-dom';


interface Usluga {
  id: number;
  naziv: string;
  opis: string;
  kategorija: "Pregledi" | "Vakcinacija" | "Hirurgija" | "Dijagnostika" | "Nega i grooming";
  vrste: Array<"Pas" | "Mačka" | "Ptica" | "Egzotične životinje">;
  cena: number;
  ocene: number;
  brojOcena: number;
  slika?: string;
  opisDetaljno?: string[];
  ukljucuje?: string[];
  koraci?: { naslov: string; opis: string }[];
}


export const SVE_USLUGE = [
  {
    id: 1,
    naziv: "Opšti pregled",
    opis: "Sveobuhvatni pregled zdravstvenog stanja vašeg ljubimca uz preporuke.",
    kategorija: "Pregledi",
    vrste: ["Pas", "Mačka"],
    cena: 1500,
    ocene: 4,
    brojOcena: 26,
    slika: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",

    opisDetaljno: [
      "Detaljan klinički pregled celokupnog zdravstvenog stanja.",
      "Procena srca, pluća, kože, zuba i opšte kondicije."
    ],

    ukljucuje: [
      "Pregled očiju i ušiju",
      "Auskultacija srca i pluća",
      "Palpacija abdomena",
      "Procena opšteg stanja"
    ],

    koraci: [
      { naslov: "Prijem", opis: "Registracija i kratka anamneza" },
      { naslov: "Pregled", opis: "Veterinar obavlja kompletan pregled" },
      { naslov: "Preporuke", opis: "Daje se terapija ili savet" }
    ]
  },

  {
    id: 2,
    naziv: "Vakcinacija",
    opis: "Zaštita od zaraznih bolesti — kompletan program vakcinacije.",
    kategorija: "Vakcinacija",
    vrste: ["Pas", "Mačka"],
    cena: 2000,
    ocene: 5,
    brojOcena: 13,
    slika: "https://petsure.com.au/wp-content/uploads/2023/06/PuppyVax_Hero-1-1024x551.jpg",

    opisDetaljno: [
      "Vakcinacija štiti ljubimca od najčešćih zaraznih bolesti.",
      "Program se prilagođava uzrastu i zdravstvenom stanju."
    ],

    ukljucuje: [
      "Pregled pre vakcinacije",
      "Primena vakcine",
      "Saveti nakon vakcinacije"
    ],

    koraci: [
      { naslov: "Pregled", opis: "Provera zdravstvenog stanja" },
      { naslov: "Vakcinacija", opis: "Primena vakcine" },
      { naslov: "Praćenje", opis: "Kratko zadržavanje nakon injekcije" }
    ]
  },

  {
    id: 3,
    naziv: "Rendgen snimanje",
    opis: "Dijagnostičko snimanje kostiju i unutrašnjih organa.",
    kategorija: "Dijagnostika",
    vrste: ["Pas", "Mačka"],
    cena: 3500,
    ocene: 4,
    brojOcena: 5,
    slika: "https://t3.ftcdn.net/jpg/05/72/79/28/360_F_572792806_R2ouiFMMsjH9QoqDtmTTE60qvBfFBNNF.jpg",

    opisDetaljno: [
      "Brza i precizna dijagnostika povreda i bolesti.",
      "Minimalna doza zračenja i bezbedan postupak."
    ],

    ukljucuje: [
      "Rendgensko snimanje",
      "Tumačenje nalaza",
      "Digitalna kopija"
    ],

    koraci: [
      { naslov: "Priprema", opis: "Pozicioniranje ljubimca" },
      { naslov: "Snimanje", opis: "Izrada rendgena" },
      { naslov: "Analiza", opis: "Veterinar tumači snimak" }
    ]
  },

  {
    id: 4,
    naziv: "Ultrazvuk",
    opis: "Pregled unutrašnjih organa ultrazvučnom metodom, bezbolno i bezbedno.",
    kategorija: "Dijagnostika",
    vrste: ["Pas", "Mačka"],
    cena: 4000,
    ocene: 5,
    brojOcena: 11,
    slika: "https://mitchamvet.com.au/wp-content/uploads/2021/10/MPH-Ultrasound-on-Cat.jpg",

    opisDetaljno: [
      "Bezbolna i sigurna dijagnostička metoda.",
      "Detaljan pregled organa u realnom vremenu."
    ],

    ukljucuje: [
      "Ultrazvučni pregled",
      "Izveštaj veterinara",
      "Preporuke"
    ],

    koraci: [
      { naslov: "Priprema", opis: "Priprema regije pregleda" },
      { naslov: "Pregled", opis: "Ultrazvučno snimanje" },
      { naslov: "Izveštaj", opis: "Analiza nalaza" }
    ]
  },

  {
    id: 5,
    naziv: "Sterilizacija / Kastracija",
    opis: "Hirurški zahvat koji sprečava razmnožavanje i poboljšava zdravlje.",
    kategorija: "Hirurgija",
    vrste: ["Pas", "Mačka"],
    cena: 8000,
    ocene: 5,
    brojOcena: 8,
    slika: "https://cobb.vet/wp-content/uploads/2025/03/dog-post-surgery-recovery.jpg",

    opisDetaljno: [
      "Rutinski hirurški zahvat u opštoj anesteziji.",
      "Smanjuje rizik od bolesti i neželjenog razmnožavanja."
    ],

    ukljucuje: [
      "Preoperativni pregled",
      "Anestezija",
      "Operacija",
      "Postoperativna nega"
    ],

    koraci: [
      { naslov: "Priprema", opis: "Analize i pregled" },
      { naslov: "Operacija", opis: "Izvođenje zahvata" },
      { naslov: "Oporavak", opis: "Praćenje nakon operacije" }
    ]
  },

  {
    id: 6,
    naziv: "Kupanje i šišanje",
    opis: "Profesionalna nega krzna i kože — kupanje, četkanje i šišanje.",
    kategorija: "Nega i grooming",
    vrste: ["Pas", "Mačka"],
    cena: 2500,
    ocene: 4,
    brojOcena: 19,
    slika: "https://img.freepik.com/premium-photo/dog-grooming-salon-dog-get-shower-domestic-animal-get-beauty-procedures-beauty-salon-dogs-bath_170532-4008.jpg",

    opisDetaljno: [
      "Kupanje, šišanje i četkanje uz profesionalne preparate.",
      "Prilagođeno tipu dlake."
    ],

    ukljucuje: [
      "Kupanje",
      "Šišanje",
      "Četkanje",
      "Sušenje"
    ],

    koraci: [
      { naslov: "Kupanje", opis: "Pranje specijalnim šamponom" },
      { naslov: "Šišanje", opis: "Oblikovanje dlake" },
      { naslov: "Završna nega", opis: "Sušenje i stilizovanje" }
    ]
  },

  {
    id: 7,
    naziv: "Pregled ptica",
    opis: "Specijalistički pregled ptica — papagaji, kanarinci i ostale vrste.",
    kategorija: "Pregledi",
    vrste: ["Ptica"],
    cena: 1800,
    ocene: 4,
    brojOcena: 3,
    slika: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",

    opisDetaljno: [
      "Procena zdravlja perja, kljuna i disanja.",
      "Specijalizovan pregled za ptice."
    ],

    ukljucuje: [
      "Pregled perja",
      "Pregled kljuna",
      "Saveti o ishrani"
    ],

    koraci: [
      { naslov: "Procena", opis: "Pregled ptice" },
      { naslov: "Analiza", opis: "Procena zdravlja" },
      { naslov: "Saveti", opis: "Preporuke vlasniku" }
    ]
  },

  {
    id: 8,
    naziv: "Pregled egzotičnih životinja",
    opis: "Stručna briga za egzotične ljubimce — kornjače, zečevi, zamorčići i ostalo.",
    kategorija: "Pregledi",
    vrste: ["Egzotične životinje"],
    cena: 2200,
    ocene: 4,
    brojOcena: 4,
    slika: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80",

    opisDetaljno: [
      "Specijalizovan pregled egzotičnih vrsta.",
      "Procena specifičnih potreba."
    ],

    ukljucuje: [
      "Pregled kondicije",
      "Procena ishrane",
      "Saveti za negu"
    ],

    koraci: [
      { naslov: "Pregled", opis: "Procena stanja" },
      { naslov: "Analiza", opis: "Dijagnostika" },
      { naslov: "Saveti", opis: "Preporuke" }
    ]
  },

  {
    id: 9,
    naziv: "Analiza krvi",
    opis: "Kompletna krvna slika i biohemija za praćenje zdravstvenog stanja.",
    kategorija: "Dijagnostika",
    vrste: ["Pas", "Mačka"],
    cena: 2800,
    ocene: 5,
    brojOcena: 22,
    slika: "https://felinefascination.com/wp-content/uploads/2025/08/cat_blood_test_analysis_7t7ll.jpg",

    opisDetaljno: [
      "Kompletna krvna slika i biohemija.",
      "Procena unutrašnjeg zdravlja."
    ],

    ukljucuje: [
      "Uzimanje uzorka",
      "Analiza krvi",
      "Izveštaj"
    ],

    koraci: [
      { naslov: "Uzorak", opis: "Vađenje krvi" },
      { naslov: "Analiza", opis: "Laboratorija" },
      { naslov: "Rezultat", opis: "Dijagnoza" }
    ]
  },

  {
    id: 10,
    naziv: "Čišćenje zuba",
    opis: "Uklanjanje kamenca i plaka uz poliranje zuba pod anestezijom.",
    kategorija: "Hirurgija",
    vrste: ["Pas", "Mačka"],
    cena: 5500,
    ocene: 4,
    brojOcena: 7,
    slika: "https://tse3.mm.bing.net/th/id/OIP.vZAcr_ARrhzACIp6isylJQHaEO",

    opisDetaljno: [
      "Profesionalno čišćenje zuba pod anestezijom.",
      "Prevencija bolesti zuba."
    ],

    ukljucuje: [
      "Uklanjanje kamenca",
      "Poliranje",
      "Kontrola"
    ],

    koraci: [
      { naslov: "Priprema", opis: "Anestezija" },
      { naslov: "Čišćenje", opis: "Uklanjanje kamenca" },
      { naslov: "Oporavak", opis: "Buđenje" }
    ]
  },

  {
    id: 11,
    naziv: "Vakcinacija ptica",
    opis: "Program vakcinacije za ptice prilagođen vrsti i uzrastu.",
    kategorija: "Vakcinacija",
    vrste: ["Ptica"],
    cena: 1600,
    ocene: 4,
    brojOcena: 2,
    slika: "https://media.istockphoto.com/id/1466368811/photo/vaccine.jpg?s=612x612&w=0&k=20&c=WpKYCcx7RWtyDd-tn9-0j5CkaKvgq2HJ-rRRsIBc-xs=",

    opisDetaljno: [
      "Zaštita ptica od bolesti.",
      "Program vakcinacije po vrsti."
    ],

    ukljucuje: [
      "Vakcinacija",
      "Pregled",
      "Praćenje"
    ],

    koraci: [
      { naslov: "Pregled", opis: "Procena ptice" },
      { naslov: "Vakcinacija", opis: "Davanje vakcine" },
      { naslov: "Praćenje", opis: "Posle vakcine" }
    ]
  },

  {
    id: 12,
    naziv: "Čipovanje",
    opis: "Ugradnja mikročipa i registracija u nacionalnu bazu podataka.",
    kategorija: "Pregledi",
    vrste: ["Pas", "Mačka"],
    cena: 1200,
    ocene: 5,
    brojOcena: 31,
    slika: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80",

    opisDetaljno: [
      "Identifikacija ljubimca mikročipom.",
      "Registracija u bazu podataka."
    ],

    ukljucuje: [
      "Ugradnja čipa",
      "Registracija",
      "Provera"
    ],

    koraci: [
      { naslov: "Ugradnja", opis: "Postavljanje čipa" },
      { naslov: "Registracija", opis: "Upis u sistem" },
      { naslov: "Završetak", opis: "Provera ispravnosti" }
    ]
  }
];

const KATEGORIJE = [
  { label: "Sve usluge", vrednost: "" },
  { label: "Pregledi", vrednost: "Pregledi" },
  { label: "Vakcinacija", vrednost: "Vakcinacija" },
  { label: "Hirurgija", vrednost: "Hirurgija" },
  { label: "Dijagnostika", vrednost: "Dijagnostika" },
  { label: "Nega i grooming", vrednost: "Nega i grooming" },
];

const VRSTE_LJUBIMACA = ["Pas", "Mačka", "Ptica", "Egzotične životinje"] as const;

const ITEMS_PER_PAGE = 4;


function Stars({ n, total }: { n: number; total: number }) {
  return (
    <div className="card-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="star">{i < n ? "★" : "☆"}</span>
      ))}
      <span className="review-count">({total})</span>
    </div>
  );
}


export default function Usluge() {
  const [search, setSearch] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [vrsteFilter, setVrsteFilter] = useState<string[]>([]);
  const [minCena, setMinCena] = useState(0);
  const [maxCena, setMaxCena] = useState(20000);
  const [sort, setSort] = useState("popularnost");
  const [page, setPage] = useState(1);

  useEffect(() => {
  setPage(1);
}, [search, kategorija, vrsteFilter, minCena, maxCena]);
  

  

 const resetFilters = () => {
  setSearch("");
  setKategorija("");
  setVrsteFilter([]);
  setMinCena(0);
  setMaxCena(20000);
  setPage(1);
};

  const toggleVrsta = (v: string) =>
    setVrsteFilter((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  
  let filtered = SVE_USLUGE.filter((u) => {
  if (
    search &&
    !u.naziv.toLowerCase().includes(search.toLowerCase())
  ) {
    return false;
  }

  if (
    kategorija &&
    u.kategorija !== kategorija
  ) {
    return false;
  }

  if (
    vrsteFilter.length &&
    !vrsteFilter.some((v) =>
      u.vrste.includes(v as any)
    )
  ) {
    return false;
  }

  if (
    u.cena < minCena ||
    u.cena > maxCena
  ) {
    return false;
  }

  return true;
});


  filtered = [...filtered].sort((a, b) => {
    if (sort === "popularnost") return b.brojOcena - a.brojOcena;
    if (sort === "cena_asc") return a.cena - b.cena;
    if (sort === "cena_desc") return b.cena - a.cena;
    if (sort === "ocena") return b.ocene - a.ocene;
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  
  const countFor = (kat: string) =>
    SVE_USLUGE.filter((u) => (kat ? u.kategorija === kat : true)).length;

  return (
    <>
      

      
      <header className="page-header">
        <h1>Naše veterinarske usluge</h1>
        <p>Profesionalna briga o vašim ljubimcima – od preventive do hirurgije</p>
      </header>

      
      <div className="usluge-layout">

        
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">-- Pretraga --</div>
            <div className="sidebar-search">
              <input
                type="text"
                placeholder="Pretražite usluge..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">-- Kategorija --</div>
            <ul className="sidebar-list">
              {KATEGORIJE.map((k) => (
                <li key={k.vrednost}>
                  <button
                    className={kategorija === k.vrednost ? "active" : ""}
                    onClick={() => setKategorija(k.vrednost)}
                  >
                    {k.label} ({countFor(k.vrednost)})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">-- Vrsta ljubimca --</div>
            <ul className="checkbox-list">
              {VRSTE_LJUBIMACA.map((v) => (
                <li key={v}>
                  <label>
                    <input
                      type="checkbox"
                      checked={vrsteFilter.includes(v)}
                      onChange={() => toggleVrsta(v)}
                    />
                    {v}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">-- Cena --</div>
            <div className="price-range">
              <input
                type="number"
                value={minCena}
                min={0}
                max={maxCena}
                onChange={(e) => setMinCena(Number(e.target.value))}
              />
              <input
                type="number"
                value={maxCena}
                min={minCena}
                max={50000}
                onChange={(e) => setMaxCena(Number(e.target.value))}
              />
            </div>
            <input
              className="range-slider"
              type="range"
              min={0}
              max={20000}
              step={100}
              value={maxCena}
              onChange={(e) => setMaxCena(Number(e.target.value))}
            />
          </div>

          
          <button className="btn-reset" onClick={resetFilters}>
            Resetuj filtere
          </button>
        </aside>

        
        <main className="usluge-main">
          <div className="usluge-topbar">
            <span className="count">
              Prikazano: <strong>{filtered.length} usluga</strong>
            </span>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popularnost">Popularnosti ▼</option>
              <option value="ocena">Oceni ▼</option>
              <option value="cena_asc">Cena ↑</option>
              <option value="cena_desc">Cena ↓</option>
            </select>
          </div>

         <div className="usluge-grid">
  {filtered.length === 0 ? (
    <div className="no-results">
      Usluga nije pronađena
    </div>
  ) : (
    paged.map((u) => (
      <Link to={`/usluga/${u.id}`} key={u.id} className="service-card-link">

        <div className="service-card">
          {u.slika ? (
            <img className="card-img" src={u.slika} alt={u.naziv} />
          ) : (
            <div className="card-img-placeholder">{u.naziv}</div>
          )}

          <div className="card-body">
            <div className="card-tags">
              <span className="tag">{u.kategorija}</span>
              {u.vrste.slice(0, 2).map((v) => (
                <span key={v} className="tag">{v}</span>
              ))}
            </div>

            <div className="card-title">{u.naziv}</div>
            <div className="card-desc">{u.opis}</div>

            <Stars n={u.ocene} total={u.brojOcena} />

            <div className="card-footer">
              <span className="card-price">
                od {u.cena.toLocaleString("sr-RS")} din
              </span>
              <button className="btn-info">Više info</button>
            </div>
          </div>

        </div>
      </Link>
    ))
  )}
</div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                ← Preth.
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Sled. →
              </button>
            </div>
          )}
        </main>
      </div>

  
    </>
  );
}