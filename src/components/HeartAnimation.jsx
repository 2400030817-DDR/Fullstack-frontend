import { motion } from 'framer-motion'
import './HeartAnimation.css'

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 260,
  y: (Math.random() - 0.5) * 260,
  size: 3 + Math.random() * 5,
  dur: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}))

export default function HeartAnimation() {
  return (
    <div className="heart-anim">
      {/* Glow rings */}
      <div className="heart-anim__ring heart-anim__ring--1" />
      <div className="heart-anim__ring heart-anim__ring--2" />
      <div className="heart-anim__ring heart-anim__ring--3" />

      {/* Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="heart-anim__particle"
          style={{ width: p.size, height: p.size }}
          animate={{
            x: [0, p.x * 0.5, p.x, p.x * 0.5, 0],
            y: [0, p.y * 0.5, p.y, p.y * 0.5, 0],
            opacity: [0, 0.8, 0.4, 0.8, 0],
            scale: [0.5, 1, 1.2, 1, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* The beating heart */}
      <motion.div
        className="heart-anim__heart"
        animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 24 24" className="heart-anim__svg">
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E53E3E" />
              <stop offset="100%" stopColor="#FC8181" />
            </linearGradient>
            <filter id="heartGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#heartGrad)"
            filter="url(#heartGlow)"
          />
        </svg>
      </motion.div>

      {/* Floating info cards */}
      <motion.div
        className="heart-anim__float heart-anim__float--1"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="heart-anim__float-dot heart-anim__float-dot--green" />
        25 meals delivered today
      </motion.div>
      <motion.div
        className="heart-anim__float heart-anim__float--2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <span className="heart-anim__float-dot heart-anim__float-dot--blue" />
        12 packages on the way
      </motion.div>
      <motion.div
        className="heart-anim__float heart-anim__float--3"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span className="heart-anim__float-dot heart-anim__float-dot--red" />
        340 volunteers active
      </motion.div>
    </div>
  )
}
