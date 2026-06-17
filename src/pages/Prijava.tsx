import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Polje from "../components/Polje";
import Dugme from "../components/Dugme";
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
              src="https://images.ctfassets.net/82d3r48zq721/1FSNHK1W5fkwxiZ66GFae6/79aed0ae7c3c07f5bc246d7351b84d3f/Dog-during-vet-visit_resized.jpg?w=800&q=80&fm=webp"
              alt="Veterinar s psom"
            />
          </div>

          <div className="card-body">
            <h1 className="card-title">PRIJAVA KORISNIKA</h1>

            <Polje
              label="Email adresa"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="korisnik@email.com"
              required
            />

            <Polje
              label="Lozinka"
              value={lozinka}
              onChange={setLozinka}
              type="password"
              placeholder="••••••••"
              required
            />

            <label className="remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Zapamti me</span>
            </label>

            {greska && <p className="login-greska">{greska}</p>}

            <Dugme tekst="PRIJAVI SE" tip="primarno" onClick={handleSubmit} />

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
