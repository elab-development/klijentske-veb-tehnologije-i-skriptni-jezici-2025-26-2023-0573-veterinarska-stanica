import { useState } from "react";
import "./Usluge.css";


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
}


const SVE_USLUGE: Usluga[] = [
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
  },
  {
    id: 3,
    naziv: "Rendgen snimanje",
    opis: "Dijagnostičko snimanje kostenog sistema i unutrašnjih organa.",
    kategorija: "Dijagnostika",
    vrste: ["Pas", "Mačka"],
    cena: 3500,
    ocene: 4,
    brojOcena: 5,
    slika: "https://t3.ftcdn.net/jpg/05/72/79/28/360_F_572792806_R2ouiFMMsjH9QoqDtmTTE60qvBfFBNNF.jpg",
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
  },
  {
    id: 5,
    naziv: "Kastacija / Sterilizacija",
    opis: "Hirurški zahvat koji sprečava razmnožavanje i poboljšava zdravlje.",
    kategorija: "Hirurgija",
    vrste: ["Pas", "Mačka"],
    cena: 8000,
    ocene: 5,
    brojOcena: 8,
    slika: "https://cobb.vet/wp-content/uploads/2025/03/dog-post-surgery-recovery.jpg",
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
    slika: "https://img.freepik.com/premium-photo/dog-grooming-salon-dog-get-shower-domestic-animal-get-beauty-procedures-beauty-salon-dogs-bath_170532-4008.jpg?size=626&ext=jpg",
  },
  {
    id: 7,
    naziv: "Pregled ptica",
    opis: "Specijalistički pregled za ptice — papagaji, kanarinci i ostale vrste.",
    kategorija: "Pregledi",
    vrste: ["Ptica"],
    cena: 1800,
    ocene: 4,
    brojOcena: 3,
    slika: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
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
    slika: "https://tse3.mm.bing.net/th/id/OIP.vZAcr_ARrhzACIp6isylJQHaEO?pid=Api",
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
    slika:"https:/media.istockphoto.com/id/1466368811/photo/vaccine.jpg?s=612x612&w=0&k=20&c=WpKYCcx7RWtyDd-tn9-0j5CkaKvgq2HJ-rRRsIBc-xs="
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
  },
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

  
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    kategorija: "",
    vrste: [] as string[],
    min: 0,
    max: 20000,
  });

  const applyFilters = () => {
    setAppliedFilters({ search, kategorija, vrste: vrsteFilter, min: minCena, max: maxCena });
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setKategorija("");
    setVrsteFilter([]);
    setMinCena(0);
    setMaxCena(20000);
    setAppliedFilters({ search: "", kategorija: "", vrste: [], min: 0, max: 20000 });
    setPage(1);
  };

  const toggleVrsta = (v: string) =>
    setVrsteFilter((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  
  let filtered = SVE_USLUGE.filter((u) => {
    if (appliedFilters.search && !u.naziv.toLowerCase().includes(appliedFilters.search.toLowerCase())) return false;
    if (appliedFilters.kategorija && u.kategorija !== appliedFilters.kategorija) return false;
    if (appliedFilters.vrste.length && !appliedFilters.vrste.some((v) => u.vrste.includes(v as any))) return false;
    if (u.cena < appliedFilters.min || u.cena > appliedFilters.max) return false;
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

          <button className="btn-filter" onClick={applyFilters}>
            Primeni filtere
          </button>
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
            {paged.map((u) => (
              <div key={u.id} className="service-card">
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
                    <span className="card-price">od {u.cena.toLocaleString("sr-RS")} din</span>
                    <button className="btn-info">Više info</button>
                  </div>
                </div>
              </div>
            ))}
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