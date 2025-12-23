import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const LateRoom = () => {
  const { setCurrentScene } = useStory()
  const [showCharacter, setShowCharacter] = useState(false)
  const [dialogueStep, setDialogueStep] = useState(0)

  useEffect(() => {
    // Delay character entry
    const timer = setTimeout(() => {
      setShowCharacter(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showCharacter) {
      // "BOO!" timing
      const timer1 = setTimeout(() => setDialogueStep(1), 500)
      // "oh oh" timing
      const timer2 = setTimeout(() => setDialogueStep(2), 3500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [showCharacter])

  const handleNext = () => {
    setCurrentScene(SCENES.TIME_THEORY)
  }

  return (
    <div className='relative h-full w-full overflow-hidden bg-gray-900 transition-colors duration-1000'>
      {/* Background Room Atmosphere */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,30,1)_0%,_rgba(0,0,0,1)_100%)]'></div>

      {/* Moonlight Ray */}
      <div className='absolute top-0 right-20 h-full w-40 origin-top rotate-12 bg-blue-100 opacity-5 blur-2xl'></div>

      {/* Spider Webs (CSS shapes) */}
      <div className='absolute top-0 left-0 h-32 w-32 opacity-30'>
        <svg width='100%' height='100%' viewBox='0 0 100 100'>
          <path
            d='M0 0 L100 50 M0 0 L50 100 M0 0 L100 100'
            stroke='white'
            strokeWidth='0.5'
            fill='none'
          />
          <path
            d='M20 10 Q30 30 10 20'
            stroke='white'
            strokeWidth='0.5'
            fill='none'
          />
        </svg>
      </div>

      {/* Broken Decor & Cake */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700'>
        <div className='relative'>
          <div className='h-24 w-32 bg-stone-800 rounded-lg transform skew-x-3'></div>
          {/* Rotten Cake */}
          <div className='absolute bottom-8 left-6 h-12 w-20 bg-green-900 rounded-md'>
            <div className='absolute -top-4 left-4 h-4 w-1 bg-gray-600 rotate-12'></div>
            <div className='absolute -top-2 left-6 text-xl text-gray-500'>
              💨
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton visual placeholder */}
      <div className='absolute bottom-12 left-10 opacity-40'>
        <div className='flex flex-col items-center'>
          <div className='h-8 w-8 rounded-full border-2 border-gray-400 bg-gray-900 mb-1'></div>
          <div className='h-16 w-1 bg-gray-400'></div>
          <div className='text-xs text-gray-500 mt-2'>Party Skeleton</div>
        </div>
      </div>

      {/* Character Animation */}
      <AnimatePresence>
        {showCharacter && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className='absolute bottom-20 right-20 z-10'
          >
            {/* Simple Character Shape */}
            <div className='h-32 w-24 bg-white rounded-full relative shadow-[0_0_20px_rgba(255,255,255,0.2)]'>
              <div className='absolute top-8 left-6 h-3 w-3 bg-black rounded-full'></div>
              <div className='absolute top-8 right-6 h-3 w-3 bg-black rounded-full'></div>
              <div className='absolute top-16 left-8 h-2 w-8 bg-black rounded-full'></div>
            </div>

            {/* Dialogue Bubble */}
            <AnimatePresence mode='wait'>
              {dialogueStep === 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='absolute -top-24 -left-32 bg-white text-black p-4 rounded-xl rounded-br-none font-bold text-2xl w-48 text-center shadow-lg transform rotate-[-5deg]'
                >
                  BOO! Happy Birthday! 🎉
                </motion.div>
              )}
              {dialogueStep === 2 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='absolute -top-24 -left-32 bg-stone-200 text-stone-800 p-3 rounded-xl rounded-br-none font-medium text-lg w-52 text-center shadow-lg'
                >
                  <p>...oh oh 😅</p>
                  <p className='text-sm mt-1'>I think I’m toooo late.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Hint */}
      {dialogueStep === 2 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className='absolute bottom-8 right-8 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200'
        >
          What now? →
        </motion.button>
      )}
    </div>
  )
}

export default LateRoom
