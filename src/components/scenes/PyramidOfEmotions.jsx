import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'
import BG_IMG from '/pyramid background.jpg'
import STONE_TEXTURE from '/stone-texture.jpeg'

// ===============================
// CHAMBERS
// ===============================
const CHAMBERS = [
  {
    title: 'Chamber of Regret',
    intro: 'Every journey begins with acknowledging mistakes.',
    message: 'I was late... and that regret stayed with me.',
  },
  {
    title: 'Chamber of Gratitude',
    intro: 'Gratitude is the key that opens heavy doors.',
    message: 'Thank you for your patience.',
  },
  {
    title: 'Chamber of Promise',
    intro: 'A promise is not perfection — it is effort.',
    message: 'Not perfect — but present, learning, and trying.',
  },
  {
    title: 'Chamber of Heart',
    intro: 'This is the final chamber. The truth lives here.',
    message:
      'I was late.\nBut my heart never missed the moment.\n\nHappy Birthday.\nThank you for waiting for me, little sister.',
  },
]

// ===============================
// PARTICLES
// ===============================
const Particles = () => (
  <div className='absolute inset-0 pointer-events-none'>
    {[...Array(30)].map((_, i) => (
      <motion.span
        key={i}
        className='absolute w-1 h-1 bg-white/20 rounded-full'
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          y: [null, Math.random() * window.innerHeight],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 8 + Math.random() * 5,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
)

// ===============================
// STONE TILE (NO SHADOW)
// ===============================
const StoneTile = ({ num, onClick, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileTap={{ scale: 0.95 }}
    className={`
      w-20 h-20 rounded-md
      border border-[#3b2a17]
      text-3xl font-serif font-bold
      text-[#2b1c0d]
      flex items-center justify-center
      ${disabled ? 'opacity-40' : ''}
    `}
    style={{
      backgroundColor: '#c29044', // base stone color
      backgroundImage: `
        linear-gradient(
          145deg,
          rgba(255,255,255,0.08),
          rgba(0,0,0,0.18)
        ),
        url(${STONE_TEXTURE})
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'multiply',
    }}
  >
    {num}
  </motion.button>
)

// ===============================
// MODAL
// ===============================
const Modal = ({ title, text, onClose }) => (
  <motion.div
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className='bg-linear-to-br from-[#f5d58c] to-[#b89445] p-8 mx-4 rounded-xl text-center max-w-md text-orange-950'
    >
      <h2 className='text-3xl font-serif mb-4'>{title}</h2>
      <p className='mb-6'>{text}</p>
      <button
        onClick={onClose}
        className='px-6 py-2 bg-black text-white rounded-full'
      >
        Continue
      </button>
    </motion.div>
  </motion.div>
)

// ===============================
// MAIN COMPONENT
// ===============================
const PyramidOfEmotions = () => {
  const { setCurrentScene } = useStory()

  const [level, setLevel] = useState(0)
  const [sequence, setSequence] = useState([])
  const [scramble, setScramble] = useState([])
  const [solved, setSolved] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showChamberPopup, setShowChamberPopup] = useState(false)

  const chamber = CHAMBERS[level]

  useEffect(() => {
    setSequence([])
    setSolved(false)
    setScramble(
      [...Array(9).keys()].map((i) => i + 1).sort(() => Math.random() - 0.5)
    )
    setShowChamberPopup(true)
  }, [level])

  const handleClick = (num) => {
    const next = sequence.length + 1
    if (num === next) {
      const s = [...sequence, num]
      setSequence(s)
      if (s.length === 9) setSolved(true)
    } else {
      setSequence([])
      navigator.vibrate?.(120)
    }
  }

  return (
    <div className='relative h-screen w-full flex items-center justify-center overflow-hidden text-white'>
      <img
        src={BG_IMG}
        className='absolute inset-0 w-full h-full object-cover opacity-30'
      />
      <div className='absolute inset-0 bg-black/70' />
      <Particles />

      <AnimatePresence>
        {showIntro && (
          <Modal
            title='Pyramid of Emotions'
            text='Solve each chamber to ascend.'
            onClose={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && showChamberPopup && (
          <Modal
            title={chamber.title}
            text={chamber.intro}
            onClose={() => setShowChamberPopup(false)}
          />
        )}
      </AnimatePresence>

      {!showIntro && !showChamberPopup && (
        <div className='relative z-20 text-center'>
          <h1 className='text-4xl font-serif mb-6 text-amber-200'>
            {chamber.title}
          </h1>

          <div className='relative w-72 h-72 mx-auto'>
            <AnimatePresence>
              {solved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='absolute inset-0 bg-gradient-to-br from-[#f5d58c] to-[#b89445] text-black rounded-xl p-6 flex items-center justify-center z-0'
                >
                  <p className='whitespace-pre-line text-xl font-serif'>
                    {chamber.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className='grid grid-cols-3 gap-3 absolute inset-0 z-10'
              animate={solved ? { opacity: 0 } : {}}
              style={{ pointerEvents: solved ? 'none' : 'auto' }} // 🔥 FIX
            >
              {scramble.map((num) => (
                <StoneTile
                  key={num}
                  num={num}
                  disabled={sequence.includes(num)}
                  onClick={() => handleClick(num)}
                />
              ))}
            </motion.div>
          </div>

          {solved && (
            <button
              onClick={() =>
                level < 3
                  ? setLevel(level + 1)
                  : setCurrentScene(SCENES.MAIN_MESSAGE)
              }
              className='mt-10 px-8 py-3 bg-amber-400 text-black rounded-full font-bold relative z-30'
            >
              Continue →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PyramidOfEmotions
