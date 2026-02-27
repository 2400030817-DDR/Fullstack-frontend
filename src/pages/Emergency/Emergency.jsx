import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiUsers, FiArrowRight } from 'react-icons/fi'
import './Emergency.css'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

const drives = [
  {
    title: 'Flood Relief — Assam',
    status: 'Active',
    urgency: 'Critical',
    raised: 380000,
    goal: 600000,
    volunteers: 48,
    needed: ['Dry food', 'Drinking water', 'Blankets', 'Medicines', 'Tarpaulin sheets'],
    families: 142,
  },
  {
    title: 'Winter Clothing Drive — Kashmir',
    status: 'Active',
    urgency: 'High',
    raised: 210000,
    goal: 300000,
    volunteers: 32,
    needed: ['Jackets', 'Sweaters', 'Thermal wear', 'Blankets', 'Socks'],
    families: 200,
  },
  {
    title: 'Earthquake Aid — Uttarakhand',
    status: 'Completed',
    urgency: 'Resolved',
    raised: 500000,
    goal: 500000,
    volunteers: 85,
    needed: ['Shelter kits', 'Food', 'Medical supplies'],
    families: 310,
  },
]

export default function Emergency() {
  return (
    <div className="page emergency">
      <div className="page-hero em-hero">
        <div className="container">
          <motion.div className="em-alert"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <FiAlertTriangle /> Active Emergencies Require Your Help
          </motion.div>
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Emergency <span>Drives</span> 🚨
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            When disaster strikes, every minute counts. Join the relief effort.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="em-drives">
            {drives.map((d, i) => {
              const pct = Math.round((d.raised / d.goal) * 100)
              return (
                <motion.div key={d.title} className="em-drive card card-red"
                  initial="hidden" whileInView="show" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                >
                  <div className="em-drive__top">
                    <div>
                      <h3>{d.title}</h3>
                      <span className="em-drive__families">{d.families} families affected</span>
                    </div>
                    <div className="em-drive__badges">
                      <span className={`badge ${d.urgency === 'Critical' ? 'badge-red' : d.urgency === 'High' ? 'badge-orange' : 'badge-green'}`}>
                        {d.urgency}
                      </span>
                      <span className={`badge ${d.status === 'Active' ? 'badge-red' : 'badge-green'}`}>
                        {d.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="em-drive__progress">
                    <div className="em-drive__progress-header">
                      <span>₹{(d.raised / 1000).toFixed(0)}K raised</span>
                      <span>{pct}% of ₹{(d.goal / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="progress-track">
                      <motion.div className="progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                      />
                    </div>
                  </div>

                  {/* Needed items */}
                  <div className="em-drive__needed">
                    <strong>Urgently Needed:</strong>
                    <div className="em-drive__tags">
                      {d.needed.map(n => (
                        <span key={n} className="em-tag">{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="em-drive__actions">
                    <Link to="/donate/money" className="btn btn-primary">
                      Donate Now <FiArrowRight />
                    </Link>
                    <button className="btn btn-outline">
                      <FiUsers /> Join as Volunteer ({d.volunteers} active)
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
