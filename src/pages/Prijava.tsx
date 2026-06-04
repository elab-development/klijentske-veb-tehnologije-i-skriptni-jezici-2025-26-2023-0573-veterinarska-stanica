import { useState } from "react";
import "./Prijava.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { email, rememberMe });
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button className="btn-login" onClick={handleSubmit}>
              PRIJAVI SE
            </button>

            <div className="card-links">
              <a href="#">Zaboravili ste lozinku?</a>
              <p>
                Nemate nalog? <a href="/registracija">Registrujte se ovde</a>
              </p>{" "}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
