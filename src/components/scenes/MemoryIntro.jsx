import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Character Images
import HANDS_IN_POCKET_IMG from '/stickers/hands_in_pocket-removebg-preview.png'
import TALKING_2_IMG from '/stickers/talking_2-removebg-preview.png'
import GREETING_IMG from '/stickers/greeting-removebg-preview.png'

const SEQUENCE = [
  {
    id: 'intro',
    img: HANDS_IN_POCKET_IMG,
    text: 'now I want to play a game called memory game',
    duration: 3000,
  },
  {
    id: 'explanation',
    img: TALKING_2_IMG,
    text: 'a pop up will show and tells you how to play it',
    duration: 4000,
  },
  {
    id: 'ready',
    img: GREETING_IMG,
    text: 'are you ready ?',
    duration: null, // Waits for button click
  },
]

const MemoryIntro = () => {
  const { setCurrentScene } = useStory()
  const [stepIndex, setStepIndex] = useState(-1)

  // Start sequence
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStepIndex(0)
    }, 1000)
    return () => clearTimeout(startTimer)
  }, [])

  // Advance sequence
  useEffect(() => {
    if (stepIndex >= 0 && stepIndex < SEQUENCE.length) {
      const currentStep = SEQUENCE[stepIndex]
      if (currentStep.duration) {
        const timer = setTimeout(() => {
          setStepIndex((prev) => prev + 1)
        }, currentStep.duration)
        return () => clearTimeout(timer)
      }
    }
  }, [stepIndex])

  const handleNext = () => setCurrentScene(SCENES.JUNGLE_MEMORY_QUEST)

  const currentData =
    stepIndex >= 0 && stepIndex < SEQUENCE.length ? SEQUENCE[stepIndex] : null

  return (
    <div className='relative h-full w-full overflow-hidden bg-sky-900 font-sans perspective-[1000px]'>
      {/* Background Atmosphere - Simplified Jungle/Night Vibe */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(20,40,60,0.4)_0%,rgba(5,10,20,0.95)_100%)] z-10 pointer-events-none'></div>

      {/* Character Container */}
      <AnimatePresence mode='wait'>
        {currentData && (
          <motion.div
            key={currentData.id}
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: 10,
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.05 },
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className='absolute w-full bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none'
          >
            {/* DIALOG BUBBLE */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className='absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-4 rounded-2xl shadow-xl max-w-[350px] text-center z-1000'
            >
              <p className='font-bold text-lg leading-tight'>
                {currentData.text}
              </p>
              {/* Little triangle pointer */}
              <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45'></div>
            </motion.div>

            {/* CHARACTER IMAGE */}
            <img
              src={currentData.img}
              alt='Character'
              className='h-[60vh] md:h-[70vh] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ready Button */}
      <AnimatePresence>
        {stepIndex === SEQUENCE.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className='absolute bottom-10 right-10 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all z-60 flex items-center gap-2 group cursor-pointer pointer-events-auto'
          >
            Ready{' '}
            <span className='group-hover:translate-x-1 transition-transform'>
              →
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MemoryIntro
