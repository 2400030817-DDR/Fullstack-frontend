import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi'
import { addDashboardActivity } from '../../utils/dashboardStorage'
import './DonateMoney.css'

const categories = [
  { id: 'onetime', label: 'One-Time', icon: '💝' },
  { id: 'monthly', label: 'Monthly Charity', icon: '🔄' },
  { id: 'child', label: 'Sponsor Child', icon: '👶' },
  { id: 'medical', label: 'Medical Help', icon: '🏥' },
  { id: 'education', label: 'Education', icon: '📚' },
]

const amounts = [100, 500, 1000, 2500, 5000, 10000]

const funds = [
  { name: 'Medical Emergency Fund', raised: 425000, goal: 600000 },
  { name: 'Winter Clothing Drive', raised: 180000, goal: 250000 },
  { name: 'School Supplies 2026', raised: 95000, goal: 150000 },
]

export default function DonateMoney() {
  const [cat, setCat] = useState('onetime')
  const [amount, setAmount] = useState(1000)
  const [custom, setCustom] = useState('')
  const [payment, setPayment] = useState('upi')
  const [donated, setDonated] = useState(false)

  const parsed = parseInt(custom)
  const finalAmt = custom && !isNaN(parsed) && parsed > 0 ? parsed : amount
  const categoryLabel = categories.find(item => item.id === cat)?.label || 'Donation'

  const handleDonate = () => {
    if (!finalAmt || finalAmt <= 0) return

    addDashboardActivity({
      kind: 'donation',
      donationType: 'Money',
      title: `${categoryLabel} Donation`,
      details: `Rs ${finalAmt.toLocaleString()} via ${payment.toUpperCase()}`,
      amount: finalAmt,
      status: 'Delivered',
      statusColor: 'green',
    })

    setDonated(true)
  }

  if (donated) {
    return (
      <div className="page donate-money">
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div className="dm-thankyou card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="dm-thankyou__heart">❤️</div>
            <h2>Thank You, Beautiful Soul!</h2>
            <p className="dm-thankyou__msg">
              You just helped a real person today. Your ₹{finalAmt?.toLocaleString()} will directly
              reach someone who needs it most.
            </p>
            <div className="dm-thankyou__impact">
              <div className="dm-thankyou__impact-item">
                <span>🍽️</span>
                <p>{Math.floor(finalAmt / 50)} meals funded</p>
              </div>
              <div className="dm-thankyou__impact-item">
                <span>📚</span>
                <p>{Math.floor(finalAmt / 200)} school kits</p>
              </div>
              <div className="dm-thankyou__impact-item">
                <span>💊</span>
                <p>{Math.floor(finalAmt / 300)} medical checkups</p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setDonated(false)}>
              Donate Again <FiHeart />
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page donate-money">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Donate <span>Money</span> 💰
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Every rupee you give directly changes a life.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container dm-layout">
          {/* LEFT — form */}
          <div className="dm-form">
            {/* Category Tabs */}
            <div className="dm-cats">
              {categories.map(c => (
                <button key={c.id}
                  className={`dm-cat ${cat === c.id ? 'dm-cat--active' : ''}`}
                  onClick={() => setCat(c.id)}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>

            {/* Amounts */}
            <h3 className="dm-label">Select Amount</h3>
            <div className="dm-amounts">
              {amounts.map(a => (
                <button key={a}
                  className={`dm-amt ${amount === a && !custom ? 'dm-amt--active' : ''}`}
                  onClick={() => { setAmount(a); setCustom('') }}
                >
                  ₹{a.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: 'var(--sp-4)' }}>
              <input
                type="number"
                className="form-input"
                placeholder="Or enter custom amount..."
                value={custom}
                onChange={e => setCustom(e.target.value)}
              />
            </div>

            {/* Payment Method */}
            <h3 className="dm-label">Payment Method</h3>
            <div className="dm-payments">
              {[
                { id: 'upi', label: 'UPI', icon: <FiSmartphone /> },
                { id: 'card', label: 'Card', icon: <FiCreditCard /> },
                { id: 'wallet', label: 'Wallet', icon: <FiDollarSign /> },
              ].map(p => (
                <button key={p.id}
                  className={`dm-pay ${payment === p.id ? 'dm-pay--active' : ''}`}
                  onClick={() => setPayment(p.id)}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>

            {/* Mock Payment UI */}
            <div className="dm-mock-pay card">
              {payment === 'upi' && (
                <div className="form-group">
                  <label className="form-label">UPI ID</label>
                  <input className="form-input" placeholder="yourname@upi" />
                </div>
              )}
              {payment === 'card' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input className="form-input" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Expiry</label>
                      <input className="form-input" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input className="form-input" placeholder="•••" />
                    </div>
                  </div>
                </>
              )}
              {payment === 'wallet' && (
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input className="form-input" placeholder="+91 98765 43210" />
                </div>
              )}
            </div>

            <button
              className="btn btn-primary btn-lg dm-submit"
              onClick={handleDonate}
              disabled={!finalAmt || finalAmt <= 0}
            >
              <FiHeart /> Donate ₹{finalAmt?.toLocaleString() || '0'}
            </button>
          </div>

          {/* RIGHT — fund transparency */}
          <div className="dm-sidebar">
            <div className="card dm-transparency">
              <h3>📊 Fund Transparency</h3>
              <p className="dm-transparency__sub">See exactly where your money goes</p>
              {funds.map(f => {
                const pct = Math.round((f.raised / f.goal) * 100)
                return (
                  <div key={f.name} className="dm-fund">
                    <div className="dm-fund__header">
                      <span className="dm-fund__name">{f.name}</span>
                      <span className="dm-fund__pct">{pct}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                      />
                    </div>
                    <div className="dm-fund__nums">
                      <span>₹{(f.raised / 1000).toFixed(0)}K raised</span>
                      <span>₹{(f.goal / 1000).toFixed(0)}K goal</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="card dm-impact-preview">
              <h3>✨ Your ₹{finalAmt?.toLocaleString() || '0'} can provide</h3>
              <ul>
                <li>🍽️ {Math.floor((finalAmt || 0) / 50)} meals for the hungry</li>
                <li>📚 {Math.floor((finalAmt || 0) / 200)} school supply kits</li>
                <li>👕 {Math.floor((finalAmt || 0) / 150)} clothing sets</li>
                <li>💊 {Math.floor((finalAmt || 0) / 300)} health checkups</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
