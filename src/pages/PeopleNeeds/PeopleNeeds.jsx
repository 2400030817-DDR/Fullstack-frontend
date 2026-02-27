import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiMapPin, FiClock, FiHeart, FiAlertTriangle, FiSearch } from 'react-icons/fi'
import './PeopleNeeds.css'

const categories = [
  { id: 'all', label: 'All Requests', emoji: '📋' },
  { id: 'clothes', label: 'Clothes', emoji: '👕' },
  { id: 'food', label: 'Food', emoji: '🍽️' },
  { id: 'blood', label: 'Blood', emoji: '🩸' },
  { id: 'organs', label: 'Organs', emoji: '🫀' },
  { id: 'medical', label: 'Medical', emoji: '💊' },
  { id: 'financial', label: 'Financial', emoji: '💰' },
  { id: 'shelter', label: 'Shelter', emoji: '🏠' },
  { id: 'education', label: 'Education', emoji: '📚' },
]

const urgencyMap = {
  critical: { label: 'Critical', color: '#DC2626', bg: '#FEE2E2', pulse: true },
  high: { label: 'Urgent', color: '#EA580C', bg: '#FFF7ED' },
  medium: { label: 'Moderate', color: '#D97706', bg: '#FFFBEB' },
  low: { label: 'Low', color: '#16A34A', bg: '#F0FDF4' },
}

