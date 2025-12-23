import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const STEPS = [
  {
    title: 'The Concept',
    desc: 'First, I just wanted to say sorry...',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'The Design',
    desc: 'Then I thought about what you love...',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'The Code',
    desc: 'It took some late nights, but it was worth it.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  },
]

const MakingOf = () => {
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (step < STEPS.length) {
      const timer = setTimeout(() => setStep((prev) => prev + 1), 4000) // 4s per slide
      return () => clearTimeout(timer)
    } else {
      setFinished(true)
    }
  }, [step])

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white p-8 overflow-hidden'>
      {!finished ? (
        <div className='relative w-full max-w-4xl h-full flex flex-col items-center justify-center'>
          {STEPS.map(
            (s, i) =>
              i === step && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col md:flex-row items-center gap-8 bg-zinc-800 p-6 rounded-2xl shadow-xl'
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className='w-64 h-48 object-cover rounded-lg shadow-md grayscale hover:grayscale-0 transition-all'
                  />
                  <div className='text-center md:text-left'>
                    <h3 className='text-2xl font-serif text-amber-100'>
                      {s.title}
                    </h3>
                    <p className='mt-4 text-gray-300 text-lg italic'>
                      "{s.desc}"
                    </p>
                  </div>
                </motion.div>
              )
          )}

          <div className='absolute bottom-10 flex gap-2'>
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full transition-colors ${
                  i === step ? 'bg-amber-400' : 'bg-gray-700'
                }`}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='text-center'
        >
          <p className='text-gray-400 mb-8 font-light tracking-wide'>
            Made with love, time, and a heart that never forgot.
          </p>
          <div className='text-xs text-gray-600'>© 2025 Best Sibling Inc.</div>
        </motion.div>
      )}
    </div>
  )
}

export default MakingOf
