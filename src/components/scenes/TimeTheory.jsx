import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const phrases = [
  "Time isn't always a straight line...",
  'Moments can be revisited.',
  "Love isn't limited by clocks.",
  'I know what we can do...',
  "Let's go back in time.",
]

const TimeTheory = () => {
  const { setCurrentScene } = useStory()
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step < phrases.length - 1) {
      setStep(step + 1)
    } else {
      // Ready for jump
    }
  }

  const handleJump = () => {
    setCurrentScene(SCENES.TIME_TRAVEL_GAME)
  }

  return (
    <div
      className='relative h-screen w-full flex flex-col items-center justify-center bg-black text-white overflow-hidden'
      onClick={handleNext}
    >
      {/* Background abstract time lines */}
      <div className='absolute inset-0 opacity-20 pointer-events-none'>
        <svg width='100%' height='100%'>
          <motion.path
            d='M0 300 Q 400 100 800 300 T 1600 300'
            fill='none'
            stroke='cyan'
            strokeWidth='2'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d='M0 500 Q 400 700 800 500 T 1600 500'
            fill='none'
            stroke='magenta'
            strokeWidth='2'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
        </svg>
      </div>

      <div className='z-10 max-w-2xl px-8 text-center'>
        <AnimatePresence mode='wait'>
          <motion.h2
            key={step}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className='text-3xl md:text-5xl font-light leading-relaxed cursor-pointer select-none'
          >
            {phrases[step]}
          </motion.h2>
        </AnimatePresence>

        {step < phrases.length - 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2 }}
            className='mt-8 text-sm text-gray-500 animate-pulse'
          >
            (Click to continue)
          </motion.p>
        )}
      </div>

      {step === phrases.length - 1 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px cyan' }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            handleJump()
          }}
          className='mt-12 px-8 py-4 bg-cyan-600 text-white rounded-full font-bold text-xl tracking-wider uppercase shadow-[0_0_20px_rgba(0,255,255,0.4)] z-20'
        >
          Start Time Jump ⏳
        </motion.button>
      )}
    </div>
  )
}

export default TimeTheory
