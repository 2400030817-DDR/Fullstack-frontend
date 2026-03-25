import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiPackage, FiStar, FiAward, FiTruck, FiAlertCircle } from 'react-icons/fi'
import { getDashboardActivity } from '../../utils/dashboardStorage'
import './Dashboard.css'

const badges = [
  { emoji: '🌱', label: 'First Donation' },
  { emoji: '🔥', label: '5 Donations' },
  { emoji: '💎', label: 'Monthly Donor' },
  { emoji: '⭐', label: 'Impact Star' },
]

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  })
}

export default function DonorDashboard() {
  const [activity, setActivity] = useState([])

  useEffect(() => {
    const syncActivity = () => setActivity(getDashboardActivity())

    syncActivity()
    window.addEventListener('storage', syncActivity)
    window.addEventListener('focus', syncActivity)

    return () => {
      window.removeEventListener('storage', syncActivity)
      window.removeEventListener('focus', syncActivity)
    }
  }, [])

  const donations = activity.filter(item => item.kind === 'donation')
  const helpRequests = activity.filter(item => item.kind === 'request')
  const activeTracking = donations.filter(item => item.status !== 'Delivered').length
  const deliveredDonations = donations.filter(item => item.status === 'Delivered').length
  const impactScore = donations.length === 0 ? 0 : Math.min(100, 70 + donations.length * 5 + deliveredDonations * 2)
  const recentActivity = activity.slice(0, 6)

  return (
    <div className="page dashboard">
      <div className="page-hero">
        <div className="container">
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome Back, <span>Kind Soul</span> ❤️
          </motion.h1>
          <motion.p
            className="section-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Your giving journey at a glance
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="dash-stats">
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiHeart /></div>
              <div className="dash-stat__val">{donations.length}</div>
              <div className="dash-stat__label">Total Donations</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiTruck /></div>
              <div className="dash-stat__val">{activeTracking}</div>
              <div className="dash-stat__label">Active Tracking</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiStar /></div>
              <div className="dash-stat__val">{impactScore}</div>
              <div className="dash-stat__label">Impact Score</div>
            </div>
            <div className="dash-stat card card-red">
              <div className="dash-stat__icon"><FiAlertCircle /></div>
              <div className="dash-stat__val">{helpRequests.length}</div>
              <div className="dash-stat__label">Help Requests</div>
            </div>
          </div>

          <div className="dash-grid">
            <div className="card dash-history">
              <div className="dash-card-header">
                <h3><FiPackage /> Recent Activity</h3>
                <Link to="/tracking" className="btn btn-sm btn-ghost">View All</Link>
              </div>
              <div className="dash-table">
                {recentActivity.length === 0 ? (
                  <div className="dash-row">
                    <div className="dash-row__main">
                      <span className="dash-row__id">No saved activity yet</span>
                      <span className="dash-row__type badge badge-gray">Dashboard</span>
                    </div>
                    <div className="dash-row__items">Complete a donation or help request to see it here.</div>
                    <div className="dash-row__date">-</div>
                    <span className="badge badge-gray">Waiting</span>
                  </div>
                ) : recentActivity.map(item => (
                  <div key={item.id} className="dash-row">
                    <div className="dash-row__main">
                      <span className="dash-row__id">{item.title}</span>
                      <span className="dash-row__type badge badge-gray">{item.donationType}</span>
                    </div>
                    <div className="dash-row__items">{item.details}</div>
                    <div className="dash-row__date">{formatDate(item.createdAt)}</div>
                    <span className={`badge badge-${item.statusColor || 'gray'}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card dash-badges">
                <h3><FiAward /> Badges Earned</h3>
                <div className="dash-badges__grid">
                  {badges.map(badge => (
                    <div key={badge.label} className="dash-badge">
                      <span className="dash-badge__emoji">{badge.emoji}</span>
                      <span className="dash-badge__label">{badge.label}</span>
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
