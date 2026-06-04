import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Zakazivanje from "./pages/Zakazivanje";
import "./App.css";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/zakazivanje" element={<Zakazivanje />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
