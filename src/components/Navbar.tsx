import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import "./Navbar.css";
export default function Navbar() {
  const { jeUlogovan, korisnik, odjavi } = useApp();
  const [meniOtvoren, setMeniOtvoren] = useState(false);
  const navigate = useNavigate();
  const handleOdjava = () => {
    odjavi();
    setMeniOtvoren(false);
    navigate("/prijava");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo-box">
          <span className="logo-tekst">STS VET</span>
          <span className="logo-godina">2026</span>
        </div>
      </Link>
      <div className="navbar-linkovi">
        <Link to="/">Početna</Link>
        <Link to="/usluge">Usluge</Link>
        <Link to="/kontakt">Kontakt</Link>
        {jeUlogovan ? (
          <div className="korisnik-meni">
            <button
              className="korisnik-dugme"
              onClick={() => setMeniOtvoren(!meniOtvoren)}
            >
              {korisnik?.ime} {korisnik?.prezime?.charAt(0)}. ▼
            </button>
            {meniOtvoren && (
              <div className="dropdown">
                <Link to="/profil" onClick={() => setMeniOtvoren(false)}>
                  Moj profil
                </Link>
                <button onClick={handleOdjava}>Odjava</button>
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