const mockRequests = [
  {
    id: 1, type: 'blood', urgency: 'critical',
    title: 'B+ Blood Needed Urgently',
    desc: 'My father is in ICU after an accident. We need 4 units of B+ blood immediately. AIIMS Hospital, Delhi.',
    location: 'New Delhi', hospital: 'AIIMS Hospital',
    time: '12 min ago', name: 'Priya K.', verified: true, helpers: 3,
  },
  {
    id: 2, type: 'organs', urgency: 'critical',
    title: 'Kidney Donor Needed — O+',
    desc: 'My sister (28) has been on dialysis for 2 years. We are looking for a compatible kidney donor. O+ blood group. All expenses covered.',
    location: 'Mumbai', hospital: 'Kokilaben Hospital',
    time: '1 hr ago', name: 'Arjun M.', verified: true, helpers: 7,
  },
  {
    id: 3, type: 'clothes', urgency: 'high',
    title: 'Winter Clothes for 15 Children',
    desc: 'An orphanage in Shimla has 15 children aged 4-12 who desperately need warm jackets, sweaters and socks for the ongoing cold wave.',
    location: 'Shimla, HP',
    time: '2 hrs ago', name: 'Neha Foundation', verified: true, helpers: 11,
  },
  {
    id: 4, type: 'food', urgency: 'high',
    title: 'Daily Meals for Elderly Couple',
    desc: 'An elderly couple (both 75+) living alone in Bandra. They can barely walk. Need someone to provide daily meals or tiffin service.',
    location: 'Mumbai',
    time: '3 hrs ago', name: 'Ravi S.', verified: false, helpers: 5,
  },
  {
    id: 5, type: 'blood', urgency: 'critical',
    title: 'AB- Platelets — Dengue Emergency',
    desc: 'Platelet count dropped to 15,000. Urgently need AB- platelet donors. Patient is a 10-year-old child at Max Hospital.',
    location: 'Gurugram', hospital: 'Max Hospital',
    time: '28 min ago', name: 'Sunita D.', verified: true, helpers: 2,
  },
  {
    id: 6, type: 'medical', urgency: 'high',
    title: 'Wheelchair Needed for Polio Patient',
    desc: 'A 35-year-old polio patient needs a wheelchair. Family cannot afford one. Any donated or used wheelchair in working condition will help.',
    location: 'Patna, Bihar',
    time: '5 hrs ago', name: 'Amit J.', verified: false, helpers: 1,
  },
  {
    id: 7, type: 'financial', urgency: 'medium',
    title: '₹15,000 for Heart Surgery (Child)',
    desc: 'A 6-year-old from a daily wage family needs heart valve surgery. Govt hospital covers most costs, but ₹15,000 is still needed for medicines.',
    location: 'Lucknow, UP',
    time: '6 hrs ago', name: 'Kiran R.', verified: true, helpers: 18,
  },
  {
    id: 8, type: 'shelter', urgency: 'high',
    title: 'Temporary Shelter for Family of 5',
    desc: 'A family lost their home in a fire last night. Parents + 3 small children need temporary shelter and basic supplies urgently.',
    location: 'Kolkata',
    time: '4 hrs ago', name: 'Asha Trust', verified: true, helpers: 9,
  },
  {
    id: 9, type: 'education', urgency: 'medium',
    title: 'School Fees for 3 Tribal Girls',
    desc: 'Three talented girls from an Adivasi community in Jharkhand need sponsors for school fees (₹8,000/year each). They topped their class last year.',
    location: 'Ranchi, Jharkhand',
    time: '8 hrs ago', name: 'Tribal Ed. Trust', verified: true, helpers: 6,
  },
  {
    id: 10, type: 'clothes', urgency: 'medium',
    title: 'Sarees & Clothes for Flood Victims',
    desc: '50 women in a flood-affected village lost all clothing. Need sarees, salwar suits, and undergarments. Any size welcome.',
    location: 'Assam',
    time: '10 hrs ago', name: 'FloodAid NGO', verified: true, helpers: 14,
  },
  {
    id: 11, type: 'food', urgency: 'medium',
    title: 'Monthly Ration for 20 Families',
    desc: 'Slum community near railway tracks — 20 families with no steady income need a month of ration kits (rice, dal, oil, sugar, tea).',
    location: 'Chennai',
    time: '12 hrs ago', name: 'Anbu Hands', verified: true, helpers: 22,
  },
  {
    id: 12, type: 'organs', urgency: 'high',
    title: 'Liver Donor Awareness — AB+',
    desc: 'A 42-year-old teacher needs a living donor liver transplant. AB+ compatible. Seeking donors willing to undergo evaluation at Medanta.',
    location: 'Gurugram', hospital: 'Medanta Hospital',
    time: '1 day ago', name: 'Family of Patient', verified: true, helpers: 4,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { show: { transition: { staggerChildren: 0.06 } } }

export default function PeopleNeeds() {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [helped, setHelped] = useState([])

  const filtered = mockRequests
    .filter(r => cat === 'all' || r.type === cat)
    .filter(r =>
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 }
      return order[a.urgency] - order[b.urgency]
    })

  const criticalCount = mockRequests.filter(r => r.urgency === 'critical').length
  const toggleHelp = (id) => setHelped(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="page people-needs">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pn-hero-content"
          >
            <div className="pn-live-badge">
              <span className="pn-live-dot" />
              {criticalCount} critical requests right now
            </div>
            <h1 className="section-title">
              People Need <span>Your Help</span>
            </h1>
            <p className="section-sub">
              Real people. Real needs. See who needs help near you and respond with kindness.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section pn-section">
        <div className="container">
          {/* Search + Filter Bar */}
          <motion.div
            className="pn-toolbar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="pn-search">
              <FiSearch className="pn-search-icon" />
              <input
                type="text"
                placeholder="Search by need, location, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pn-search-input"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="pn-cats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map(c => (
              <button
                key={c.id}
                className={`pn-cat ${cat === c.id ? 'pn-cat--active' : ''}`}
                onClick={() => setCat(c.id)}
              >
                <span className="pn-cat-emoji">{c.emoji}</span>
                {c.label}
                {c.id !== 'all' && (
                  <span className="pn-cat-count">
                    {mockRequests.filter(r => r.type === c.id).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <motion.div
            className="pn-results-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <p className="pn-results-count">
              Showing <strong>{filtered.length}</strong> request{filtered.length !== 1 ? 's' : ''}
              {cat !== 'all' && <> in <strong>{categories.find(c => c.id === cat)?.label}</strong></>}
            </p>
          </motion.div>

          {/* Request Cards Grid */}
          <motion.div
            className="pn-grid"
            initial="hidden"
            animate="show"
            variants={stagger}
            key={cat + search}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(r => {
                const urg = urgencyMap[r.urgency]
                const isHelped = helped.includes(r.id)
                return (
                  <motion.div
                    key={r.id}
                    className={`pn-card ${urg.pulse ? 'pn-card--critical' : ''}`}
                    variants={fadeUp}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {/* Top bar */}
                    <div className="pn-card-top">
                      <div className="pn-card-type">
                        <span className="pn-card-type-emoji">
                          {categories.find(c => c.id === r.type)?.emoji}
                        </span>
                        <span className="pn-card-type-label">
                          {categories.find(c => c.id === r.type)?.label}
                        </span>
                      </div>
                      <span
                        className="pn-urgency-badge"
                        style={{ background: urg.bg, color: urg.color }}
                      >
                        {urg.pulse && <span className="pn-urgency-pulse" />}
                        {urg.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="pn-card-title">{r.title}</h3>

                    {/* Description */}
                    <p className="pn-card-desc">{r.desc}</p>

                    {/* Meta */}
                    <div className="pn-card-meta">
                      <span className="pn-card-meta-item">
                        <FiMapPin /> {r.location}
                      </span>
                      {r.hospital && (
                        <span className="pn-card-meta-item pn-card-meta-hospital">
                          🏥 {r.hospital}
                        </span>
                      )}
                      <span className="pn-card-meta-item">
                        <FiClock /> {r.time}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="pn-card-footer">
                      <div className="pn-card-author">
                        <div className="pn-card-avatar">
                          {r.name[0]}
                        </div>
                        <div>
                          <span className="pn-card-name">{r.name}</span>
                          {r.verified && (
                            <span className="pn-verified-badge">✓ Verified</span>
                          )}
                        </div>
                      </div>
                      <div className="pn-card-actions">
                        <span className="pn-helpers-count">
                          <FiHeart /> {r.helpers + (isHelped ? 1 : 0)} helping
                        </span>
                        <button
                          className={`btn btn-sm ${isHelped ? 'btn-primary' : 'btn-outline'}`}
                          onClick={() => toggleHelp(r.id)}
                        >
                          {isHelped ? '❤️ Helping' : '🤝 I Can Help'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              className="pn-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="pn-empty-emoji">🔍</div>
              <h3>No requests found</h3>
              <p>Try a different category or search term.</p>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            className="pn-bottom-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pn-bottom-cta-inner">
              <div>
                <h3>Are you in need of help?</h3>
                <p>Your identity stays anonymous. Submit a request and let the community help you.</p>
              </div>
              <Link to="/request-help" className="btn btn-primary btn-lg">
                🙏 Request Help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
