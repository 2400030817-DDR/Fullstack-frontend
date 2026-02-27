import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAlertTriangle, FiCheckCircle, FiBarChart2, FiPackage, FiMessageSquare } from 'react-icons/fi';
import './Dashboard.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function AdminDashboard() {
  const [tab, setTab] = useState('requests');

  const overviewStats = [
    { icon: <FiUsers />, val: '12,400', label: 'Total Users' },
    { icon: <FiPackage />, val: '34,200', label: 'Donations Processed' },
    { icon: <FiAlertTriangle />, val: 14, label: 'Open Tickets' },
    { icon: <FiCheckCircle />, val: '98.2%', label: 'Fulfillment Rate' },
    { icon: <FiBarChart2 />, val: '₹18.4L', label: 'Funds Collected' },
    { icon: <FiMessageSquare />, val: 8, label: 'Pending Reviews' },
  ];

  const pendingRequests = [
    { id: 'REQ-4530', user: 'Meera D.', need: 'Medical Supplies', urgency: 'Critical', date: '2024-12-30' },
    { id: 'REQ-4528', user: 'Arun P.', need: 'Food & Groceries', urgency: 'High', date: '2024-12-30' },
    { id: 'REQ-4525', user: 'Sita L.', need: 'Winter Clothing', urgency: 'Medium', date: '2024-12-29' },
    { id: 'REQ-4520', user: 'Karan J.', need: 'Essentials Kit', urgency: 'Low', date: '2024-12-29' },
  ];

  const openTickets = [
    { id: 'TKT-2201', user: 'Ravi K.', issue: 'Not Delivered', date: '2024-12-29', priority: 'High' },
    { id: 'TKT-2198', user: 'Ananya S.', issue: 'Wrong Items', date: '2024-12-28', priority: 'Medium' },
    { id: 'TKT-2195', user: 'Priya M.', issue: 'Damaged Package', date: '2024-12-27', priority: 'Low' },
  ];

  const drives = [
    { name: 'Flood Relief Assam', status: 'Active', progress: 68, volunteers: 45, donations: 1250 },
    { name: 'Winter Clothing Kashmir', status: 'Active', progress: 42, volunteers: 32, donations: 890 },
    { name: 'Earthquake Uttarakhand', status: 'Completed', progress: 100, volunteers: 78, donations: 3400 },
  ];

  const urgencyColor = (u) => {
    const map = { Critical: 'var(--red-600)', High: 'var(--red-400)', Medium: '#f59e0b', Low: '#48BB78' };
    return map[u] || 'var(--gray-400)';
  };

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} style={{ textAlign: 'center', marginBottom: 8 }}>
              🛡️ Admin Panel
            </motion.h1>
            <motion.p variants={fadeUp} style={{ textAlign: 'center', color: 'var(--gray-500)', marginBottom: 'var(--sp-10)' }}>
              Monitor, approve, and manage the entire platform
            </motion.p>

            {/* Overview Stats */}
            <motion.div className="dash-admin-grid" variants={stagger}>
              {overviewStats.map((s, i) => (
                <motion.div className="card dash-admin-stat" key={i} variants={fadeUp}>
                  <div className="dash-stat__icon">{s.icon}</div>
                  <div className="dash-stat__val">{s.val}</div>
                  <div className="dash-stat__label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 8, marginBottom: 'var(--sp-6)' }}>
              {['requests', 'tickets', 'drives'].map((t) => (
                <button
                  key={t}
                  className={`btn ${tab === t ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setTab(t)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t === 'requests' ? '📋 Pending Requests' : t === 'tickets' ? '🎫 Open Tickets' : '🚨 Drives'}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            {tab === 'requests' && (
              <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                <div className="dash-card-header">
                  <h3>Pending Help Requests</h3>
                  <span className="badge" style={{ background: 'var(--red-50)', color: 'var(--red-500)' }}>
                    {pendingRequests.length} pending
                  </span>
                </div>
                <div className="dash-admin-list">
                  {pendingRequests.map((r, i) => (
                    <div className="dash-admin-item" key={i}>
                      <div className="dash-admin-item__info">
                        <strong>{r.need} — {r.user}</strong>
                        <span>{r.id} · {r.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge" style={{ background: urgencyColor(r.urgency), color: '#fff' }}>
                          {r.urgency}
                        </span>
                        <button className="btn btn-primary btn-sm" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                          Approve
                        </button>
                        <button className="btn btn-ghost btn-sm" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'tickets' && (
              <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                <div className="dash-card-header">
                  <h3>Open Support Tickets</h3>
                  <span className="badge" style={{ background: 'var(--red-50)', color: 'var(--red-500)' }}>
                    {openTickets.length} open
                  </span>
                </div>
                <div className="dash-admin-list">
                  {openTickets.map((t, i) => (
                    <div className="dash-admin-item" key={i}>
                      <div className="dash-admin-item__info">
                        <strong>{t.issue} — {t.user}</strong>
                        <span>{t.id} · {t.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge" style={{ background: urgencyColor(t.priority), color: '#fff' }}>
                          {t.priority}
                        </span>
                        <button className="btn btn-outline btn-sm" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                          Review
                        </button>
                        <button className="btn btn-primary btn-sm" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'drives' && (
              <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                <div className="dash-card-header">
                  <h3>Emergency Drives</h3>
                </div>
                <div className="dash-admin-list">
                  {drives.map((d, i) => (
                    <div className="dash-admin-item" key={i} style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: 'var(--gray-800)' }}>{d.name}</strong>
                        <span className="badge" style={{ background: d.status === 'Active' ? 'var(--red-500)' : '#48BB78', color: '#fff' }}>
                          {d.status}
                        </span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${d.progress}%` }} />
                      </div>
                      <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: 'var(--gray-400)' }}>
                        <span>👥 {d.volunteers} volunteers</span>
                        <span>📦 {d.donations} donations</span>
                        <span>📊 {d.progress}% funded</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      </section>
    </div>
  );
}
