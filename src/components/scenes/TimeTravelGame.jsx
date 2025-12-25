import React, { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

/* ===================== ROCKET DIALOG ===================== */
const RocketDialog = ({ month }) => {
  const messages = {
    12: '🚀 Just rewatched Interstellar… got inspired! I love space & time-travel movies, and I wanted to make something special for you!',
    11: 'Reversing time from month 12… physics, please be gentle. I hope this journey brings a smile. 😊',
    10: 'Theoretically, going back in time is possible near a black hole… but I’d do it just to relive our moments together. 💖',
    9: 'Imagine if we had tech to change the past… I’d spend it making you laugh even more!',
    8: 'I wish I could go back and enjoy every moment we shared, over and over. 😔💞',
    7: 'Love you so much, sister 💐 You make every timeline brighter.',
    6: '✅ Month 6 reached! Timeline stabilized.',
  }

  return (
    <motion.div
      key={month}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className='absolute -top-40 left-1/2 -translate-x-1/2 z-50'
    >
      <div className='relative bg-white text-black text-xs font-mono px-4 py-2 rounded-xl shadow-xl w-[160px] text-center'>
        {messages[month] || '⏳ Recalculating spacetime…'}
        <div className='absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45' />
      </div>
    </motion.div>
  )
}

/* ===================== ROCKET ===================== */
const Rocket = ({ xMotion, isMobile, month }) => (
  <motion.div
    style={{ x: xMotion }}
    drag={isMobile ? 'x' : false}
    dragConstraints={{ left: -240, right: 240 }}
    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[20%] z-40'
  >
    <div className='relative flex flex-col items-center'>
      {/* Rocket Dialog */}
      <RocketDialog month={month} />

      {/* Flame */}
      <motion.div
        animate={{ scaleY: [1, 1.7, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 0.14 }}
        className='absolute -bottom-14 w-6 h-20 bg-gradient-to-t from-transparent via-cyan-400 to-white blur-lg rounded-full'
      />

      {/* Body */}
      <div className='w-14 h-24 rounded-t-full bg-gradient-to-b from-slate-100 to-slate-400 border-x border-white/30 shadow-[0_0_30px_rgba(0,255,255,0.3)] relative'>
        <div className='absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-900 border border-cyan-400' />
        <div className='absolute -left-4 bottom-1 w-5 h-10 bg-slate-500 rounded-l-xl' />
        <div className='absolute -right-4 bottom-1 w-5 h-10 bg-slate-500 rounded-r-xl' />
      </div>
    </div>
  </motion.div>
)

/* ===================== MAIN COMPONENT ===================== */
const TimeTravelGame = () => {
  const { setCurrentScene } = useStory()
  const [month, setMonth] = useState(12)
  const [gameStarted, setGameStarted] = useState(false)
  const [showLevelLine, setShowLevelLine] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const rocketRef = useRef()
  const xMotion = useMotionValue(0)
  const smoothX = useSpring(xMotion, { stiffness: 120, damping: 22 })

  /* ===================== INPUT HANDLING ===================== */
  useEffect(() => {
    setIsMobile('ontouchstart' in window)
    const handleKeyDown = (e) => {
      const step = 60
      const x = xMotion.get()
      if (e.key === 'ArrowLeft') xMotion.set(Math.max(x - step, -240))
      if (e.key === 'ArrowRight') xMotion.set(Math.min(x + step, 240))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [xMotion])

  /* ===================== MONTH FLOW ===================== */
  useEffect(() => {
    if (!gameStarted) return
    if (month <= 6) {
      setTimeout(() => setCurrentScene(SCENES.FIXED_TIMELINE_ROOM), 4000)
      return
    }
    const timer = setTimeout(() => {
      setShowLevelLine(true)
      setMonth((m) => m - 1)
      setTimeout(() => setShowLevelLine(false), 1800)
    }, 5000)
    return () => clearTimeout(timer)
  }, [month, gameStarted, setCurrentScene])

  /* ===================== UI ===================== */
  return (
    <div className='relative h-screen w-full overflow-hidden bg-[#020617] select-none'>
      {/* Background */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_70%)]' />

      {/* Stars (moving down) */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-[1px] h-[1px] bg-white rounded-full'
          initial={{ y: '-10%', opacity: Math.random() * 0.6 + 0.2 }}
          animate={{ y: '110%' }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* HUD */}
      <div className='absolute top-8 left-1/2 -translate-x-1/2 text-center z-50'>
        <p className='text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase'>
          Temporal Rewind
        </p>
        <h2 className='text-6xl font-black text-white italic'>
          {month < 10 ? `0${month}` : month}
          <span className='text-cyan-400'>.00</span>
        </h2>
      </div>

      {/* Science Note */}
      <div className='absolute bottom-6 right-6 max-w-xs text-right text-[10px] text-slate-400 font-mono leading-relaxed opacity-80'>
        <p>
          According to relativity, time can slow down — but reversing it
          violates entropy.
        </p>
        <p className='text-cyan-400 mt-1'>
          This rocket is doing something the universe dislikes.
        </p>
      </div>

      {/* Info Popup */}
      <AnimatePresence>
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 z-[200] bg-black/80 backdrop-blur-lg flex items-center justify-center px-5'
          >
            <div className='max-w-md bg-slate-900 p-8 rounded-3xl border border-white/10 text-center shadow-2xl'>
              <div className='text-4xl mb-4'>🚀</div>
              <h3 className='text-3xl font-bold text-white mb-3'>
                Time Rewind Protocol
              </h3>
              <p className='text-slate-400 mb-6'>
                We are traveling back from <b>Month 12</b> to <b>Month 06</b>.
                <br />
                Physics may complain.
                <br />
                and also the text may be so fast so read fast, ok? 😂
              </p>
              <button
                onClick={() => setGameStarted(true)}
                className='w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl transition-all hover:scale-105'
              >
                INITIATE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Line */}
      <AnimatePresence>
        {showLevelLine && (
          <motion.div
            initial={{ top: '-20%' }}
            animate={{ top: '120%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'linear' }}
            className='absolute left-0 w-full h-[20vh] z-40 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent border-y border-cyan-400/40 flex items-center justify-center'
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Rocket */}
      <div ref={rocketRef} className='relative w-full h-full'>
        <Rocket xMotion={smoothX} isMobile={isMobile} month={month} />
      </div>
    </div>
  )
}

export default TimeTravelGame
