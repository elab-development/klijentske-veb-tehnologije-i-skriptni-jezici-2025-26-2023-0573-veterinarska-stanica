import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Prijava.css";

export default function Prijava() {
  const { prijavi } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [greska, setGreska] = useState("");

  const handleSubmit = () => {
    setGreska("");

    if (email.trim() === "" || lozinka.trim() === "") {
      setGreska("Unesite email adresu i lozinku.");
      return;
    }

    const uspesnaPrijava = prijavi(email, lozinka);

    if (!uspesnaPrijava) {
      setGreska("Email adresa ili lozinka nisu ispravni.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("zapamceniEmail", email);
    } else {
      localStorage.removeItem("zapamceniEmail");
    }

    navigate("/zakazivanje");
  };

  return (
    <div className="page-wrapper">
      <main className="main">
        <div className="login-card">
          <div className="card-image">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80"
              alt="Veterinar s psom"
            />
          </div>

          <div className="card-body">
            <h1 className="card-title">PRIJAVA KORISNIKA</h1>

            <div className="field">
              <label htmlFor="email">
                Email adresa: <span className="required">*</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="korisnik@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">
                Lozinka: <span className="required">*</span>
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={lozinka}
                onChange={(e) => setLozinka(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <label className="remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <span>Zapamti me</span>
            </label>

            {greska && <p className="login-greska">{greska}</p>}

            <button type="button" className="btn-login" onClick={handleSubmit}>
              PRIJAVI SE
            </button>

            <div className="card-links">
              <a href="#">Zaboravili ste lozinku?</a>

              <p>
                Nemate nalog?{" "}
                <Link to="/registracija">Registrujte se ovde</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
