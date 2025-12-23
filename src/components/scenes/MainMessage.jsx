import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const MESSAGE_LINES = [
  'I know I was late.',
  'And I know that matters.',
  'But not a single day passed without you in my heart.',
  'You’re not just my sister —',
  'You’re my safe place, my strength,',
  'And my reminder of what kindness looks like.',
  'I hope this journey made you smile,',
  'Even half as much as you’ve made my life brighter.',
  'Happy Birthday.',
  'You deserve every beautiful thing — always.',
]

const MainMessage = () => {
  const { setCurrentScene } = useStory()
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    // Auto-advance lines
    if (lineIndex < MESSAGE_LINES.length) {
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1)
      }, 3500) // 3.5s reading time per line
      return () => clearTimeout(timeout)
    } else {
      // All lines done, show continue button
    }
  }, [lineIndex])

  const handleNext = () => {
    setCurrentScene(SCENES.WISH_INTERACTION)
  }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-black text-white p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black'>
      {/* Background Ambience */}
      <div className='absolute inset-0 opacity-20'>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <div className='max-w-3xl z-10 min-h-[300px] flex flex-col justify-center'>
        <AnimatePresence mode='wait'>
          {lineIndex < MESSAGE_LINES.length && (
            <motion.h2
              key={lineIndex}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
              transition={{ duration: 1 }}
              className='text-3xl md:text-5xl font-light font-serif leading-relaxed'
            >
              {MESSAGE_LINES[lineIndex]}
            </motion.h2>
          )}

          {/* After all lines */}
          {lineIndex >= MESSAGE_LINES.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className='flex flex-col items-center gap-8'
            >
              <h1 className='text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                Happy Birthday.
              </h1>
              <p className='text-xl text-gray-400'>(Make a wish...)</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className='px-8 py-3 rounded-full bg-white text-black font-bold tracking-wider'
              >
                Make a Wish ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainMessage
