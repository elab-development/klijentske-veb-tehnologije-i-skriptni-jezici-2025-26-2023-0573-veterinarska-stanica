import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Veterinarska Ambulanta</span>
      <div className="footer-links">
         <Link to="/o-nama">O nama</Link>
         <Link to="/kontakt">Kontakt</Link>
         <Link to="/politika-privatnosti">Politika privatnosti</Link>
      </div>
    </footer>
  );
}
