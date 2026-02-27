import { motion } from 'framer-motion'
import { FiHeart, FiStar, FiAward } from 'react-icons/fi'
import './Community.css'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
}

const stories = [
  {
    title: 'A Mother\'s Gratitude',
    text: 'When Sakina lost her husband, she thought all hope was gone. Through HelpBeat, a sponsor provided monthly support for her 3 children\'s education. Today, her eldest daughter is in college.',
    author: 'Sakina B., Lucknow',
    emoji: '🙏',
  },
  {
    title: 'The Blanket That Saved a Life',
    text: 'During last winter\'s cold wave, 78-year-old Ramesh was found without any warm clothing. A donor\'s blankets and jacket kept him warm through the harshest nights.',
    author: 'Ramesh K., Dehradun',
    emoji: '🛏️',
  },
  {
    title: 'School Dreams Come True',
    text: '12 children in a rural village in Rajasthan received school supplies and uniforms. Their attendance went from 40% to 95% in just one month.',
    author: 'Government School, Barmer',
    emoji: '📚',
  },
]

const topHelpers = [
  { name: 'Ananya Gupta', donations: 47, badge: '🏆', rank: 1 },
  { name: 'Vikram Patel', donations: 38, badge: '🥈', rank: 2 },
  { name: 'Meera Joshi', donations: 35, badge: '🥉', rank: 3 },
  { name: 'Arjun Singh', donations: 31, badge: '⭐', rank: 4 },
  { name: 'Priya Nair', donations: 28, badge: '⭐', rank: 5 },
]

const volunteers = [
  { name: 'Rahul Kumar', deliveries: 128, area: 'Delhi NCR', badge: '🌟' },
  { name: 'Sneha Reddy', deliveries: 95, area: 'Hyderabad', badge: '💫' },
  { name: 'Amit Sharma', deliveries: 87, area: 'Mumbai', badge: '✨' },
]

export default function Community() {
  return (
    <div className="page community">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Our <span>Community</span> of Kindness
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Stories, heroes, and the beautiful humans who make this possible.
          </motion.p>
        </div>
      </div>

      {/* Stories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><FiHeart /> Real <span>Stories</span></h2>
            <p className="section-sub">Every story is a life touched by your kindness</p>
          </div>
          <div className="grid-3">
            {stories.map((s, i) => (
              <motion.div key={i} className="cm-story card card-red"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <div className="cm-story__emoji">{s.emoji}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="cm-story__author">— {s.author}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard + Volunteers */}
      <section className="section cm-people">
        <div className="container">
          <div className="cm-people__grid">
            {/* Top Helpers */}
            <motion.div className="card cm-leaderboard"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={0}
            >
              <h3><FiAward /> Top Helpers Leaderboard</h3>
              <div className="cm-lb-list">
                {topHelpers.map(h => (
                  <div key={h.name} className={`cm-lb-item ${h.rank <= 3 ? 'cm-lb-item--top' : ''}`}>
                    <span className="cm-lb-rank">{h.badge}</span>
                    <div className="cm-lb-info">
                      <span className="cm-lb-name">{h.name}</span>
                      <span className="cm-lb-count">{h.donations} donations</span>
                    </div>
                    <span className="cm-lb-num">#{h.rank}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Volunteer Highlights */}
            <motion.div className="card cm-volunteers"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} custom={1}
            >
              <h3><FiStar /> Volunteer Heroes</h3>
              <div className="cm-vol-list">
                {volunteers.map(v => (
                  <div key={v.name} className="cm-vol-item">
                    <div className="cm-vol-avatar">{v.name[0]}</div>
                    <div className="cm-vol-info">
                      <span className="cm-vol-name">{v.badge} {v.name}</span>
                      <span className="cm-vol-stats">{v.deliveries} deliveries · {v.area}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
