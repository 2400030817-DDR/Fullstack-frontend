import { motion } from 'framer-motion';
import { FiTruck, FiCheckCircle, FiStar, FiMapPin } from 'react-icons/fi';
import './Dashboard.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function VolunteerDashboard() {
  const stats = [
    { icon: <FiTruck />, val: 128, label: 'Total Deliveries' },
    { icon: <FiCheckCircle />, val: 3, label: 'Active Pickups' },
    { icon: <FiStar />, val: '4.9', label: 'Rating' },
    { icon: <FiMapPin />, val: 45, label: 'KM Covered' },
  ];

  const tasks = [
    { id: 'PKP-901', type: 'Clothes Pickup', from: 'Priya M., Andheri West', to: 'Relief Center, Bandra', status: 'Pick Up Now', urgent: true },
    { id: 'PKP-903', type: 'Food Delivery', from: 'NGO Kitchen, Dadar', to: 'Shelter Home, Worli', status: 'Scheduled 2 PM', urgent: false },
    { id: 'PKP-910', type: 'Essentials Drop', from: 'Warehouse, Thane', to: 'Community Hall, Kalyan', status: 'Scheduled Tomorrow', urgent: false },
  ];

  const completed = [
    { id: 'PKP-889', type: 'Blankets', date: '2024-12-29', rating: 5 },
    { id: 'PKP-875', type: 'Groceries', date: '2024-12-28', rating: 5 },
    { id: 'PKP-860', type: 'Medical Kit', date: '2024-12-27', rating: 4 },
  ];

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} style={{ textAlign: 'center', marginBottom: 8 }}>
              🦸 Volunteer Dashboard
            </motion.h1>
            <motion.p variants={fadeUp} style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: 'var(--sp-10)' }}>
              Thank you for being a hero. Here are your tasks.
            </motion.p>

            {/* Stats */}
            <motion.div className="dash-stats" variants={stagger}>
              {stats.map((s, i) => (
                <motion.div className="card dash-stat" key={i} variants={fadeUp}>
                  <div className="dash-stat__icon">{s.icon}</div>
                  <div className="dash-stat__val">{s.val}</div>
                  <div className="dash-stat__label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Grid */}
            <div className="dash-grid">
              <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                <div className="dash-card-header">
                  <h3>📦 Active Pickups & Deliveries</h3>
                </div>
                <div className="dash-tasks">
                  {tasks.map((t, i) => (
                    <div className="dash-task" key={i}>
                      <div className="dash-task__info">
                        <strong>
                          {t.urgent && <span style={{ color: 'var(--red-500)', marginRight: 6 }}>●</span>}
                          {t.type}
                        </strong>
                        <span>{t.id} · From: {t.from}</span>
                        <span>To: {t.to}</span>
                      </div>
                      <span
                        className="badge"
                        style={{
                          background: t.urgent ? 'var(--red-500)' : 'var(--red-50)',
                          color: t.urgent ? '#fff' : 'var(--red-500)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    ✅ Recent Completions
                  </h3>
                  {completed.map((c, i) => (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i < completed.length - 1 ? '1px solid var(--gray-100)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'var(--gray-800)', fontSize: '0.9rem' }}>{c.type}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{c.id} · {c.date}</div>
                      </div>
                      <span style={{ color: 'var(--red-400)', fontWeight: 700 }}>{'⭐'.repeat(c.rating)}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)', background: 'var(--heart-gradient)', color: '#fff', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🏅</div>
                  <h3 style={{ fontWeight: 800, marginBottom: 4, color: '#fff' }}>Gold Volunteer</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                    You've completed 128 deliveries! Only 22 more to reach Platinum.
                  </p>
                  <div className="progress-track" style={{ marginTop: 12, background: 'rgba(255,255,255,0.3)' }}>
                    <div className="progress-fill" style={{ width: '85%', background: '#fff' }} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
