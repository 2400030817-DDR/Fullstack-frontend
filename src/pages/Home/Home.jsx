import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { FiHeart, FiArrowRight, FiUsers, FiPackage, FiShield, FiMapPin, FiClock, FiSearch } from 'react-icons/fi'
import { BsHandbag, BsShieldCheck } from 'react-icons/bs'
import HeartAnimation from '../../components/HeartAnimation.jsx'
import './Home.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' }
  })
}

const pnFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const pnStagger = { show: { transition: { staggerChildren: 0.06 } } }

const stats = [
  { icon: '🍽️', label: 'Meals Shared', val: 48500, suffix: '+' },
  { icon: '👕', label: 'Clothes Donated', val: 23100, suffix: '+' },
  { icon: '💰', label: 'Funds Raised', val: 18, suffix: 'L+', prefix: '₹' },
  { icon: '❤️', label: 'Lives Helped', val: 12400, suffix: '+' },
]

const steps = [
  { icon: <FiHeart />, title: 'Choose How to Help', desc: 'Pick clothes, essentials, money or join an emergency drive.' },
  { icon: <FiPackage />, title: 'We Prepare & Match', desc: 'Donations are checked and matched with the right person in need.' },
  { icon: <BsHandbag />, title: 'Delivered with Love', desc: 'A volunteer picks up and delivers — track the entire journey.' },
  { icon: <BsShieldCheck />, title: 'See Your Impact', desc: 'Get a real thank-you and see exactly how your help changed a life.' },
]

const stories = [
  { q: "My children received warm clothes last winter. I couldn't stop crying. Thank you.", name: 'Sunita D.', role: 'Mother of 3, Jaipur' },
  { q: "Donating through HelpBeat felt personal — I even got a photo of the family I helped.", name: 'Arjun M.', role: 'Donor, Mumbai' },
  { q: "As a volunteer, delivering food and seeing grateful eyes — there is nothing like it.", name: 'Priya S.', role: 'Volunteer, Delhi' },
]

/* ----- People Needs Data ----- */
const pnCategories = [
  { id: 'all', label: 'All', emoji: '📋' },
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

const needsRequests = [
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
    desc: 'My sister (28) has been on dialysis for 2 years. We are looking for a compatible kidney donor. O+ blood group.',
    location: 'Mumbai', hospital: 'Kokilaben Hospital',
    time: '1 hr ago', name: 'Arjun M.', verified: true, helpers: 7,
  },
  {
    id: 3, type: 'clothes', urgency: 'high',
    title: 'Winter Clothes for 15 Children',
    desc: 'An orphanage in Shimla has 15 children aged 4-12 who desperately need warm jackets, sweaters and socks.',
    location: 'Shimla, HP',
    time: '2 hrs ago', name: 'Neha Foundation', verified: true, helpers: 11,
  },
  {
    id: 4, type: 'food', urgency: 'high',
    title: 'Daily Meals for Elderly Couple',
    desc: 'An elderly couple (both 75+) living alone in Bandra. They can barely walk. Need someone to provide daily meals.',
    location: 'Mumbai',
    time: '3 hrs ago', name: 'Ravi S.', verified: false, helpers: 5,
  },
  {
    id: 5, type: 'blood', urgency: 'critical',
    title: 'AB- Platelets — Dengue Emergency',
    desc: 'Platelet count dropped to 15,000. Urgently need AB- platelet donors. Patient is a 10-year-old child.',
    location: 'Gurugram', hospital: 'Max Hospital',
    time: '28 min ago', name: 'Sunita D.', verified: true, helpers: 2,
  },
  {
    id: 6, type: 'medical', urgency: 'high',
    title: 'Wheelchair Needed for Polio Patient',
    desc: 'A 35-year-old polio patient needs a wheelchair. Family cannot afford one. Any donated wheelchair will help.',
    location: 'Patna, Bihar',
    time: '5 hrs ago', name: 'Amit J.', verified: false, helpers: 1,
  },
  {
    id: 7, type: 'financial', urgency: 'medium',
    title: '₹15,000 for Heart Surgery (Child)',
    desc: 'A 6-year-old from a daily wage family needs heart valve surgery. ₹15,000 is still needed for medicines.',
    location: 'Lucknow, UP',
    time: '6 hrs ago', name: 'Kiran R.', verified: true, helpers: 18,
  },
  {
    id: 8, type: 'shelter', urgency: 'high',
    title: 'Temporary Shelter for Family of 5',
    desc: 'A family lost their home in a fire last night. Parents + 3 small children need temporary shelter urgently.',
    location: 'Kolkata',
    time: '4 hrs ago', name: 'Asha Trust', verified: true, helpers: 9,
  },
  {
    id: 9, type: 'education', urgency: 'medium',
    title: 'School Fees for 3 Tribal Girls',
    desc: 'Three talented girls from an Adivasi community need sponsors for school fees (₹8,000/year each).',
    location: 'Ranchi, Jharkhand',
    time: '8 hrs ago', name: 'Tribal Ed. Trust', verified: true, helpers: 6,
  },
  {
    id: 10, type: 'clothes', urgency: 'medium',
    title: 'Sarees & Clothes for Flood Victims',
    desc: '50 women in a flood-affected village lost all clothing. Need sarees, salwar suits, and undergarments.',
    location: 'Assam',
    time: '10 hrs ago', name: 'FloodAid NGO', verified: true, helpers: 14,
  },
  {
    id: 11, type: 'food', urgency: 'medium',
    title: 'Monthly Ration for 20 Families',
    desc: 'Slum community near railway tracks — 20 families with no steady income need a month of ration kits.',
    location: 'Chennai',
    time: '12 hrs ago', name: 'Anbu Hands', verified: true, helpers: 22,
  },
  {
    id: 12, type: 'organs', urgency: 'high',
    title: 'Liver Donor Awareness — AB+',
    desc: 'A 42-year-old teacher needs a living donor liver transplant. AB+ compatible. Seeking willing donors.',
    location: 'Gurugram', hospital: 'Medanta Hospital',
    time: '1 day ago', name: 'Family of Patient', verified: true, helpers: 4,
  },
]

