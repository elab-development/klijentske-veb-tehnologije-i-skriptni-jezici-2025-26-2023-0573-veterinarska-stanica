import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { jeUlogovan, korisnik, odjavi } = useApp();

  const [meniOtvoren, setMeniOtvoren] = useState(false);
  const [korisnikMeniOtvoren, setKorisnikMeniOtvoren] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMeniOtvoren(false);
    setKorisnikMeniOtvoren(false);
  }, [location.pathname]);

  const handleOdjava = () => {
    odjavi();
    setMeniOtvoren(false);
    setKorisnikMeniOtvoren(false);
    navigate("/prijava");
  };

  return (
    <nav className="navbar">
      <div className="navbar-gornji-red">
        <Link to="/" className="navbar-logo">
          <div className="logo-box">
            <span className="logo-tekst">STS VET</span>
            <span className="logo-godina">2026</span>
          </div>
        </Link>

        <button
          type="button"
          className="hamburger-dugme"
          onClick={() => setMeniOtvoren((prethodno) => !prethodno)}
          aria-label="Otvori meni"
        >
          ☰
        </button>
      </div>

      <div
        className={`navbar-linkovi ${
          meniOtvoren ? "navbar-linkovi-otvoreni" : ""
        }`}
      >
        <Link to="/">Početna</Link>
        <Link to="/usluge">Usluge</Link>
        <Link to="/kontakt">Kontakt</Link>

        {jeUlogovan ? (
          <div className="korisnik-meni">
            <button
              type="button"
              className="korisnik-dugme"
              onClick={() => setKorisnikMeniOtvoren((prethodno) => !prethodno)}
            >
              {korisnik?.ime} {korisnik?.prezime?.charAt(0)}. ▼
            </button>

            {korisnikMeniOtvoren && (
              <div className="dropdown">
                <Link to="/profil">Moj profil</Link>
                <button type="button" onClick={handleOdjava}>
                  Odjava
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/prijava" className="btn-prijava">
            Prijava
          </Link>
        )}
      </div>
    </nav>
  );
}
