import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Zakazivanje from "./pages/Zakazivanje";
import Pocetna from "./pages/Pocetna";
import Usluge from "./pages/Usluge";

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

              <Route
                path="/zakazivanje"
                element={
                  <ZasticenaRuta>
                    <Zakazivanje />
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