export default function Home() {
  const [pnCat, setPnCat] = useState('all')
  const [pnSearch, setPnSearch] = useState('')
  const [helped, setHelped] = useState([])

  const pnFiltered = needsRequests
    .filter(r => pnCat === 'all' || r.type === pnCat)
    .filter(r =>
      !pnSearch ||
      r.title.toLowerCase().includes(pnSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(pnSearch.toLowerCase()) ||
      r.desc.toLowerCase().includes(pnSearch.toLowerCase())
    )
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 }
      return order[a.urgency] - order[b.urgency]
    })

  const criticalCount = needsRequests.filter(r => r.urgency === 'critical').length
  const toggleHelp = (id) => setHelped(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__circle hero__circle--1" />
          <div className="hero__circle hero__circle--2" />
          <div className="hero__circle hero__circle--3" />
        </div>

        <div className="container hero__grid">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge badge-red">❤️ Trusted by 12,000+ people</span>
            <h1 className="hero__title">
              Help a Heart<br />
              Beat <span>Stronger</span>
            </h1>
            <p className="hero__sub">
              Donate clothes, essentials, or money to people near you who need it most.
              Track your kindness in real-time. See the smile you create.
            </p>
            <div className="hero__btns">
              <Link to="/donate" className="btn btn-primary btn-lg">
                <FiHeart /> Donate Now
              </Link>
              <Link to="/request-help" className="btn btn-outline btn-lg">
                Request Help
              </Link>
              <Link to="/dashboard/volunteer" className="btn btn-ghost btn-lg">
                Become Volunteer <FiArrowRight />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeartAnimation />
          </motion.div>
        </div>
      </section>

      {/* ===== LIVE COUNTERS ===== */}
      <section className="section counters">
        <div className="container">
          <div className="section-header">
            <motion.h2 className="section-title"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={0}
            >
              The Kindness <span>So Far</span> ✨
            </motion.h2>
            <motion.p className="section-sub"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={1}
            >
              Real numbers. Real lives changed. Every count is a human story.
            </motion.p>
          </div>
          <div className="counters__grid">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="counters__card card card-red"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i + 2}
              >
                <div className="counters__icon">{s.icon}</div>
                <div className="counters__val">
                  {s.prefix}<CountUp end={s.val} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />{s.suffix}
                </div>
                <div className="counters__label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section how">
        <div className="container">
          <div className="section-header">
            <motion.h2 className="section-title"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={0}
            >
              How Your <span>Kindness</span> Travels
            </motion.h2>
            <motion.p className="section-sub"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={1}
            >
              Four simple steps from your heart to someone's hands.
            </motion.p>
          </div>
          <div className="how__grid">
            {steps.map((s, i) => (
              <motion.div key={s.title} className="how__step"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i + 2}
              >
                <div className="how__num">{i + 1}</div>
                <div className="how__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PEOPLE NEED HELP ===== */}
      <section className="section pn-home" id="people-need">
        <div className="container">
          <div className="section-header">
            <motion.div
              className="pn-live-badge"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="pn-live-dot" />
              {criticalCount} critical requests right now
            </motion.div>
            <motion.h2 className="section-title"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={0}
            >
              People Need <span>Your Help</span>
            </motion.h2>
            <motion.p className="section-sub"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={1}
            >
              Real people. Real needs. See who needs help and respond with kindness.
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            className="pn-toolbar"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pn-search">
              <FiSearch className="pn-search-icon" />
              <input
                type="text"
                placeholder="Search by need, location, or keyword..."
                value={pnSearch}
                onChange={(e) => setPnSearch(e.target.value)}
                className="pn-search-input"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="pn-cats"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {pnCategories.map(c => (
              <button
                key={c.id}
                className={`pn-cat ${pnCat === c.id ? 'pn-cat--active' : ''}`}
                onClick={() => setPnCat(c.id)}
              >
                <span className="pn-cat-emoji">{c.emoji}</span>
                {c.label}
                {c.id !== 'all' && (
                  <span className="pn-cat-count">
                    {needsRequests.filter(r => r.type === c.id).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <div className="pn-results-bar">
            <p className="pn-results-count">
              Showing <strong>{pnFiltered.length}</strong> request{pnFiltered.length !== 1 ? 's' : ''}
              {pnCat !== 'all' && <> in <strong>{pnCategories.find(c => c.id === pnCat)?.label}</strong></>}
            </p>
          </div>

          {/* Request Cards Grid */}
          <motion.div
            className="pn-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={pnStagger}
            key={pnCat + pnSearch}
          >
            <AnimatePresence mode="popLayout">
              {pnFiltered.map(r => {
                const urg = urgencyMap[r.urgency]
                const isHelped = helped.includes(r.id)
                return (
                  <motion.div
                    key={r.id}
                    className={`pn-card ${urg.pulse ? 'pn-card--critical' : ''}`}
                    variants={pnFadeUp}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="pn-card-top">
                      <div className="pn-card-type">
                        <span className="pn-card-type-emoji">
                          {pnCategories.find(c => c.id === r.type)?.emoji}
                        </span>
                        <span className="pn-card-type-label">
                          {pnCategories.find(c => c.id === r.type)?.label}
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
                    <h3 className="pn-card-title">{r.title}</h3>
                    <p className="pn-card-desc">{r.desc}</p>
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
                    <div className="pn-card-footer">
                      <div className="pn-card-author">
                        <div className="pn-card-avatar">{r.name[0]}</div>
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

          {pnFiltered.length === 0 && (
            <div className="pn-empty">
              <div className="pn-empty-emoji">🔍</div>
              <h3>No requests found</h3>
              <p>Try a different category or search term.</p>
            </div>
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

      {/* ===== STORIES ===== */}
      <section className="section stories">
        <div className="container">
          <div className="section-header">
            <motion.h2 className="section-title"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={0}
            >
              Stories That <span>Warm</span> the Heart
            </motion.h2>
          </div>
          <div className="grid-3">
            {stories.map((s, i) => (
              <motion.div key={s.name} className="stories__card card"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i + 1}
              >
                <p className="stories__quote">"{s.q}"</p>
                <div className="stories__author">
                  <div className="stories__avatar">{s.name[0]}</div>
                  <div>
                    <div className="stories__name">{s.name}</div>
                    <div className="stories__role">{s.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta">
        <div className="container">
          <motion.div className="cta__card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Make a <span>Difference?</span></h2>
            <p>It only takes a moment to change someone's day. Your small act of kindness creates ripples of hope.</p>
            <div className="cta__btns">
              <Link to="/donate" className="btn btn-white btn-lg"><FiHeart /> Start Helping</Link>
              <Link to="/community" className="btn btn-outline btn-lg" style={{borderColor:'#fff',color:'#fff'}}>
                See Stories <FiArrowRight />
              </Link>
            </div>
            <div className="cta__trust">
              <span><FiShield /> 100% Transparent</span>
              <span><FiUsers /> Verified Recipients</span>
              <span><FiPackage /> Live Tracking</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
