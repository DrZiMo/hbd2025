import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Images (Keeping the Cake and Table, dropping the horror ones)
import CAKE_IMG from '/cake.png'
import TABLE_IMG from '/table.png'
// We might not need the others, but let's keep imports clean.

// --- SUB-COMPONENTS ---

// 1. Sparkles (replaces DustMote)
const Sparkle = ({ x, y, duration, delay }) => {
  return (
    <motion.div
      className='absolute w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[1px] pointer-events-none z-30'
      initial={{ x: `${x}%`, y: `${y}%`, opacity: 0, scale: 0 }}
      animate={{
        y: [`${y}%`, `${y - 20}%`],
        x: [`${x}%`, `${x + 5}%`],
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// 2. Nice Curtain (replaces TatteredCurtain)
const NiceCurtain = ({ side }) => {
  const isLeft = side === 'left'
  // A gentle sway, cleaner shape
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isLeft ? [0, 1, 0] : [0, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-[-10px] ${
        isLeft ? '-left-8' : '-right-8'
      } w-24 h-[110%] z-20 pointer-events-none`}
    >
      <div
        className='w-full h-full bg-pink-100 opacity-90 shadow-lg'
        style={{
          // A nice curved curtain shape
          clipPath: isLeft
            ? 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'
            : 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
          background: 'linear-gradient(to bottom, #ec4899 0%, #be185d 100%)', // Darker Pink gradient (pink-500 to pink-700)
        }}
      />
      {/* Texture/Pattern overlay could go here */}
    </motion.div>
  )
}

const FixedTimelineRoom = () => {
  const { setCurrentScene } = useStory()
  const [showCharacter, setShowCharacter] = useState(false)
  const [dialogueStep, setDialogueStep] = useState(0)
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    // Generate happy sparkles
    setSparkles(
      [...Array(25)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 5, // Faster, happier movement
        delay: Math.random() * 2,
      }))
    )
  }, [])

  // Sequence Logic
  useEffect(() => {
    // Character enters after a moment
    const entryTimer = setTimeout(() => setShowCharacter(true), 1000)
    return () => clearTimeout(entryTimer)
  }, [])

  useEffect(() => {
    if (showCharacter) {
      // Logic from old FixedTimelineRoom: Wait 500ms then show dialogue
      const timer = setTimeout(() => setDialogueStep(1), 500)
      return () => clearTimeout(timer)
    }
  }, [showCharacter])

  const handleNext = () => setCurrentScene(SCENES.ADVENTURE_CHOICE)

  return (
    <div className='relative h-full w-full overflow-hidden bg-pink-50 font-sans perspective-[1000px]'>
      {/* --- SCENE ATMOSPHERE --- */}

      {/* 1. Warm Vignette Overlay */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.2)_0%,rgba(255,192,203,0.1)_100%)] z-40 pointer-events-none'></div>

      {/* 2. Sunlight Beam (Warm & Bright) */}
      <div className='absolute top-[-10%] right-[5%] w-[400px] h-[150%] bg-yellow-100/30 rotate-25 blur-3xl transform origin-top pointer-events-none z-10'></div>

      {/* 3. Sparkles */}
      <div className='absolute inset-0 z-30 pointer-events-none'>
        {sparkles.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
      </div>

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* No Spiderwebs! */}

      {/* The Clean Window */}
      <div className='absolute top-12 right-24 w-48 h-72 z-10'>
        {/* The View Outside (Bright Blue Sky & Clouds) */}
        <div className='absolute inset-2 bg-sky-300 overflow-hidden rounded-sm'>
          {/* Sun */}
          <div className='absolute top-4 right-4 w-12 h-12 rounded-full bg-yellow-300 blur-md opacity-90 shadow-[0_0_20px_rgba(255,255,0,0.6)]'></div>
          {/* Clouds */}
          <div className='absolute top-10 left-4 w-16 h-8 bg-white rounded-full blur-sm opacity-80'></div>
          <div className='absolute bottom-10 right-10 w-20 h-10 bg-white rounded-full blur-sm opacity-60'></div>
        </div>

        {/* The Clean Frame */}
        <div className='absolute inset-0 border-8 border-orange-50 rounded-sm shadow-md bg-transparent z-10'>
          {/* Inner detail line */}
          <div className='absolute inset-0 border border-orange-100 opacity-50 pointer-events-none'></div>
        </div>

        {/* Window Cross-Bars (Clean) */}
        <div className='absolute top-1/2 left-0 w-full h-2 bg-orange-50 shadow-sm z-10'></div>
        <div className='absolute top-0 left-1/2 w-2 h-full bg-orange-50 shadow-sm z-10'></div>

        {/* Glass Reflection (Subtle) */}
        <div className='absolute top-0 right-0 w-full h-full bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10'></div>

        {/* Curtains & Sill */}
        <NiceCurtain side='left' />
        <NiceCurtain side='right' />
        <div className='absolute -bottom-4 -left-4 w-[120%] h-6 bg-orange-100 shadow-md rounded-sm z-30'></div>
      </div>

      {/* --- THE FLOOR --- */}
      {/* 3D Perspective Floor (Lighter Wood) */}
      <div className='absolute bottom-0 left-0 right-0 h-[25%] z-0'>
        {/* Baseboard */}
        <div className='absolute top-0 w-full h-4 bg-orange-100 border-t border-white shadow-sm z-20'></div>

        {/* The Floor Plane */}
        <div
          className='absolute top-0 left-[-50%] w-[200%] h-[200%] bg-[#3e2723] origin-top' // Dark brown wood base
          style={{
            transform: 'perspective(100vh) rotateX(60deg)',
            // Cleaner wood texture pattern
            backgroundImage: `
                repeating-linear-gradient(
                    0deg, 
                    transparent 0px, 
                    transparent 38px, 
                    rgba(0,0,0,0.3) 39px, 
                    rgba(0,0,0,0.3) 40px
                ),
                repeating-linear-gradient(
                    90deg, 
                    transparent 0px, 
                    transparent 198px, 
                    rgba(255,255,255,0.05) 199px, 
                    rgba(255,255,255,0.05) 200px
                )
             `,
            backgroundSize: '100% 40px',
            boxShadow: 'inset 0 100px 100px -50px rgba(0,0,0,0.5)', // Darker shadow
          }}
        >
          {/* Sunlight Reflection on the Floor */}
          <div className='absolute top-[10%] right-[30%] w-[300px] h-[400px] bg-yellow-200/20 blur-[40px] rounded-full transform rotate-12'></div>
        </div>
      </div>

      {/* --- INTERACTIVE PROPS --- */}

      {/* No Skeleton! */}

      {/* The Center Table with FRESH Cake */}
      <div className='absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex flex-col items-center z-20'>
        <div className='relative mb-[-10px]'>
          <div className='relative -top-36 md:-top-14'>
            <div className='flex flex-col justify-center items-center relative'>
              <img
                src={CAKE_IMG}
                alt='Fresh Cake'
                className='w-40 h-auto object-cover rounded-lg absolute top-[-90px] z-6 drop-shadow-xl'
                style={{
                  // NO FILTERS! Fresh cake.
                  filter: 'brightness(1.1) contrast(1.05)',
                }}
              />
            </div>
            <div className='w-80'>
              <img
                src={TABLE_IMG}
                alt='table'
                className='w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]'
                style={{
                  // Cleaner table
                  filter: 'brightness(1.2) sepia(0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- CHARACTER --- */}
      <AnimatePresence>
        {showCharacter && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
            className='absolute bottom-20 right-20 z-30'
          >
            {/* Simple Geometric Character from original FixedTimelineRoom */}
            <div className='h-32 w-24 bg-white rounded-full relative shadow-[0_0_20px_rgba(255,255,255,0.8)]'>
              <div className='absolute top-8 left-6 h-3 w-3 bg-black rounded-full'></div>
              <div className='absolute top-8 right-6 h-3 w-3 bg-black rounded-full'></div>
              {/* Happy Smile */}
              <div className='absolute top-18 left-8 h-2 w-8 bg-black rounded-full'></div>
              {/* Blush */}
              <div className='absolute top-12 left-3 h-2 w-4 bg-pink-300 rounded-full blur-[2px]'></div>
              <div className='absolute top-12 right-3 h-2 w-4 bg-pink-300 rounded-full blur-[2px]'></div>
            </div>

            {/* Dialogue Bubble */}
            <AnimatePresence mode='wait'>
              {dialogueStep === 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className='absolute -top-32 -left-48 bg-white text-gray-800 p-4 rounded-xl rounded-br-none font-medium text-lg w-64 text-center shadow-xl border border-pink-100'
                >
                  <p>See? I wasn’t late...</p>
                  <p className='text-sm mt-2 font-bold text-pink-500'>
                    I was just fixing the timeline! ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Button */}
      <AnimatePresence>
        {dialogueStep === 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className='absolute bottom-10 right-10 px-8 py-3 bg-white/80 backdrop-blur-md border border-pink-200 text-pink-600 font-bold rounded-full hover:bg-white hover:border-pink-300 transition-all z-50 flex items-center gap-2 group shadow-lg'
          >
            Sounds legit, continue{' '}
            <span className='group-hover:translate-x-1 transition-transform'>
              →
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FixedTimelineRoom
