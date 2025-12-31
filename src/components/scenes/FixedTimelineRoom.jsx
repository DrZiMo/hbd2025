import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Images (Keeping the Cake and Table, dropping the horror ones)
import CAKE_IMG from '/cake.png'
import TABLE_IMG from '/table.png'

// Character Images
import TWO_HANDS_IMG from '/stickers/two_hands-removebg-preview.png'
import TALKING_2_IMG from '/stickers/talking_2-removebg-preview.png'
import HANDS_IN_POCKET_IMG from '/stickers/hands_in_pocket-removebg-preview.png'

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

// Sequence Data
const SEQUENCE = [
  {
    id: 'intro',
    img: TWO_HANDS_IMG,
    text: "see ? I wasn't late",
    duration: 3000,
  },
  {
    id: 'travel',
    img: TALKING_2_IMG,
    text: 'time traveling is so intresting',
    duration: 3000,
  },
  {
    id: 'action',
    img: HANDS_IN_POCKET_IMG,
    text: 'click the button below to continue',
    duration: null, // Stays until clicked
  },
]

const FixedTimelineRoom = () => {
  const { setCurrentScene } = useStory()
  const [stepIndex, setStepIndex] = useState(-1)
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
    // Start sequence after 1 second
    const startTimer = setTimeout(() => {
      setStepIndex(0)
    }, 1000)

    return () => clearTimeout(startTimer)
  }, [])

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

  const handleNext = () => setCurrentScene(SCENES.ADVENTURE_CHOICE)

  const currentData = stepIndex >= 0 ? SEQUENCE[stepIndex] : null

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

      {/* --- MAIN CONTENT CONTAINER (Relative Positioning) --- */}
      <div className='relative h-full w-full'>
        {/* FLOOR - Relative positioned at bottom */}
        <div className='relative w-full h-[30%] mt-auto' style={{ top: '70%' }}>
          {/* Floor Plane */}
          <div
            className='relative w-full h-[200%] bg-[#3e2723] origin-top'
            style={{
              transform: 'perspective(100vh) rotateX(60deg)',
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
              boxShadow: 'inset 0 100px 100px -50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Sunlight Reflection on the Floor */}
            <div className='absolute top-[10%] right-[30%] w-[300px] h-[400px] bg-yellow-200/20 blur-[40px] rounded-full transform rotate-12'></div>
          </div>
        </div>

        {/* TABLE & CAKE - Relative positioned near center */}
        <div
          className='relative w-full z-15 top-[-80%]'
          style={{ top: '45%', transform: 'translateY(-50%)' }}
        >
          <div className='relative mx-auto w-80'>
            {/* Cake positioned above the table */}
            <div className='absolute -top-24 left-1/2 transform -translate-x-1/2 z-20'>
              <img
                src={CAKE_IMG}
                alt='Fresh Cake'
                className='w-40 h-auto object-cover rounded-lg drop-shadow-xl'
                style={{
                  filter: 'brightness(1.1) contrast(1.05)',
                }}
              />
            </div>

            {/* Table */}
            <div className='relative z-10'>
              <img
                src={TABLE_IMG}
                alt='table'
                className='w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]'
                style={{
                  filter: 'brightness(1.2) sepia(0.2)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Low lying fog over the floor (Optional warm fog) */}
        <div className='relative w-full h-[30%]' style={{ top: '70%' }}>
          {/* Removing black fog, maybe subtle pinkish? */}
          <div className='absolute inset-0 bg-linear-to-t from-pink-900/10 to-transparent pointer-events-none z-15'></div>
        </div>
      </div>

      {/* --- CHARACTER --- */}
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

      {/* Navigation Button */}
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
            Continue{' '}
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
