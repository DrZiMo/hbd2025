import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const FixedTimelineRoom = () => {
  const { setCurrentScene } = useStory()
  const [showCharacter, setShowCharacter] = useState(false)
  const [dialogueStep, setDialogueStep] = useState(0)

  useEffect(() => {
    // Delay character entry
    const timer = setTimeout(() => {
      setShowCharacter(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showCharacter) {
      const timer = setTimeout(() => setDialogueStep(1), 500)
      return () => clearTimeout(timer)
    }
  }, [showCharacter])

  const handleNext = () => {
    setCurrentScene(SCENES.ADVENTURE_CHOICE)
  }

  return (
    <div className='relative h-full w-full overflow-hidden bg-orange-50 transition-colors duration-1000'>
      {/* Background Room Atmosphere - Bright & Warm */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,240,1)_0%,_rgba(255,228,196,1)_100%)]'></div>

      {/* Sunlight Ray */}
      <div className='absolute top-0 right-20 h-full w-40 origin-top rotate-12 bg-yellow-100 opacity-60 blur-xl'></div>

      {/* Decorations - Clean confetti/balloons */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute rounded-full opacity-60'
            style={{
              top: Math.random() * 50 + '%',
              left: Math.random() * 100 + '%',
              width: Math.random() * 10 + 10 + 'px',
              height: Math.random() * 10 + 10 + 'px',
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
            }}
          ></div>
        ))}
      </div>

      {/* Fresh Cake */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-10 hover:scale-105 transition-transform'>
        <div className='relative'>
          <div className='h-24 w-32 bg-white rounded-lg shadow-lg border-b-4 border-gray-200'></div>
          {/* Cake Layers */}
          <div className='absolute bottom-24 left-4 h-16 w-24 bg-pink-300 rounded-md shadow-md'></div>
          <div className='absolute bottom-40 left-8 h-12 w-16 bg-pink-400 rounded-md shadow-md'></div>
          {/* Candles */}
          <div className='absolute bottom-52 left-10 h-6 w-1 bg-yellow-400 animate-pulse'></div>
          <div className='absolute bottom-52 left-14 h-6 w-1 bg-blue-400 animate-pulse'></div>
          <div className='absolute bottom-52 left-18 h-6 w-1 bg-green-400 animate-pulse'></div>

          <div className='absolute -top-12 left-6 text-xl text-yellow-500 font-bold animate-bounce'>
            {' '}
            Happy Birthday!{' '}
          </div>
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
            {/* Character */}
            <div className='h-32 w-24 bg-white rounded-full relative shadow-[0_0_20px_rgba(255,165,0,0.4)]'>
              <div className='absolute top-8 left-6 h-3 w-3 bg-black rounded-full'></div>
              <div className='absolute top-8 right-6 h-3 w-3 bg-black rounded-full'></div>
              <div className='absolute top-18 left-8 h-2 w-8 bg-black rounded-full'></div>{' '}
              {/* Smile */}
            </div>

            {/* Dialogue Bubble */}
            <AnimatePresence mode='wait'>
              {dialogueStep === 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='absolute -top-32 -left-48 bg-white text-gray-800 p-4 rounded-xl rounded-br-none font-medium text-lg w-64 text-center shadow-xl border border-orange-100'
                >
                  <p>See? I wasn’t late...</p>
                  <p className='text-sm mt-2 font-bold text-orange-500'>
                    I was just fixing the timeline! ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {dialogueStep === 1 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className='absolute bottom-8 right-8 px-6 py-2 bg-orange-400 text-white font-bold rounded-full hover:bg-orange-500 shadow-lg'
        >
          Sounds legit, continue →
        </motion.button>
      )}
    </div>
  )
}

export default FixedTimelineRoom
