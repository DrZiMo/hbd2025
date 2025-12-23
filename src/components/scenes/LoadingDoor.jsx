import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const LoadingDoor = () => {
  const { setCurrentScene } = useStory()
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  // Simulate loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsLoaded(true)
          return 100
        }
        return prev + 1
      })
    }, 50) // Adjust speed as needed

    return () => clearInterval(timer)
  }, [])

  const handleEnter = () => {
    if (!isLoaded) return
    setIsOpening(true)

    // Slight delay for animation before switching scene
    setTimeout(() => {
      setCurrentScene(SCENES.LATE_ROOM)
    }, 2000)
  }

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center bg-black overflow-hidden perspective-1000'>
      {/* Background Particles (Dust) - Simplified CSS implementation */}
      <div className='absolute inset-0 z-0 opacity-30 pointer-events-none'>
        <div
          className='absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-white animate-pulse'
          style={{ animationDuration: '3s' }}
        ></div>
        <div
          className='absolute top-3/4 left-2/3 h-1 w-1 rounded-full bg-white animate-pulse'
          style={{ animationDuration: '4s' }}
        ></div>
        <div
          className='absolute top-1/3 left-3/4 h-1 w-1 rounded-full bg-white animate-pulse'
          style={{ animationDuration: '2.5s' }}
        ></div>
        <div
          className='absolute top-2/3 left-1/5 h-1 w-1 rounded-full bg-white animate-pulse'
          style={{ animationDuration: '5s' }}
        ></div>
      </div>

      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            className='z-10 flex flex-col items-center gap-8'
          >
            {/* Door Container */}
            <div
              onClick={handleEnter}
              className={`
                relative h-96 w-60 cursor-pointer transition-all duration-1000
                ${
                  isLoaded
                    ? 'shadow-[0_0_50px_rgba(255,165,0,0.3)] hover:scale-105 hover:shadow-[0_0_80px_rgba(255,165,0,0.6)]'
                    : 'opacity-80 grayscale'
                }
              `}
            >
              {/* Door Visual */}
              <div className='absolute inset-0 rounded-t-full border-4 border-stone-800 bg-stone-900 overflow-hidden flex'>
                {/* Texture */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1516450137517-162fcdd0709d?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center sepia brightness-50 contrast-125"></div>

                {/* Door Knobs/Details */}
                <div className='absolute top-1/2 right-4 h-4 w-4 rounded-full bg-yellow-900 shadow-inner'></div>
              </div>

              {/* Cracks Overlay (SVG or CSS) */}
              <div className='absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay'>
                <svg width='100%' height='100%' viewBox='0 0 200 400'>
                  <path d='M100 0 L100 400' stroke='black' strokeWidth='2' />
                </svg>
              </div>
            </div>

            {/* Loading Text & Bar */}
            <div className='flex w-64 flex-col items-center gap-2'>
              <p className='text-sm font-light text-stone-400 font-mono'>
                {isLoaded
                  ? 'Click to Enter'
                  : 'Loading all the resources before the beginning...'}
              </p>

              <div className='h-1 w-full overflow-hidden rounded-full bg-stone-800'>
                <motion.div
                  className='h-full bg-gradient-to-r from-orange-900 to-amber-600'
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className='text-xs text-stone-600 self-end'>{progress}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening Animation Overlay */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 30] }}
          transition={{ duration: 2, ease: 'easeIn' }}
          className='absolute inset-0 z-50 flex items-center justify-center bg-white'
        />
      )}
    </div>
  )
}

export default LoadingDoor
