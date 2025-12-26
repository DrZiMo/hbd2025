import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// --- Main Component ---

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
    }, 40) // Slightly faster for testing

    return () => clearInterval(timer)
  }, [])

  const handleEnter = () => {
    if (!isLoaded) return
    setIsOpening(true)
    setTimeout(() => {
      setCurrentScene(SCENES.LATE_ROOM)
    }, 2000)
  }

  return (
    // Changed container from black to a scene container
    <div className='relative flex h-full w-full flex-col items-center justify-end overflow-hidden bg-stone-900 perspective-1000'>
      {/* --- THE PROFESSIONAL ENVIRONMENT (Wall & Floor) --- */}
      <div className='absolute inset-0 z-0'>
        {/* The Yellow Wall */}
        <div className='relative h-[80%] w-full bg-[#D8B054] overflow-hidden'>
          {/* Subtle Wall Texture/Pattern */}
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 20px, #4A3B12 20px, #4A3B12 21px)',
            }}
          ></div>
          <div className='absolute inset-0 bg-gradient-to-b from-black/20 to-transparent'></div>{' '}
          {/* Shadow from ceiling */}
          {/* Wall Decorations */}
          {/* Baseboard */}
          <div className='absolute bottom-0 h-5 w-full border-t border-amber-950 bg-[#3E2F23] shadow-sm'></div>
        </div>

        {/* The Cool Floor (Perspective) */}
        <div
          className='absolute bottom-0 h-[30%] w-full origin-bottom bg-[#2A211C]'
          style={{ transform: 'perspective(1000px) rotateX(50deg) scale(1.2)' }}
        >
          {/* Floor Planks Texture */}
          <div
            className='absolute inset-0 opacity-30'
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 40px, #000 40px, #000 42px)',
            }}
          ></div>
          {/* Shadow gradient near the wall */}
          <div className='absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-black/70'></div>
        </div>
      </div>

      {/* --- CONTENT (Loading & Door) --- */}
      <AnimatePresence>
        {!isOpening && (
          // Adjusted layout: Content sits at the bottom, z-10 to be above wall/floor
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            className='z-10 mb-[3%] flex h-full flex-col items-center justify-end gap-10'
          >
            {/* LOADING UI (Moved Above Door) */}
            <div className='flex relative -top-36 md:-top-18 lg:-top-12 w-72 flex-col items-center gap-3 rounded-xl bg-amber-50/90 p-4 shadow-lg backdrop-blur-sm'>
              <p className='font-mono text-sm font-bold text-amber-900'>
                {isLoaded
                  ? '✨ ESTATE READY. ENTER.'
                  : 'BUILDING ENVIRONMENT...'}
              </p>

              <div className='h-2 w-full overflow-hidden rounded-full bg-amber-200/50 shadow-inner'>
                <motion.div
                  className='h-full bg-linear-to-r from-orange-600 via-amber-500 to-yellow-500'
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className='flex w-full justify-between text-xs font-medium text-amber-800'>
                <span>System Status</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* DOOR & PLANT ROW */}
            <div className='flex items-end gap-6'>
              {/* The Door */}
              <div
                onClick={handleEnter}
                className={`
                  relative -top-38 md:-top-24 lg:-top-18 h-80 w-48 cursor-pointer transition-all duration-1000
                  ${
                    isLoaded
                      ? 'filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:scale-105'
                      : 'opacity-100 grayscale filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'
                  }
                `}
              >
                {/* Door Visual (CSS construction maintained) */}
                <div className='absolute inset-0 flex overflow-hidden rounded-t-sm border-4 border-b-0 border-[#2c150c] bg-[#612e1b] p-4 shadow-inner'>
                  {/* Knob */}
                  <div className='absolute top-[50%] right-3 h-6 w-6 rounded-full border-2 border-yellow-700 bg-yellow-500 shadow-md'>
                    <div className='absolute top-1 left-1 h-2 w-2 bg-white rounded-full opacity-50'></div>
                  </div>

                  {/* Panels */}
                  <div className='flex h-full w-full flex-col gap-3'>
                    <div className='flex h-3/5 gap-3'>
                      <div className='flex w-full items-center justify-center border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner'>
                        <div className='h-[90%] w-[90%] border-2 border-[#2c150c]'></div>
                      </div>
                      <div className='flex w-full items-center justify-center border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner'>
                        <div className='h-[90%] w-[90%] border-2 border-[#2c150c]'></div>
                      </div>
                    </div>
                    <div className='flex h-2/5 w-full'>
                      <div className='flex w-full items-center justify-center border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner'>
                        <div className='h-[85%] w-[95%] border-2 border-[#2c150c]'></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Doorstep shadow */}
                <div className='absolute -bottom-2 w-full h-4 bg-black/60 blur-md rounded-full'></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening Animation Overlay (Transition flash) */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 40] }}
          transition={{ duration: 2.5, ease: 'circIn' }}
          className='absolute inset-0 z-50 flex items-center justify-center bg-[#fffadd]' // Slightly warm white
        />
      )}
    </div>
  )
}

export default LoadingDoor
