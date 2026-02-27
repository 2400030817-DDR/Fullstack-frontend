import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiCalendar, FiMapPin, FiPackage } from 'react-icons/fi'
import './DonateClothes.css'

const clothTypes = [
  { id: 'men', label: 'Men', emoji: '👔' },
  { id: 'women', label: 'Women', emoji: '👗' },
  { id: 'kids', label: 'Kids', emoji: '🧒' },
  { id: 'winter', label: 'Winter Wear', emoji: '🧥' },
  { id: 'blankets', label: 'Blankets', emoji: '🛏️' },
]

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
]

export default function DonateClothes() {
  const [selected, setSelected] = useState([])
  const [qty, setQty] = useState(1)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggle = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  if (submitted) {
    return (
      <div className="page donate-clothes">
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div className="dc-success card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiCheckCircle className="dc-success__icon" />
            <h2>Pickup Scheduled! 🎉</h2>
            <p>Our volunteer will collect your clothes on <strong>{date}</strong> between <strong>{slot}</strong>.</p>
            <p className="dc-success__note">You'll receive a notification when the volunteer is on the way.</p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
              Donate More
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page donate-clothes">
      <div className="page-hero">
        <div className="container">
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Donate <span>Clothes</span> 👕
          </motion.h1>
          <motion.p className="section-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Give your clothes a new life and someone a warmer day.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container dc-layout">
          <div className="dc-form">
            {/* Clothing type */}
            <h3 className="dc-label">What are you donating?</h3>
            <div className="dc-types">
              {clothTypes.map(t => (
                <button key={t.id}
                  className={`dc-type ${selected.includes(t.id) ? 'dc-type--active' : ''}`}
                  onClick={() => toggle(t.id)}
                >
                  <span className="dc-type__emoji">{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Quantity */}
            <h3 className="dc-label">Approximate Items</h3>
            <div className="dc-qty">
              <button className="dc-qty__btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="dc-qty__val">{qty}</span>
              <button className="dc-qty__btn" onClick={() => setQty(qty + 1)}>+</button>
              <span className="dc-qty__text">pieces / {qty >= 10 ? 'large bag' : qty >= 5 ? 'medium bag' : 'small bag'}</span>
            </div>

            {/* Pickup Date */}
            <h3 className="dc-label"><FiCalendar /> Schedule Pickup Date</h3>
            <div className="form-group">
              <input type="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            {/* Time Slots */}
            <h3 className="dc-label">Choose Time Slot</h3>
            <div className="dc-slots">
              {timeSlots.map(s => (
                <button key={s}
                  className={`dc-slot ${slot === s ? 'dc-slot--active' : ''}`}
                  onClick={() => setSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Address */}
            <h3 className="dc-label"><FiMapPin /> Pickup Address</h3>
            <div className="form-group">
              <textarea className="form-textarea" placeholder="Enter your full pickup address..."
                value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <button className="btn btn-primary btn-lg dc-submit"
              onClick={() => setSubmitted(true)}
              disabled={!selected.length || !date || !slot}
            >
              <FiPackage /> Schedule Pickup
            </button>
          </div>

          {/* Sidebar */}
          <div className="dc-sidebar">
            <div className="card dc-summary">
              <h3>📋 Donation Summary</h3>
              <div className="dc-summary__list">
                <div className="dc-summary__row">
                  <span>Types</span>
                  <span>{selected.length > 0 ? selected.map(s => clothTypes.find(t => t.id === s)?.label).join(', ') : 'None selected'}</span>
                </div>
                <div className="dc-summary__row">
                  <span>Quantity</span>
                  <span>{qty} pieces</span>
                </div>
                <div className="dc-summary__row">
                  <span>Pickup</span>
                  <span>{date || 'Not set'}</span>
                </div>
                <div className="dc-summary__row">
                  <span>Time</span>
                  <span>{slot || 'Not set'}</span>
                </div>
              </div>
            </div>

            <div className="card dc-info">
              <h4>💡 Good to Know</h4>
              <ul>
                <li>Clean and wearable condition preferred</li>
                <li>Our volunteer carries bags — no packing needed</li>
                <li>You'll receive live tracking of your donation</li>
                <li>A thank-you note from the recipient awaits you</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
