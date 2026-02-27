import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCheckCircle, FiPackage, FiUser, FiTruck,
  FiHeart, FiPhone, FiCamera, FiAlertTriangle, FiClock, FiMapPin
} from 'react-icons/fi'
import './Tracking.css'

const trackingSteps = [
  { icon: <FiPackage />, label: 'Donation Received', msg: 'We received your kind donation', time: 'Feb 24, 10:30 AM', done: true },
  { icon: <FiCheckCircle />, label: 'Quality Checked', msg: 'Items inspected and packed with care', time: 'Feb 24, 2:15 PM', done: true },
  { icon: <FiUser />, label: 'Volunteer Assigned', msg: 'Rahul K. is on his way to deliver', time: 'Feb 25, 9:00 AM', done: true },
  { icon: <FiTruck />, label: 'Out for Delivery', msg: 'Currently en route to the recipient', time: 'Feb 25, 11:30 AM', done: true },
  { icon: <FiHeart />, label: 'Delivered', msg: 'Successfully delivered with love!', time: 'Feb 25, 1:45 PM', done: false },
]

export default function Tracking() {
  const currentStep = 3 // 0-indexed, "Out for Delivery"

  return (
    <div className="page tracking">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Your Kindness is on its <span>Journey</span> ❤️
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Track every step of your donation — from your heart to someone's hands.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container tr-layout">
          {/* LEFT — Timeline */}
          <div className="tr-main">
            {/* Tracking ID */}
            <div className="card tr-id-card">
              <div className="tr-id-row">
                <div>
                  <span className="tr-id-label">Tracking ID</span>
                  <span className="tr-id-val">#HB-2026-04821</span>
                </div>
                <span className="badge badge-green">● In Transit</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="tr-timeline">
              {trackingSteps.map((step, i) => {
                const isActive = i === currentStep
                const isDone = i < currentStep
                const isFuture = i > currentStep
                return (
                  <motion.div
                    key={step.label}
                    className={`tr-step ${isDone ? 'tr-step--done' : ''} ${isActive ? 'tr-step--active' : ''} ${isFuture ? 'tr-step--future' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="tr-step__line">
                      <div className="tr-step__dot">
                        {isDone ? <FiCheckCircle /> : step.icon}
                      </div>
                      {i < trackingSteps.length - 1 && <div className="tr-step__connector" />}
                    </div>
                    <div className="tr-step__content">
                      <div className="tr-step__header">
                        <h4>{step.label}</h4>
                        <span className="tr-step__time"><FiClock /> {step.time}</span>
                      </div>
                      <p>{step.msg}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Map Illustration */}
            <div className="card tr-map">
              <div className="tr-map__header">
                <h3><FiMapPin /> Live Location</h3>
                <span className="badge badge-orange">ETA: 25 min</span>
              </div>
              <div className="tr-map__visual">
                <div className="tr-map__road">
                  <div className="tr-map__start">📦 Hub</div>
                  <div className="tr-map__path">
                    <motion.div
                      className="tr-map__truck"
                      animate={{ left: ['10%', '70%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🚗
                    </motion.div>
                    <div className="tr-map__dashes" />
                  </div>
                  <div className="tr-map__end">🏠 Delivery</div>
                </div>
              </div>
            </div>

            {/* After Delivery Section */}
            <div className="card tr-proof">
              <h3>📸 Delivery Proof</h3>
              <div className="tr-proof__placeholder">
                <FiCamera />
                <p>Photo will appear here after delivery</p>
              </div>
              <div className="tr-proof__note">
                <h4>💌 Thank You Note</h4>
                <p className="tr-proof__msg">
                  <em>"Your donation arrived today. The children were so happy with the warm clothes.
                  God bless you! — A grateful family"</em>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Volunteer + Actions */}
          <div className="tr-sidebar">
            {/* Volunteer card */}
            <div className="card tr-volunteer">
              <h3>🙋 Your Volunteer</h3>
              <div className="tr-vol__info">
                <div className="tr-vol__avatar">R</div>
                <div>
                  <div className="tr-vol__name">Rahul Kumar</div>
                  <div className="tr-vol__rating">⭐ 4.9 · 128 deliveries</div>
                </div>
              </div>
              <button className="btn btn-outline btn-sm tr-vol__contact">
                <FiPhone /> Contact Volunteer
              </button>
            </div>

            {/* Items summary */}
            <div className="card tr-items">
              <h3>📋 Items Summary</h3>
              <ul>
                <li><span>👕</span> Winter jackets × 3</li>
                <li><span>🧣</span> Woolen scarves × 2</li>
                <li><span>🧤</span> Gloves × 4 pairs</li>
                <li><span>🛏️</span> Blanket × 1</li>
              </ul>
            </div>

            {/* Report problem */}
            <div className="card tr-report">
              <h3><FiAlertTriangle /> Need Help?</h3>
              <p>Something not right with your donation delivery?</p>
              <Link to="/support" className="btn btn-ghost btn-sm">
                Report a Problem
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
