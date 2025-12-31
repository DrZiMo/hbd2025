import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Character Images
import HANDS_IN_POCKET_IMG from '/stickers/hands_in_pocket-removebg-preview.png'
import WORRYING_IMG from '/stickers/worrying-removebg-preview.png'
import TALKING_1_IMG from '/stickers/talking_1-removebg-preview.png'
import GREETING_IMG from '/stickers/greeting-removebg-preview.png'

const SEQUENCE = [
  {
    id: 'memories_planted',
    img: HANDS_IN_POCKET_IMG,
    text: 'That was some memories that still planted in my mind',
    duration: 5000,
  },
  {
    id: 'request_share',
    img: HANDS_IN_POCKET_IMG,
    text: "can you please share some memories from you with me that i didn't mention",
    duration: 5500,
  },
  {
    id: 'whatsapp_tiktok',
    img: WORRYING_IMG,
    text: 'tell me on whatsapp or tiktok later am gonna ask you inshallah',
    duration: 5000,
  },
  {
    id: 'next_game',
    img: HANDS_IN_POCKET_IMG,
    text: 'lets go to another game and its the last one called Pyramid of emotions',
    duration: 5500,
  },
  {
    id: 'read_popup',
    img: TALKING_1_IMG,
    text: 'Like before pop ups infos about the game, so read them.',
    duration: 5000,
  },
  {
    id: 'ready',
    img: GREETING_IMG,
    text: 'are you ready?',
    duration: null,
  },
]

const PyramidIntro = () => {
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

  const handleNext = () => setCurrentScene(SCENES.PYRAMID_OF_EMOTIONS)

  const currentData =
    stepIndex >= 0 && stepIndex < SEQUENCE.length ? SEQUENCE[stepIndex] : null

  return (
    <div className='relative h-full w-full overflow-hidden bg-rose-950 font-sans perspective-[1000px]'>
      {/* Background Atmosphere - Mysterious Pyramid Vibe */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(60,20,30,0.5)_0%,rgba(10,5,5,0.95)_100%)] z-10 pointer-events-none'></div>

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

export default PyramidIntro
