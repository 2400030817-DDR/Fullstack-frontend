import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiUpload, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi'
import './Support.css'

const issueTypes = [
  { id: 'not-delivered', label: 'Not Delivered', emoji: '📦' },
  { id: 'wrong-items', label: 'Wrong Items', emoji: '❌' },
  { id: 'damaged', label: 'Damaged Items', emoji: '💔' },
  { id: 'delay', label: 'Excessive Delay', emoji: '⏰' },
  { id: 'other', label: 'Other Issue', emoji: '❓' },
]

const mockTickets = [
  { id: '#TK-4821', issue: 'Delay in delivery', status: 'Under Review', date: 'Feb 23, 2026', color: 'orange' },
  { id: '#TK-4590', issue: 'Wrong items received', status: 'Resolved', date: 'Feb 18, 2026', color: 'green' },
]

export default function Support() {
  const [issue, setIssue] = useState('')
  const [desc, setDesc] = useState('')
  const [trackingId, setTrackingId] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="page support">
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div className="sp-success card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiCheckCircle className="sp-success__icon" />
            <h2>Ticket Raised Successfully</h2>
            <p>Your ticket <strong>#TK-5023</strong> has been created. Our team will respond within 24 hours.</p>
            <div className="sp-status-tracker">
              <div className="sp-status-step sp-status-step--active">
                <div className="sp-status-dot" />
                <span>Open</span>
              </div>
              <div className="sp-status-line" />
              <div className="sp-status-step">
                <div className="sp-status-dot" />
                <span>Under Review</span>
              </div>
              <div className="sp-status-line" />
              <div className="sp-status-step">
                <div className="sp-status-dot" />
                <span>Resolved</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
              Raise Another Ticket
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page support">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Support & <span>Complaints</span>
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Having an issue? We're here to help make it right.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container sp-layout">
          <div className="sp-form-section">
            <motion.div className="card sp-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3><FiAlertTriangle /> Report a Problem</h3>

              {/* Tracking ID */}
              <div className="form-group">
                <label className="form-label">Tracking ID</label>
                <div className="sp-tracking-input">
                  <input className="form-input" placeholder="#HB-2026-XXXXX"
                    value={trackingId} onChange={e => setTrackingId(e.target.value)} />
                  <FiSearch className="sp-tracking-icon" />
                </div>
              </div>

              {/* Issue Type */}
              <h4 className="sp-label">What went wrong?</h4>
              <div className="sp-issues">
                {issueTypes.map(t => (
                  <button key={t.id}
                    className={`sp-issue ${issue === t.id ? 'sp-issue--active' : ''}`}
                    onClick={() => setIssue(t.id)}
                  >
                    <span>{t.emoji}</span> {t.label}
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Describe the Problem</label>
                <textarea className="form-textarea" placeholder="Tell us what happened..."
                  value={desc} onChange={e => setDesc(e.target.value)} rows={4} />
              </div>

              {/* Upload proof */}
              <label className="sp-upload" style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
                <FiUpload />
                <div>
                  <strong>Upload Proof (optional)</strong>
                  <p>Photos of damaged items, wrong delivery etc.</p>
                </div>
              </label>

              <button
                className="btn btn-primary btn-lg sp-submit"
                onClick={() => setSubmitted(true)}
                disabled={!issue || !desc.trim()}
              >
                Submit Ticket
              </button>
            </motion.div>
          </div>

          <div className="sp-sidebar">
            {/* Existing Tickets */}
            <div className="card sp-tickets">
              <h3><FiClock /> Your Tickets</h3>
              {mockTickets.map(t => (
                <div key={t.id} className="sp-ticket">
                  <div className="sp-ticket__header">
                    <span className="sp-ticket__id">{t.id}</span>
                    <span className={`badge badge-${t.color}`}>{t.status}</span>
                  </div>
                  <p className="sp-ticket__issue">{t.issue}</p>
                  <p className="sp-ticket__date">{t.date}</p>
                </div>
              ))}
            </div>

            {/* Help info */}
            <div className="card sp-info">
              <h3>💡 Before Raising a Ticket</h3>
              <ul>
                <li>Check your tracking page for live updates</li>
                <li>Deliveries may take 24-72 hours depending on distance</li>
                <li>Contact your volunteer directly from the tracking page</li>
                <li>For emergencies, call our 24/7 helpline</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
