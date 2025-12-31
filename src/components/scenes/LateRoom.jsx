import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Images
import CAKE_IMG from '/cake.png'
import TABLE_IMG from '/table.png'
import SKELETON_IMG from '/skeleton.png'
import BIRTHDAY_HAT_IMG from '/birthday hat.png'
import SPIDERWEB_1_IMG from '/spider web1.png'
import SPIDERWEB_2_IMG from '/spider web2.png'

// Character Images
import SAYING_BOO_IMG from '/stickers/saying_boo-removebg-preview.png'
import HANDS_IN_POCKET_IMG from '/stickers/hands_in_pocket-removebg-preview.png'
import HANDS_DOWN_IMG from '/stickers/hands_down-removebg-preview.png'
import LOOKING_SIDE_IMG from '/stickers/looking_side-removebg-preview.png'
import WORRYING_IMG from '/stickers/worrying-removebg-preview.png'
import TOUCHING_HEAD_IMG from '/stickers/touching_head-removebg-preview.png'

// --- SUB-COMPONENTS ---

// 1. The Buzzing Fly
const Fly = ({ delay = 0 }) => (
  <motion.div
    className='absolute h-1 w-1 bg-black rounded-full pointer-events-none z-20'
    animate={{
      x: [0, 10, -10, 5, -5, 0],
      y: [0, -15, 5, -10, 0],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'linear',
      delay: delay,
    }}
  />
)

