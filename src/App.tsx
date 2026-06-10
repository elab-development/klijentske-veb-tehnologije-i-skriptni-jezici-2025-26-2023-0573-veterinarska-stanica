import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Zakazivanje from "./pages/Zakazivanje";
import Pocetna from "./pages/Pocetna";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />

          <div className="app-content">
            <Routes>
              <Route path="/prijava" element={<Prijava />} />
              <Route path="/registracija" element={<Registracija />} />
              <Route path="/zakazivanje" element={<Zakazivanje />} />
              <Route path="/" element={<Pocetna />} />
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
