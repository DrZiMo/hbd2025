import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const CHAMBERS = [
  {
    id: 'REGRET',
    title: 'Chamber of Regret',
    message: 'I was late... and that regret stayed with me.',
    bg: 'bg-indigo-900',
  },
  {
    id: 'GRATITUDE',
    title: 'Chamber of Gratitude',
    message: 'Thank you for your patience.',
    bg: 'bg-purple-900',
  },
  {
    id: 'PROMISE',
    title: 'Chamber of Promise',
    message: 'Not perfect — but present, learning, and trying.',
    bg: 'bg-blue-900',
  },
  {
    id: 'HEART',
    title: 'Chamber of Heart',
    message:
      'I was late.\nBut my heart never missed the moment.\n\nHappy Birthday.\nThank you for waiting for me, little sister.',
    bg: 'bg-rose-900',
  },
]

const PyramidOfEmotions = () => {
  const { setCurrentScene } = useStory()
  const [level, setLevel] = useState(0) // 0-3
  const [sequence, setSequence] = useState([]) // Current clicks in puzzle
  const [scramble, setScramble] = useState([]) // Random numbers position
  const [showMessage, setShowMessage] = useState(false)

  // Initialize random grid for new level
  useEffect(() => {
    if (level < 3) {
      setSequence([])
      setShowMessage(false)
      setScramble(
        [...Array(9).keys()].map((i) => i + 1).sort(() => Math.random() - 0.5)
      )
    } else {
      // Final level logic (Heart)
      setShowMessage(true)
    }
  }, [level])

  const handleNumberClick = (num) => {
    if (showMessage) return

    const nextExpected = sequence.length + 1
    if (num === nextExpected) {
      const newSeq = [...sequence, num]
      setSequence(newSeq)
      if (newSeq.length === 9) {
        // Level Complete
        setShowMessage(true)
        setTimeout(() => {
          // Wait a bit before allowing next level
        }, 1000)
      }
    } else {
      // Mistake - Shake/Reset
      setSequence([])
      // Maybe add visual feedback like red flash
    }
  }

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(level + 1)
    } else {
      setCurrentScene(SCENES.MAIN_MESSAGE)
    }
  }

  const currentChamber = CHAMBERS[level]

  return (
    <div
      className={`relative h-screen w-full flex flex-col items-center justify-center text-center p-4 transition-colors duration-1000 ${currentChamber.bg}`}
    >
      <motion.h1
        key={currentChamber.title}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-4xl text-white font-serif mb-8'
      >
        {currentChamber.title}
      </motion.h1>

      <div className='relative'>
        {level < 3 ? (
          /* Puzzle Grid */
          !showMessage ? (
            <div className='grid grid-cols-3 gap-4 w-72 h-72'>
              {scramble.map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={sequence.includes(num)}
                  onClick={() => handleNumberClick(num)}
                  className={`
                      rounded-lg text-2xl font-bold transition-all duration-300
                      ${
                        sequence.includes(num)
                          ? 'bg-green-500 text-white opacity-50'
                          : 'bg-white/20 text-white hover:bg-white/40'
                      }
                    `}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          ) : (
            /* Success Message for Chamber */
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/30 max-w-md'
            >
              <p className='text-xl font-light leading-relaxed mb-6'>
                {currentChamber.message}
              </p>
              <button
                onClick={handleNextLevel}
                className='px-6 py-2 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-200'
              >
                Ascend →
              </button>
            </motion.div>
          )
        ) : (
          /* Final Heart Chamber */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center'
          >
            <div className='text-rose-400 text-6xl mb-6 font-serif whitespace-pre-line leading-relaxed'>
              {currentChamber.message}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setCurrentScene(SCENES.MAIN_MESSAGE)}
              className='mt-12 px-8 py-3 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-500'
            >
              Open Final Gift 🎁
            </motion.button>
          </motion.div>
        )}
      </div>

      {level < 3 && !showMessage && (
        <p className='absolute bottom-10 text-white/50 text-sm'>
          Tap numbers 1 to 9 in order.
        </p>
      )}
    </div>
  )
}

export default PyramidOfEmotions
