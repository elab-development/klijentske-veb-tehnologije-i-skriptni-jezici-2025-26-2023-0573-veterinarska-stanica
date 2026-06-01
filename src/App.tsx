import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Zakazivanje from "./pages/Zakazivanje";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/zakazivanje" element={<Zakazivanje />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