// 2. Dust Mote
const DustMote = ({ x, y, duration, delay }) => {
  return (
    <motion.div
      className='absolute w-1 h-1 bg-white/20 rounded-full blur-[1px] pointer-events-none'
      initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
      animate={{
        y: [`${y}%`, `${y - 10}%`],
        x: [`${x}%`, `${x + 5}%`],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
    />
  )
}

// 3. Tattered Curtain
const TatteredCurtain = ({ side }) => {
  const isLeft = side === 'left'
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isLeft ? [0, 2, 0] : [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-[-10px] ${
        isLeft ? '-left-8' : '-right-8'
      } w-24 h-[120%] z-20 pointer-events-none`}
    >
      <div
        className='w-full h-full bg-stone-900 opacity-90 shadow-2xl'
        style={{
          clipPath: isLeft
            ? 'polygon(0 0, 100% 0, 80% 100%, 60% 85%, 40% 95%, 20% 80%, 0 100%)'
            : 'polygon(0 0, 100% 0, 100% 100%, 80% 80%, 60% 95%, 40% 85%, 20% 100%)',
          background: 'linear-gradient(to bottom, #1c1917 0%, #292524 100%)',
        }}
      />
      <div className='absolute inset-0 bg-black/40 mix-blend-overlay'></div>
    </motion.div>
  )
}

// Sequence Data
const SEQUENCE = [
  {
    id: 'boo',
    img: SAYING_BOO_IMG,
    text: 'boo!',
    duration: 3000,
  },
  {
    id: 'scared',
    img: HANDS_IN_POCKET_IMG,
    text: 'haha! are you scared?',
    duration: 3000,
  },
  {
    id: 'happy',
    img: HANDS_DOWN_IMG,
    text: 'anyway, HAPPY BI-',
    duration: 2500,
  },
  {
    id: 'late',
    img: LOOKING_SIDE_IMG,
    text: 'Oh oh! i think am so late',
    duration: 3000,
  },
  {
    id: 'very_late',
    img: WORRYING_IMG,
    text: 'am 6 months late !',
    duration: 3000,
  },
  {
    id: 'idea',
    img: TOUCHING_HEAD_IMG,
    text: 'but i got an idea!',
    duration: 2500,
  },
  {
    id: 'click',
    img: HANDS_IN_POCKET_IMG,
    text: 'click the explore idea button and see what it is',
    duration: null, // Stays until clicked
  },
]

const LateRoom = () => {
  const { setCurrentScene } = useStory()
  const [stepIndex, setStepIndex] = useState(-1) // -1 means hidden initially
  const [motes, setMotes] = useState([])

  useEffect(() => {
    setMotes(
      [...Array(20)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 10,
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

  const handleNext = () => setCurrentScene(SCENES.TIME_THEORY)

  const currentData = stepIndex >= 0 ? SEQUENCE[stepIndex] : null

  return (
    <div className='relative h-full w-full overflow-hidden bg-[#0d0d12] font-sans perspective-[1000px]'>
      {/* --- SCENE ATMOSPHERE --- */}

      {/* 1. Dark Vignette Overlay */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(30,30,40,0.1)_0%,rgba(0,0,0,0.95)_100%)] z-40 pointer-events-none'></div>

      {/* 2. Moonlight Beam (behind the window) */}
      <div className='absolute top-[-10%] right-[5%] w-[400px] h-[150%] bg-blue-100/5 rotate-25 blur-3xl transform origin-top pointer-events-none z-10'></div>

      {/* 3. Dust Layer (Particles floating in the air) */}
      <div className='absolute inset-0 z-30 pointer-events-none'>
        {motes.map((mote, i) => (
          <DustMote key={i} {...mote} />
        ))}
      </div>

      {/* --- BACKGROUND ELEMENTS (THE WALL) --- */}

      {/* Spider Webs */}
      <img
        src={SPIDERWEB_1_IMG}
        alt='spider web 1'
        className='absolute scale-100 opacity-30 z-100 md:z-10'
      />
      <img
        src={SPIDERWEB_2_IMG}
        alt='spider web 2'
        className='absolute -right-30 md:-right-60 -top-20 scale-50 rotate-90 opacity-30 z-100'
      />

      {/* The Broken Window */}
      <div className='absolute top-12 right-24 w-48 h-72 z-10'>
        {/* The View Outside (Moon & Stars) */}
        <div className='absolute inset-2 bg-[#050510] overflow-hidden rounded-sm'>
          <div className='absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 blur-sm opacity-80 shadow-[0_0_20px_rgba(200,230,255,0.5)]'></div>
          <div className='absolute top-10 left-4 w-1 h-1 bg-white rounded-full opacity-60'></div>
          <div className='absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full opacity-40'></div>
        </div>

        {/* The Wood Frame */}
        <div className='absolute inset-0 border-12 border-[#2c241b] rounded-sm shadow-[inset_0_0_20px_black] bg-transparent z-10'>
          <div className='absolute inset-0 border border-[#3e3226] opacity-50 pointer-events-none'></div>
        </div>

        {/* Window Cross-Bars */}
        <div className='absolute top-1/2 left-0 w-full h-3 bg-[#2c241b] shadow-lg z-10'></div>
        <div className='absolute top-0 left-1/2 w-3 h-full bg-[#2c241b] shadow-lg z-10'></div>

        {/* Broken Glass */}
        <div className='absolute top-3 left-3 w-[84px] h-[126px] bg-blue-900/20 backdrop-blur-[1px] border-r border-b border-white/10'></div>
        <div className='absolute bottom-3 right-3 w-[84px] h-[126px] bg-blue-900/20 backdrop-blur-[1px] border-l border-t border-white/10'></div>
        <div className='absolute top-3 right-3 w-[84px] h-[126px] z-10'>
          <div
            className='absolute top-0 right-0 w-full h-full bg-blue-800/20 backdrop-blur-[2px] border-l border-white/20'
            style={{ clipPath: 'polygon(100% 0, 100% 60%, 60% 0)' }}
          ></div>
          <div
            className='absolute top-0 left-0 w-full h-full bg-blue-800/10 backdrop-blur-[1px]'
            style={{ clipPath: 'polygon(0 0, 40% 0, 0 30%)' }}
          ></div>
        </div>
        <div className='absolute bottom-3 left-3 w-[84px] h-[126px] z-10'>
          <div
            className='absolute bottom-0 left-0 w-full h-full bg-blue-800/15 backdrop-blur-[1px] border-r border-white/20'
            style={{ clipPath: 'polygon(0 100%, 70% 100%, 0 40%)' }}
          ></div>
        </div>

        {/* Curtains & Sill */}
        <TatteredCurtain side='left' />
        <TatteredCurtain side='right' />
        <div className='absolute -bottom-4 -left-4 w-[120%] h-6 bg-[#1f1a14] shadow-2xl rounded-sm z-30'></div>
      </div>

      {/* --- MAIN CONTENT CONTAINER (Relative Positioning) --- */}
      <div className='relative h-full w-full'>
        {/* The Skeleton in Left Corner, centered vertically */}
        <div className='absolute top-[68%] -left-10 md:left-5 w-32 opacity-70 contrast-125 z-1 transform -translate-y-1/2'>
          <div className='relative flex flex-col items-center'>
            <div className='relative'>
              <img
                src={BIRTHDAY_HAT_IMG}
                alt='hat'
                className='w-full scale-40 grayscale-50 absolute top-[-85px] left-[2px] z-4'
              />
              <img
                src={SKELETON_IMG}
                alt='Skeleton'
                className='w-full z-1 scale-140 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]'
              />
            </div>
          </div>
        </div>

        {/* FLOOR - Relative positioned at bottom */}
        <div className='relative w-full h-[30%] mt-auto' style={{ top: '70%' }}>
          {/* Floor Plane */}
          <div
            className='relative w-full h-[200%] bg-[#0f0d0b] origin-top'
            style={{
              transform: 'perspective(100vh) rotateX(60deg)',
              backgroundImage: `
                repeating-linear-gradient(
                    0deg, 
                    transparent 0px, 
                    transparent 38px, 
                    rgba(0,0,0,0.8) 39px, 
                    rgba(0,0,0,0.8) 40px
                ),
                repeating-linear-gradient(
                    90deg, 
                    transparent 0px, 
                    transparent 198px, 
                    rgba(0,0,0,0.4) 199px, 
                    rgba(0,0,0,0.4) 200px
                )
              `,
              backgroundSize: '100% 40px',
              boxShadow: 'inset 0 100px 100px -50px rgba(0,0,0,0.9)',
            }}
          >
            {/* Moonlight Reflection on the Floor */}
            <div className='absolute top-[10%] right-[30%] w-[300px] h-[400px] bg-blue-200/5 blur-[50px] rounded-full transform rotate-12'></div>
          </div>
        </div>

        {/* TABLE & CAKE - Relative positioned near center */}
        <div
          className='relative w-full z-15 top-[-80%]'
          style={{ top: '45%', transform: 'translateY(-50%)' }}
        >
          <div className='relative mx-auto w-80'>
            {/* Flies around the cake */}
            <div className='absolute -top-10 left-10 z-30'>
              <Fly delay={0} />
            </div>
            <div className='absolute -top-5 right-5 z-30'>
              <Fly delay={0.5} />
            </div>
            <div className='absolute -top-12 left-1/2 z-30'>
              <Fly delay={1.2} />
            </div>
            <div className='absolute top-0 right-10 z-30'>
              <Fly delay={0.8} />
            </div>

            {/* Cake positioned above the table */}
            <div className='absolute -top-24 left-1/2 transform -translate-x-1/2 z-20'>
              <img
                src={CAKE_IMG}
                alt='Rotten Cake'
                className='w-40 h-auto object-cover rounded-lg mask-image-gradient'
                style={{
                  filter:
                    'grayscale(60%) sepia(80%) hue-rotate(50deg) contrast(120%) brightness(0.6)',
                  maskImage:
                    'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              />
            </div>

            {/* Table */}
            <div className='relative z-10'>
              <img
                src={TABLE_IMG}
                alt='table'
                className='w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]'
                style={{
                  filter: 'contrast(120%) brightness(0.3) grayscale(60%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Low lying fog over the floor */}
        <div className='relative w-full h-[30%]' style={{ top: '70%' }}>
          <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none z-15'></div>
        </div>
      </div>

      {/* --- CHARACTER & UI --- */}

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
            Explore Idea{' '}
            <span className='group-hover:translate-x-1 transition-transform'>
              →
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LateRoom
