import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { FiTrendingUp, FiUsers, FiPackage, FiHeart } from 'react-icons/fi'
import './Transparency.css'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

const stats = [
  { icon: <FiPackage />, label: 'Total Donations', val: 34200, color: '--red-500' },
  { icon: <FiUsers />, label: 'Families Reached', val: 8900, color: '--red-400' },
  { icon: <FiTrendingUp />, label: 'Funds Distributed', val: 14, suffix: 'L+', prefix: '₹', color: '--red-500' },
  { icon: <FiHeart />, label: 'Volunteer Hours', val: 52000, color: '--red-400' },
]

const stories = [
  {
    before: 'A family of 5 struggling without winter clothing in Shimla',
    after: 'Now warm and safe with donated jackets, blankets, and woolen clothes',
    img: '❄️ → 🧥',
  },
  {
    before: "Children couldn't attend school — no uniforms or supplies",
    after: '15 children now attend school daily with full supplies',
    img: '📓 → 🎒',
  },
  {
    before: 'Elderly couple surviving on one meal a day in rural Bihar',
    after: 'Receive monthly food and medical support through sponsors',
    img: '🍽️ → 💊',
  },
]

const timeline = [
  { month: 'Jan 2026', event: 'Winter Clothing Drive — 5,200 items distributed across North India' },
  { month: 'Feb 2026', event: 'Flood Relief Assam — Emergency supplies to 142 families' },
  { month: 'Dec 2025', event: 'School Supplies Campaign — 800 children supported' },
  { month: 'Nov 2025', event: 'Diwali Kindness Drive — Meals for 2,000 families' },
]

export default function Transparency() {
  return (
    <div className="page transparency">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Where Your <span>Help</span> Went ✨
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Full transparency. Real impact. Every donation accounted for.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="tp-stats">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="tp-stat card card-red"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <div className="tp-stat__icon">{s.icon}</div>
                <div className="tp-stat__val">
                  {s.prefix}<CountUp end={s.val} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />{s.suffix || '+'}
                </div>
                <div className="tp-stat__label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Stories */}
      <section className="section tp-stories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Before & <span>After</span></h2>
            <p className="section-sub">Real transformations powered by your generosity</p>
          </div>
          <div className="grid-3">
            {stories.map((s, i) => (
              <motion.div key={i} className="tp-story card"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <div className="tp-story__visual">{s.img}</div>
                <div className="tp-story__before">
                  <span className="badge badge-red">Before</span>
                  <p>{s.before}</p>
                </div>
                <div className="tp-story__after">
                  <span className="badge badge-green">After</span>
                  <p>{s.after}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Distribution <span>Timeline</span></h2>
            <p className="section-sub">A log of every major distribution drive</p>
          </div>
          <div className="tp-timeline">
            {timeline.map((t, i) => (
              <motion.div key={i} className="tp-tl-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="tp-tl-dot" />
                <div className="tp-tl-content">
                  <span className="tp-tl-month">{t.month}</span>
                  <p>{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
