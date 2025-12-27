import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- 1. WALL (Background) ---
const Wall = () => (
  <div className='absolute inset-0 z-0 h-full w-full bg-[#D8B054] overflow-hidden'>
    {/* Wall Texture */}
    <div
      className='absolute inset-0 opacity-10'
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent, transparent 20px, #4A3B12 20px, #4A3B12 21px)',
      }}
    />
    {/* Vignette/Shadow */}
    <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10' />
  </div>
)

// --- 2. FLOOR (Anchored to Door) ---
const Floor = () => (
  <div
    className='absolute top-[90%] left-1/2 -translate-x-1/2 w-[200vw] h-[60vh] -z-10 bg-[#392d26]'
    style={{
      transform: 'perspective(1000px) rotateX(60deg) scale(1.5)',
      transformOrigin: 'top center',
    }}
  >
    <div
      className='absolute inset-0 opacity-30'
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 40px, #000 40px, #000 42px)',
      }}
    />
    <div className='absolute inset-0 bg-linear-to-t from-transparent via-black/20 to-black/50' />
    <div className='absolute w-full h-10 bg-amber-700'></div>
  </div>
)

// --- 3. DOOR ---
const EstateDoor = ({ isLoaded, onClick }) => (
  <div
    onClick={onClick}
    className={`
      relative h-80 w-48 cursor-pointer transition-all duration-1000 z-20
      ${
        isLoaded
          ? 'filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:scale-105'
          : 'grayscale drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'
      }
    `}
  >
    <div className='absolute inset-0 flex overflow-hidden rounded-t-sm border-4 border-b-0 border-[#2c150c] bg-[#612e1b] p-4 shadow-inner'>
      {/* Knob */}
      <div className='absolute top-[50%] right-3 h-5 w-5 rounded-full border-2 border-yellow-700 bg-yellow-500 shadow-md'>
        <div className='absolute top-1 left-1 h-2 w-2 bg-white rounded-full opacity-50' />
      </div>

      {/* Panels */}
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex h-3/5 gap-3'>
          <div className='flex w-full items-center justify-center border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner'>
            <div className='h-[90%] w-[90%] border-2 border-[#2c150c]' />
          </div>
          <div className='flex w-full items-center justify-center border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner'>
            <div className='h-[90%] w-[90%] border-2 border-[#2c150c]' />
          </div>
        </div>
        <div className='flex h-2/5 w-full border-4 border-[#3e1c12] bg-[#4e2416] shadow-inner items-center justify-center'>
          <div className='h-[85%] w-[95%] border-2 border-[#2c150c]' />
        </div>
      </div>
    </div>
    {/* Door Shadow on Floor */}
    <div className='absolute -bottom-2 w-full h-4 bg-black/60 blur-md rounded-full' />
  </div>
)

// --- MAIN COMPONENT ---

const EstateEntrance = () => {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress((prev) => prev + 1), 30)
      return () => clearTimeout(timer)
    } else {
      setIsLoaded(true)
    }
  }, [progress])

  const handleEnter = () => {
    if (!isLoaded) return
    setIsOpening(true)
    setTimeout(() => {
      console.log('Navigating to next scene...')
    }, 2500)
  }

  return (
    <div className='relative h-screen w-full overflow-hidden bg-stone-900'>
      {/* 1. BACKGROUND WALL */}
      <Wall />

      {/* 2. CENTERED STAGE */}
      <div className='relative z-10 flex h-full w-full flex-col items-center justify-center'>
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              className='flex flex-col items-center'
            >
              {/* A. LOADING UI (Above Door) */}
              <div className='mb-12 flex w-64 flex-col items-center gap-3 rounded-xl bg-amber-50/90 p-4 shadow-lg backdrop-blur-sm'>
                <p className='font-mono text-xs font-bold text-amber-900 tracking-tighter'>
                  {isLoaded ? '✨ ESTATE READY.' : 'BUILDING ENVIRONMENT...'}
                </p>
                <div className='h-2 w-full overflow-hidden rounded-full bg-amber-200/50'>
                  <motion.div
                    className='h-full bg-gradient-to-r from-orange-600 to-yellow-500'
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className='flex w-full justify-between text-[10px] font-bold text-amber-800 uppercase'>
                  <span>Status</span>
                  <span>{progress}%</span>
                </div>
              </div>

              {/* B. DOOR & FLOOR WRAPPER */}
              <div className='relative flex flex-col items-center'>
                <EstateDoor isLoaded={isLoaded} onClick={handleEnter} />
                <Floor />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. TRANSITION OVERLAY */}
      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 50] }}
          transition={{ duration: 2.5, ease: 'circIn' }}
          className='absolute inset-0 z-50 flex items-center justify-center bg-[#fffadd]'
        />
      )}
    </div>
  )
}

export default EstateEntrance
