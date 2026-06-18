import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profil from "./pages/Profil";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Zakazivanje from "./pages/Zakazivanje";
import Pocetna from "./pages/Pocetna";
import Usluge from "./pages/Usluge";
import PojedinacnaUsluga from "./pages/PojedinacnaUsluga";
import Kontakt from "./pages/Kontakt";
import ONama from "./pages/ONama";
import PolitikaPrivatnosti from "./pages/PolitikaPrivatnosti";

import "./App.css";

function ZasticenaRuta({ children }: { children: ReactNode }) {
  const { jeUlogovan } = useApp();

  if (!jeUlogovan) {
    return <Navigate to="/prijava" replace />;
  }

  return children;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />

          <div className="app-content">
            <Routes>
              <Route path="/" element={<Pocetna />} />
              <Route path="/prijava" element={<Prijava />} />
              <Route path="/registracija" element={<Registracija />} />
              <Route path="/usluge" element={<Usluge />} />
              <Route path="/usluga/:id" element={<PojedinacnaUsluga />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/o-nama" element={<ONama />} />
              <Route
                path="/politika-privatnosti"
                element={<PolitikaPrivatnosti />}
              />

              <Route
                path="/zakazivanje"
                element={
                  <ZasticenaRuta>
                    <Zakazivanje />
                  </ZasticenaRuta>
                }
              />

              <Route
                path="/profil"
                element={
                  <ZasticenaRuta>
                    <Profil />
                  </ZasticenaRuta>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
