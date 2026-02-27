import { useState } from 'react';
import { motion } from 'framer-motion';
import './DonateEssentials.css';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const ESSENTIALS = [
  { id: 'hygiene', label: 'Hygiene Kit', emoji: '🧴', desc: 'Soap, toothbrush, sanitizer, pads' },
  { id: 'baby', label: 'Baby Supplies', emoji: '🍼', desc: 'Diapers, formula, wipes, cream' },
  { id: 'school', label: 'School Kit', emoji: '📚', desc: 'Notebook, pens, bag, color box' },
  { id: 'medical', label: 'First Aid', emoji: '🩹', desc: 'Bandages, ointments, basic medicines' },
  { id: 'kitchen', label: 'Kitchen Essentials', emoji: '🍳', desc: 'Utensils, plates, cups, water bottle' },
  { id: 'bedding', label: 'Bedding Set', emoji: '🛏️', desc: 'Pillow, mattress, bedsheet, blanket' },
];

export default function DonateEssentials() {
  const [selected, setSelected] = useState([]);
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [address, setAddress] = useState('');
  const [done, setDone] = useState(false);

  const toggleItem = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const slots = ['9 AM – 12 PM', '12 PM – 3 PM', '3 PM – 6 PM', '6 PM – 9 PM'];

  const handleSubmit = () => {
    if (selected.length && date && slot && address) setDone(true);
  };

  if (done) {
    return (
      <div className="page">
        <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>📦💖</div>
            <h1>Essentials Pickup Scheduled!</h1>
            <p style={{ color: 'var(--gray-500)', maxWidth: 500, margin: '12px auto 24px' }}>
              Your {selected.length} essential kit(s) x{qty} will be collected on <strong>{date}</strong> during <strong>{slot}</strong>.
              Thank you for caring!
            </p>
            <div className="card" style={{ display: 'inline-block', padding: '20px 32px', textAlign: 'left' }}>
              <p style={{ fontWeight: 700, marginBottom: 8 }}>📍 Pickup Address</p>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{address}</p>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 'var(--sp-10)' }}>
              <h1>Donate Essentials 📦</h1>
              <p style={{ color: 'var(--gray-500)', maxWidth: 560, margin: '8px auto 0' }}>
                Everyday items that make a world of difference. Select what you'd like to donate.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 'var(--sp-8)', alignItems: 'start' }}>
              {/* Left: Form */}
              <div>
                {/* Items Selector */}
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-5)' }}>🎁 Select Essential Kits</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {ESSENTIALS.map((item) => {
                      const active = selected.includes(item.id);
                      return (
                        <motion.div
                          key={item.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleItem(item.id)}
                          style={{
                            padding: '14px',
                            borderRadius: 'var(--radius-md)',
                            border: `2px solid ${active ? 'var(--red-400)' : 'var(--gray-100)'}`,
                            background: active ? 'var(--red-50)' : '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{item.emoji}</div>
                          <strong style={{ color: 'var(--gray-800)', fontSize: '0.9rem' }}>{item.label}</strong>
                          <p style={{ fontSize: '0.78rem', color: 'var(--gray-400)', margin: 0 }}>{item.desc}</p>
                          {active && (
                            <span style={{ color: 'var(--red-500)', fontSize: '0.78rem', fontWeight: 700, marginTop: 4, display: 'block' }}>
                              ✓ Selected
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Quantity */}
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)' }}>📊 Quantity Per Kit</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button className="btn btn-outline" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--red-500)', minWidth: 40, textAlign: 'center' }}>{qty}</span>
                    <button className="btn btn-outline" onClick={() => setQty(Math.min(20, qty + 1))}>+</button>
                    <span style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                      {qty <= 3 ? 'Small donation' : qty <= 8 ? 'Medium donation' : 'Large donation — amazing!'}
                    </span>
                  </div>
                </motion.div>

                {/* Schedule */}
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)' }}>📅 Schedule Pickup</h3>
                  <div className="form-group">
                    <label>Pickup Date</label>
                    <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
                    {slots.map((s) => (
                      <button
                        key={s}
                        className={`btn ${slot === s ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setSlot(s)}
                        style={{ fontSize: '0.82rem' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Address + Submit */}
                <motion.div className="card" variants={fadeUp} style={{ padding: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)' }}>📍 Pickup Address</h3>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Full address for pickup..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: 16, padding: '14px' }}
                    onClick={handleSubmit}
                    disabled={!selected.length || !date || !slot || !address}
                  >
                    Schedule Essentials Pickup 💖
                  </button>
                </motion.div>
              </div>

              {/* Right: Summary Sidebar */}
              <motion.div variants={fadeUp}>
                <div className="card" style={{ padding: 'var(--sp-6)', position: 'sticky', top: 100, marginBottom: 'var(--sp-6)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-4)' }}>🧾 Donation Summary</h3>
                  {selected.length === 0 ? (
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.88rem' }}>No kits selected yet</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {selected.map((id) => {
                        const item = ESSENTIALS.find((e) => e.id === id);
                        return (
                          <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span>{item.emoji} {item.label}</span>
                            <span style={{ fontWeight: 700, color: 'var(--red-500)' }}>x{qty}</span>
                          </div>
                        );
                      })}
                      <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 10, marginTop: 8, fontWeight: 800 }}>
                        Total: {selected.length * qty} items
                      </div>
                    </div>
                  )}
                  {date && <p style={{ fontSize: '0.82rem', color: 'var(--gray-400)', marginTop: 10 }}>📅 {date} {slot && `· ${slot}`}</p>}
                </div>

                <div className="card" style={{ padding: 'var(--sp-6)', background: 'var(--red-50)' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: 'var(--sp-3)' }}>💡 Packing Tips</h3>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--gray-600)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <li>✅ Pack items in clean, sealed bags</li>
                    <li>✅ Label kits if possible</li>
                    <li>✅ Check expiry on medical items</li>
                    <li>✅ Avoid broken or damaged items</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
