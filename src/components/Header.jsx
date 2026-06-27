import { useState } from "react";
import { Link } from "react-router";
import "../css/Navigation.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <h2>THOK</h2>
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/shop-keyboards">Keyboards</Link>
        <Link to="/shop-keycaps">Keycaps</Link>
        <Link to="/shop-switches">Switches</Link>
        <Link to="/shop-accessories">Accessories</Link>
        <Link to="/custom-keyboard-3d">Custom</Link>
      </nav>

      <div className="nav-icons">
        

        <img src="/icons/account.svg" alt="" />
        <img src="/icons/cart-shopping.svg" alt="" />
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="hamburger-menu open">
          <Link to="/shop-keyboards" className="ham-links"
          onClick={() => setMenuOpen(!menuOpen)}>
            <h3>Keyboards</h3>
            <img src="/product3/img3.jpg" alt="" />
          </Link>

          <Link to="/shop-keycaps" className="ham-links"
          onClick={() => setMenuOpen(!menuOpen)}>
            <h3>Keycaps</h3>
            <img src="/key-product1/img1.jpg" alt="" />
          </Link>

          <Link to="/shop-switches" className="ham-links"
          onClick={() => setMenuOpen(!menuOpen)}>
            <h3>Switches</h3>
            <img src="/caps-product1/img1.webp" alt="" />
          </Link>

          <Link to="/shop-accessories" className="ham-links"
          onClick={() => setMenuOpen(!menuOpen)}>
            <h3>Accessories</h3>
            <img src="/acc-product1/img1.webp" alt="" />
          </Link>

          <Link to="/custom-keyboard-3d" className="ham-links"
          onClick={() => setMenuOpen(!menuOpen)}>
            <h3>Custom</h3>
            <img src="/product2/img3.jpg" alt="" />
          </Link>
        </div>
      )}
    </header>
  );
}