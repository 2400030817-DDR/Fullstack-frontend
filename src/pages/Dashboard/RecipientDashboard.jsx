import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';
import { BsHeartPulse } from 'react-icons/bs';
import './Dashboard.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function RecipientDashboard() {
  const stats = [
    { icon: <FiPackage />, val: 3, label: 'Total Requests' },
    { icon: <FiClock />, val: 1, label: 'In Progress' },
    { icon: <FiCheckCircle />, val: 2, label: 'Fulfilled' },
    { icon: <BsHeartPulse />, val: 5, label: 'Items Received' },
  ];

  const requests = [
    { id: 'REQ-4501', need: 'Food & Groceries', date: '2024-12-20', status: 'Fulfilled', urgency: 'High' },
    { id: 'REQ-4523', need: 'Winter Clothing', date: '2024-12-28', status: 'In Progress', urgency: 'Medium' },
    { id: 'REQ-4410', need: 'Medical Supplies', date: '2024-12-15', status: 'Fulfilled', urgency: 'Critical' },
  ];

  const deliveries = [
    { id: 'DEL-1102', from: 'Ananya S.', items: '5kg Rice, 2kg Dal, Oil', eta: 'Today, 4 PM' },
    { id: 'DEL-1089', from: 'Ravi K.', items: '2 Blankets, 3 Jackets', eta: 'Tomorrow, 11 AM' },
  ];

  const statusColor = (s) =>
    s === 'Fulfilled' ? 'var(--green)' : s === 'In Progress' ? '#ed8936' : 'var(--gray-400)';

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} style={{ textAlign: 'center', marginBottom: 8 }}>
              🤲 Welcome Back
            </motion.h1>
            <motion.p variants={fadeUp} style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: 'var(--sp-10)' }}>
              Your help requests and deliveries at a glance
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

            {/* Grid: Requests + Deliveries */}
            <div className="dash-grid">
              <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                <div className="dash-card-header">
                  <h3>📋 My Requests</h3>
                  <Link to="/request-help" className="btn btn-outline btn-sm" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                    New Request
                  </Link>
                </div>
                <div className="dash-requests">
                  {requests.map((r, i) => (
                    <div className="dash-request" key={i}>
                      <div className="dash-request__info">
                        <strong>{r.need}</strong>
                        <span>{r.id} · {r.date} · Urgency: {r.urgency}</span>
                      </div>
                      <span className="badge" style={{ background: statusColor(r.status), color: '#fff' }}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    🚚 Upcoming Deliveries
                  </h3>
                  {deliveries.map((d, i) => (
                    <div key={i} style={{ padding: '12px 0', borderBottom: i < deliveries.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <strong style={{ color: 'var(--gray-800)', fontSize: '0.9rem' }}>{d.items}</strong>
                      <div style={{ fontSize: '0.82rem', color: 'var(--gray-400)', marginTop: 4 }}>
                        {d.id} · From: {d.from} · ETA: {d.eta}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)' }}>💬 Need Help?</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--gray-500)', marginBottom: 'var(--sp-4)' }}>
                    Facing issues with a delivery? Let us know.
                  </p>
                  <Link to="/support" className="btn btn-outline" style={{ width: '100%' }}>
                    Contact Support
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
