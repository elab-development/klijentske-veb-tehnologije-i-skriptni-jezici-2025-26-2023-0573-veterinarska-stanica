import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Zakazivanje from "./pages/Zakazivanje";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Routes>
            <Route path="/zakazivanje" element={<Zakazivanje />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
