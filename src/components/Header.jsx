import { Link } from 'react-router'
import '../css/Navigation.css'


export default function Header(){

  return(
    <header className="main-header">
              <div className="logo">
                <Link to="/">
                  <h2>THOK</h2>
                </Link>
                  
              </div>
              <nav className="nav-links">
                  <Link to="/shop-keyboards">Custom Keyboards</Link>
                  <Link to="/shop-keycaps">Keycaps</Link>
                  <Link to="/shop-switches">Switches</Link>
                  <Link to="/shop-accessories">Accessories</Link>
                  <Link to="/custom-keyboard-3d">Custom</Link>
              </nav>
              <div className="nav-icons">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fa-regular fa-user"></i>
                  <i className="fa-solid fa-cart-shopping"></i>
              </div>
          </header>
  )
} 