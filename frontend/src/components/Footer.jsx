import { Link } from "react-router-dom";


export default function Footer() {

  return (
    <footer>
      <p>Sharpe Media©    2023</p>
      <nav>
        <Link className="nav-item button" aria-label="On Click" target="_blank" to="https://osharpesportfolio.vercel.app" >O. Sharpe's Portfolio</Link>
      </nav>
    </footer>
  );
};