import '../css/Navigation.css'

export default function Footer(){
  return(
    <footer className="main-footer">
              <div className="footer-columns">
                  <div className="footer-col">
                      <h4>About Us</h4>
                      <a href="about-me/my-story.html">Our Story</a>
                      <a href="about-me/contacts.html">Contact Us</a>
                  </div>
                  <div className="footer-col">
                      <h4>Support</h4>
                      <a href="policy.html">Policy</a>
                      <a href="return_policy.html">Return and Shipping Policy</a>
                      <a href="#">Track Order</a>
                  </div>
                  <div className="footer-col">
                      <h4>Community</h4>
                      <a href="#">Facebook Group</a>
                      <a href="#">Discord</a>
                      <a href="#">Reddit</a>
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