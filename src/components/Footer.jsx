import '../css/Navigation.css'
import { Link } from "react-router";


export default function Footer(){
  return(
    <footer className="main-footer">
              <div className="footer-columns">
                  <div className="footer-col">
                      <h4>About Us</h4>
                      <Link to="/my-story">Our Story</Link>
                      <Link to="/contacts">Contact Us</Link>
                  </div>
                  <div className="footer-col">
                      <h4>Support</h4>
                      <Link to="/policy">Policy</Link>
                      <Link to="/return-policy">Return and Shipping Policy</Link>
                      <Link to="#">Track Order</Link>
                  </div>
                  <div className="footer-col">
                      <h4>Community</h4>
                      <Link to="#">Facebook Group</Link>
                      <Link to="#">Discord</Link>
                      <Link to="#">Reddit</Link>
                  </div>
                  <div className="footer-col newsletter">
                      <h4>Stay in the loop</h4>
                      <p>Be the first to know about new releases and exclusive offers.</p>
                      <form action="#">
                          <input type="email" placeholder="Email address" />
                          <button type="submit">→</button>
                      </form>
                  </div>
              </div>
              <div className="footer-bottom">
                  <p>&copy; 2026 THOK. All rights reserved.</p>
              </div>
          </footer>
  )
}