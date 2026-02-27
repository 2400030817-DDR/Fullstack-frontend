import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShield, FiSend, FiCheckCircle } from 'react-icons/fi'
import './RequestHelp.css'

const needs = [
  { id: 'food', label: 'Food', emoji: '🍽️' },
  { id: 'clothes', label: 'Clothes', emoji: '👕' },
  { id: 'money', label: 'Money', emoji: '💰' },
  { id: 'emergency', label: 'Emergency', emoji: '🚨' },
]

const urgencyLevels = ['Low', 'Medium', 'High', 'Critical']

export default function RequestHelp() {
  const [need, setNeed] = useState('')
  const [family, setFamily] = useState('')
  const [urgency, setUrgency] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="page request-help">
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div className="rh-success card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiCheckCircle className="rh-success__icon" />
            <h2>Request Submitted</h2>
            <p>We've received your request. Our team will review it and connect you with a helper within 24 hours.</p>
            <div className="rh-success__badge">
              <FiShield /> Your identity is fully protected
            </div>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page request-help">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Request <span>Help</span> 🙏
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            You are not alone. Tell us what you need — we'll find someone to help.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container rh-layout">
          <motion.div className="rh-form card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Need selector */}
            <h3 className="rh-label">What do you need?</h3>
            <div className="rh-needs">
              {needs.map(n => (
                <button key={n.id}
                  className={`rh-need ${need === n.id ? 'rh-need--active' : ''}`}
                  onClick={() => setNeed(n.id)}
                >
                  <span>{n.emoji}</span> {n.label}
                </button>
              ))}
            </div>

            {/* Family size */}
            <div className="form-group">
              <label className="form-label">Family Size</label>
              <select className="form-select" value={family} onChange={e => setFamily(e.target.value)}>
                <option value="">Select family size</option>
                <option value="1">Just me</option>
                <option value="2-3">2-3 members</option>
                <option value="4-5">4-5 members</option>
                <option value="6+">6+ members</option>
              </select>
            </div>

            {/* Urgency */}
            <h3 className="rh-label">Urgency Level</h3>
            <div className="rh-urgency">
              {urgencyLevels.map(u => (
                <button key={u}
                  className={`rh-urg ${urgency === u ? 'rh-urg--active' : ''} rh-urg--${u.toLowerCase()}`}
                  onClick={() => setUrgency(u)}
                >
                  {u}
                </button>
              ))}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">📍 Location</label>
              <input className="form-input" placeholder="Area, City, State"
                value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea className="form-textarea" placeholder="Describe your situation briefly (optional)..."
                value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            <button
              className="btn btn-primary btn-lg rh-submit"
              onClick={() => setSubmitted(true)}
              disabled={!need || !family || !urgency || !location}
            >
              <FiSend /> Submit Request
            </button>
          </motion.div>

          <div className="rh-sidebar">
            <div className="card rh-privacy">
              <div className="rh-privacy__icon"><FiShield /></div>
              <h3>Your Identity Remains Protected</h3>
              <p>We never share your personal information. Your request is handled with complete confidentiality and dignity.</p>
              <ul>
                <li>✓ Name kept anonymous to donors</li>
                <li>✓ Location shared only with assigned volunteer</li>
                <li>✓ No public listing of your request</li>
                <li>✓ Data encrypted and secure</li>
              </ul>
            </div>

            <div className="card rh-process">
              <h3>What happens next?</h3>
              <div className="rh-process__steps">
                <div className="rh-process__step">
                  <span className="rh-process__num">1</span>
                  <div>
                    <strong>Review</strong>
                    <p>Our team reviews your request within hours</p>
                  </div>
                </div>
                <div className="rh-process__step">
                  <span className="rh-process__num">2</span>
                  <div>
                    <strong>Match</strong>
                    <p>We find the right donor or resource</p>
                  </div>
                </div>
                <div className="rh-process__step">
                  <span className="rh-process__num">3</span>
                  <div>
                    <strong>Deliver</strong>
                    <p>A volunteer delivers to your location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
