import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Character Images
import HANDS_IN_POCKET_IMG from '/stickers/hands_in_pocket-removebg-preview.png'
import TWO_HANDS_IMG from '/stickers/two_hands-removebg-preview.png'
import TALKING_2_IMG from '/stickers/talking_2-removebg-preview.png'
import HANDS_DOWN_IMG from '/stickers/hands_down-removebg-preview.png'
import WORRYING_IMG from '/stickers/worrying-removebg-preview.png'
import GREETING_IMG from '/stickers/greeting-removebg-preview.png'

const SEQUENCE = [
  {
    id: 1,
    img: HANDS_IN_POCKET_IMG,
    text: 'we finally reached the end of the website',
    duration: 3500,
  },
  {
    id: 2,
    img: TWO_HANDS_IMG,
    text: 'I was planing alot of staff but i made it minimal',
    duration: 3500,
  },
  {
    id: 3,
    img: TALKING_2_IMG,
    text: 'I can send you how the idea come to my mind and how i write it',
    duration: 4000,
  },
  {
    id: 4,
    img: HANDS_IN_POCKET_IMG,
    text: 'and also the features that i changed or removed',
    duration: 3500,
  },
  {
    id: 5,
    img: HANDS_DOWN_IMG,
    text: 'now i hope this simple website made you happy.',
    duration: 3500,
  },
  {
    id: 6,
    img: WORRYING_IMG,
    text: 'I know it is not perfect but you know and sorry for making you awake since you will wake up 2am ... so',
    duration: 3500,
  },
  {
    id: 7,
    img: GREETING_IMG,
    text: 'bye ...',
    duration: 2000,
  },
]

const MakingOf = () => {
  const [stepIndex, setStepIndex] = useState(0)

  // Advance sequence
  useEffect(() => {
    if (stepIndex < SEQUENCE.length) {
      const currentStep = SEQUENCE[stepIndex]
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1)
      }, currentStep.duration)
      return () => clearTimeout(timer)
    }
  }, [stepIndex])

  const finished = stepIndex >= SEQUENCE.length

  const currentData = stepIndex < SEQUENCE.length ? SEQUENCE[stepIndex] : null

  return (
    <div className='relative h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white p-8 overflow-hidden font-sans perspective-[1000px]'>
      {/* Background Ambience */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black opacity-80 z-0'></div>

      <AnimatePresence mode='wait'>
        {/* CHARACTER SEQUENCE */}
        {!finished && currentData && (
          <motion.div
            key={currentData.id}
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: 10,
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.5 },
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className='absolute w-full bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none'
          >
            {/* DIALOG BUBBLE */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className='absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-4 rounded-2xl shadow-xl max-w-[350px] text-center z-[100]'
            >
              <p className='font-bold text-lg leading-tight p-2'>
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

        {/* FINAL CREDIT */}
        {finished && (
          <motion.div
            key='credits'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className='text-center z-20 relative'
          >
            <div className='mb-6'>
              <span className='text-6xl'>❤️</span>
            </div>
            <p className='text-gray-300 text-xl font-light tracking-wide mb-2'>
              Made with love, time,
            </p>
            <p className='text-gray-400 text-lg font-light tracking-wide mb-8'>
              and a heart that never forgot.
            </p>
            <div className='text-sm text-gray-600 font-mono'>
              © 2025 Best Sibling Inc.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MakingOf
