import "./Strane.css";

export default function PolitikaPrivatnosti() {
  return (
    <div className="page-wrapper">
      <div className="page-content">

        <h1 className="page-title">POLITIKA PRIVATNOSTI</h1>

        <div className="green-card">
          <h2>Prikupljanje podataka</h2>
          <p>
            Prikupljamo samo osnovne podatke potrebne za zakazivanje
            termina i pružanje veterinarskih usluga (ime, telefon, email).
          </p>
        </div>

        <div className="green-card">
          <h2>Korišćenje podataka</h2>
          <p>
            Vaši podaci se koriste isključivo za zakazivanje termina,
            komunikaciju i pružanje usluga u ambulanti.
          </p>
        </div>

        <div className="green-card">
          <h2>Zaštita podataka</h2>
          <p>
            Svi podaci se čuvaju bezbedno i nisu dostupni trećim licima.
          </p>
        </div>

        <div className="green-card">
          <h2>Kontakt</h2>
          <p>
            Ako imate pitanja u vezi privatnosti, možete nas kontaktirati putem{" "}
            <a href="/kontakt" className="link">
            kontakt stranice
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
}