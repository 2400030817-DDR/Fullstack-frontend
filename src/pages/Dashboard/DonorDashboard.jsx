import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiPackage, FiStar, FiAward, FiTruck, FiAlertCircle } from 'react-icons/fi'
import './Dashboard.css'

const donorHistory = [
  { id: '#HB-4821', type: 'Clothes', items: 'Winter jackets × 3', date: 'Feb 24', status: 'In Transit', statusColor: 'orange' },
  { id: '#HB-4650', type: 'Money', items: '₹5,000', date: 'Feb 18', status: 'Delivered', statusColor: 'green' },
  { id: '#HB-4410', type: 'Essentials', items: 'Food packets × 10', date: 'Feb 10', status: 'Delivered', statusColor: 'green' },
  { id: '#HB-4200', type: 'Money', items: '₹2,500', date: 'Jan 28', status: 'Delivered', statusColor: 'green' },
]

const badges = [
  { emoji: '🌱', label: 'First Donation' },
  { emoji: '🔥', label: '5 Donations' },
  { emoji: '💎', label: 'Monthly Donor' },
  { emoji: '⭐', label: 'Impact Star' },
]

export default function DonorDashboard() {
  return (
    <div className="page dashboard">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Welcome Back, <span>Kind Soul</span> ❤️
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Your giving journey at a glance
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Stats Row */}
          <div className="dash-stats">
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiHeart /></div>
              <div className="dash-stat__val">12</div>
              <div className="dash-stat__label">Total Donations</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiTruck /></div>
              <div className="dash-stat__val">1</div>
              <div className="dash-stat__label">Active Tracking</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiStar /></div>
              <div className="dash-stat__val">94</div>
              <div className="dash-stat__label">Impact Score</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiAlertCircle /></div>
              <div className="dash-stat__val">1</div>
              <div className="dash-stat__label">Tickets Raised</div>
            </div>
          </div>

          <div className="dash-grid">
            {/* Donation History */}
            <div className="card dash-history">
              <div className="dash-card-header">
                <h3><FiPackage /> Donation History</h3>
                <Link to="/tracking" className="btn btn-sm btn-ghost">View All</Link>
              </div>
              <div className="dash-table">
                {donorHistory.map(d => (
                  <div key={d.id} className="dash-row">
                    <div className="dash-row__main">
                      <span className="dash-row__id">{d.id}</span>
                      <span className="dash-row__type badge badge-gray">{d.type}</span>
                    </div>
                    <div className="dash-row__items">{d.items}</div>
                    <div className="dash-row__date">{d.date}</div>
                    <span className={`badge badge-${d.statusColor}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <div className="card dash-badges">
                <h3><FiAward /> Badges Earned</h3>
                <div className="dash-badges__grid">
                  {badges.map(b => (
                    <div key={b.label} className="dash-badge">
                      <span className="dash-badge__emoji">{b.emoji}</span>
                      <span className="dash-badge__label">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card dash-quick" style={{ marginTop: 'var(--sp-6)' }}>
                <h3>Quick Actions</h3>
                <div className="dash-quick__btns">
                  <Link to="/donate" className="btn btn-primary btn-sm">New Donation</Link>
                  <Link to="/tracking" className="btn btn-outline btn-sm">Track Active</Link>
                  <Link to="/support" className="btn btn-ghost btn-sm">Support Ticket</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
