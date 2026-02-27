import { Link } from 'react-router-dom'
import { FiHeart, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C320,80 640,0 960,40 C1120,60 1320,50 1440,40 L1440,80 L0,80Z" fill="var(--red-50)" />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <FiHeart className="footer__logo-icon" />
                <span>HelpBeat</span>
              </div>
              <p className="footer__quote">"Every heartbeat matters"</p>
              <p className="footer__desc">
                Connecting generous hearts with people who need it most.
                Every act of kindness sends a ripple of hope.
              </p>
              <div className="footer__socials">
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="footer__social"><Icon /></a>
                ))}
              </div>
            </div>

            <div className="footer__col">
              <h4>Help</h4>
              <Link to="/donate">Donate</Link>
              <Link to="/donate/money">Donate Money</Link>
              <Link to="/donate/clothes">Donate Clothes</Link>
              <Link to="/request-help">Request Help</Link>
            </div>

            <div className="footer__col">
              <h4>Explore</h4>
              <Link to="/tracking">Track Donation</Link>
              <Link to="/emergency">Emergency Drives</Link>
              <Link to="/transparency">Transparency</Link>
              <Link to="/community">Community</Link>
            </div>

            <div className="footer__col">
              <h4>Contact</h4>
              <div className="footer__info"><FiMail /> hello@helpbeat.org</div>
              <div className="footer__info"><FiPhone /> +91 98765 43210</div>
              <div className="footer__info"><FiMapPin /> New Delhi, India</div>
              <p className="footer__emergency">24/7 Emergency Line</p>
            </div>
          </div>

          <div className="footer__bottom">
            <p>© 2026 HelpBeat. Made with ❤️ for humanity.</p>
            <div className="footer__bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
