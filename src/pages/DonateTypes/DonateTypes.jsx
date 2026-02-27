import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import './DonateTypes.css'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

const types = [
  { emoji: '💰', title: 'Donate Money', desc: 'One-time, monthly, sponsor a child or fund medical & education support.', to: '/donate/money', color: '#E53E3E' },
  { emoji: '👕', title: 'Donate Clothes', desc: 'Men, women, kids, winter wear & blankets — schedule a pickup.', to: '/donate/clothes', color: '#DD6B20' },
  { emoji: '📦', title: 'Donate Essentials', desc: 'Food packets, hygiene kits, medicines and daily essentials.', to: '/donate/essentials', color: '#3182CE' },
  { emoji: '🚨', title: 'Emergency Relief', desc: 'Respond to active disasters and urgent humanitarian needs.', to: '/emergency', color: '#E53E3E' },
  { emoji: '🤝', title: 'Sponsor a Family', desc: 'Provide ongoing monthly support to a family in need.', to: '/donate/money', color: '#38A169' },
]

export default function DonateTypes() {
  return (
    <div className="page donate-types">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Choose How to <span>Help</span> ❤️
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Every type of help matters. Pick what feels right for you.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="donate-types__grid">
            {types.map((t, i) => (
              <motion.div key={t.title}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link to={t.to} className="donate-types__card card card-red">
                  <div className="donate-types__emoji">{t.emoji}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="donate-types__arrow" style={{ color: t.color }}>
                    Start <FiArrowRight />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
