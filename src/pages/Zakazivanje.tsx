import "./Zakazivanje.css";

export default function Zakazivanje() {
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
            <p>Ovde ce biti lista usluga...</p>
          </div>

          <div className="forma-sekcija">
            <h3>-- KORAK 1B: IZBOR LJUBIMCA --</h3>
            <p>Ovde ce biti lista ljubimaca...</p>
          </div>

          <div className="forma-sekcija">
            <h3>-- KORAK 2: DATUM I VREME --</h3>
            <p>Ovde ce biti kalendar...</p>
          </div>
        </div>

        <div className="pregled-panel">
          <h3>-- PREGLED TERMINA --</h3>
          <p>Ovde ce biti pregled...</p>
        </div>
      </div>
    </div>
  );
}
