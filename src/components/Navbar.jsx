import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiMenu, FiX, FiUser } from 'react-icons/fi'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/donate', label: 'Donate' },
  { to: '/request-help', label: 'Request Help' },
  { to: '/tracking', label: 'Track' },
  { to: '/transparency', label: 'Transparency' },
  { to: '/emergency', label: 'Emergency' },
  { to: '/community', label: 'Community' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [loc])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-heart">
            <FiHeart />
          </span>
          <span className="nav__logo-text">HelpBeat</span>
        </Link>

        <div className="nav__links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav__link ${loc.pathname === l.to ? 'nav__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav__actions">
          <Link to="/dashboard/donor" className="btn btn-sm btn-ghost">
            <FiUser /> Dashboard
          </Link>
          <Link to="/donate/money" className="btn btn-sm btn-primary">
            <FiHeart /> Donate
          </Link>
        </div>

        <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav__mobile-link ${loc.pathname === l.to ? 'nav__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="nav__mobile-btns">
              <Link to="/dashboard/donor" className="btn btn-sm btn-ghost">Dashboard</Link>
              <Link to="/donate/money" className="btn btn-sm btn-primary">Donate</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
