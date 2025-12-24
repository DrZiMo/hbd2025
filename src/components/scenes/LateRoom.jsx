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

// 2. Tattered Curtain
const TatteredCurtain = ({ side }) => {
  const isLeft = side === 'left'
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isLeft ? [0, 2, 0] : [0, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute -top-2.5 ${isLeft ? '-left-8' : '-right-8'
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

const LateRoom = () => {
  const { setCurrentScene } = useStory()
  const [showCharacter, setShowCharacter] = useState(false)
  const [dialogueStep, setDialogueStep] = useState(0)

  // Sequence Logic
  useEffect(() => {
    const entryTimer = setTimeout(() => setShowCharacter(true), 1500)
    return () => clearTimeout(entryTimer)
  }, [])

  useEffect(() => {
    if (showCharacter) {
      const booTimer = setTimeout(() => setDialogueStep(1), 400)
      const realizationTimer = setTimeout(() => setDialogueStep(2), 3000)
      return () => {
        clearTimeout(booTimer)
        clearTimeout(realizationTimer)
      }
    }
  }, [showCharacter])

  const handleNext = () => setCurrentScene(SCENES.TIME_THEORY)

  return (
    <div className='relative h-full w-full overflow-hidden bg-[#0d0d12] font-sans perspective-[1000px]'>
      {/* --- SCENE ATMOSPHERE --- */}

      {/* 1. Dark Vignette Overlay */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(30,30,40,0.1)_0%,rgba(0,0,0,0.95)_100%)] z-40 pointer-events-none'></div>

      {/* 2. Moonlight Beam (behind the window) */}
      <div className='absolute top-[-10%] right-[5%] w-100 h-[150%] bg-blue-100/5 rotate-25 blur-3xl transform origin-top pointer-events-none z-10'></div>

      {/* --- BACKGROUND ELEMENTS (THE WALL) --- */}

      {/* Spider Webs */}
      <img
        src={SPIDERWEB_1_IMG}
        alt='spider web 1'
        className='absolute scale-100 opacity-60 z-10'
      />
      <img
        src={SPIDERWEB_2_IMG}
        alt='spider web 2'
        className='absolute -right-60 -top-20 scale-50 rotate-90 opacity-30 z-100'
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
        <div className='absolute top-3 left-3 w-21 h-31.5 bg-blue-900/20 backdrop-blur-[1px] border-r border-b border-white/10'></div>
        <div className='absolute bottom-3 right-3 w-21 h-31.5 bg-blue-900/20 backdrop-blur-[1px] border-l border-t border-white/10'></div>
        <div className='absolute top-3 right-3 w-21 h-31.5 z-10'>
          <div
            className='absolute top-0 right-0 w-full h-full bg-blue-800/20 backdrop-blur-[2px] border-l border-white/20'
            style={{ clipPath: 'polygon(100% 0, 100% 60%, 60% 0)' }}
          ></div>
          <div
            className='absolute top-0 left-0 w-full h-full bg-blue-800/10 backdrop-blur-[1px]'
            style={{ clipPath: 'polygon(0 0, 40% 0, 0 30%)' }}
          ></div>
        </div>
        <div className='absolute bottom-3 left-3 w-21 h-31.5 z-10'>
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

      {/* --- THE FLOOR --- */}
      {/* This is the new "Real" Floor. 
          We use 3D CSS perspective to tilt a gradient plane.
      */}
      <div className='absolute bottom-0 left-0 right-0 h-[25%] z-0'>
        {/* Baseboard (skirting board) connecting wall and floor */}
        <div className='absolute top-0 w-full h-4 bg-[#1a1410] border-t border-[#332a24] shadow-lg z-20'></div>

        {/* The Floor Plane */}
        <div
          className='absolute top-0 left-[-50%] w-[200%] h-[200%] bg-[#0f0d0b] origin-top'
          style={{
            // This tilts the floor to give depth
            transform: 'perspective(100vh) rotateX(60deg)',
            // Wood texture created via gradients
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
            backgroundSize: '100% 40px', // plank height
            boxShadow: 'inset 0 100px 100px -50px rgba(0,0,0,0.9)', // Shadow near the wall
          }}
        >
          {/* Moonlight Reflection on the Floor */}
          {/* This blue blur sits ON the tilted floor, aligning with the window */}
          <div className='absolute top-[10%] right-[30%] w-75 h-100 bg-blue-200/5 blur-[50px] rounded-full transform rotate-12'></div>
        </div>

        {/* Low lying fog over the floor */}
        <div className='absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-black/60 to-transparent pointer-events-none z-10'></div>
      </div>

      {/* --- INTERACTIVE PROPS --- */}
      {/* These are positioned z-20 so they stand ON TOP of the floor visually.
       */}

      {/* The Skeleton in the Corner */}
      <div className='absolute bottom-24 left-10 w-32 opacity-70 contrast-125 z-20'>
        <div className='relative flex flex-col items-center'>
          <div className='relative'>
            <img
              src={BIRTHDAY_HAT_IMG}
              alt='hat'
              className='w-full scale-40 grayscale-50 absolute -top-21.25 left-0.5 z-2'
            />
            <img
              src={SKELETON_IMG}
              alt='Skeleton'
              className='w-full scale-140 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]'
            />
          </div>
        </div>
      </div>

      {/* The Center Table with Rotten Cake */}
      <div className='absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-20'>
        <div className='relative -mb-2.5'>
          <div className='relative -top-18'>
            <div className='absolute -top-10 left-10'>
              <Fly delay={0} />
            </div>
            <div className='absolute -top-5 right-5'>
              <Fly delay={0.5} />
            </div>
            <div className='absolute -top-12 left-1/2'>
              <Fly delay={1.2} />
            </div>
            <div className='absolute top-0 right-10'>
              <Fly delay={0.8} />
            </div>
          </div>

          <div className='relative -top-14'>
            <div className='flex flex-col justify-center items-center relative '>
              <img
                src={CAKE_IMG}
                alt='Rotten Cake'
                className='w-40 h-auto object-cover rounded-lg mask-image-gradient absolute -top-22.5 z-6'
                style={{
                  filter:
                    'grayscale(60%) sepia(80%) hue-rotate(50deg) contrast(120%) brightness(0.6)',
                  maskImage:
                    'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              />
            </div>
            <div className='w-80'>
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
      </div>

      {/* --- CHARACTER & UI --- */}

      <AnimatePresence>
        {false && (
          <motion.div
            initial={{ x: 300, y: 0, opacity: 0, rotate: 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            className='absolute bottom-20 right-24 z-30'
          >
            {/* Character code preserved but hidden */}
            {/* ... */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Button */}
      <AnimatePresence>
        {dialogueStep === 2 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className='absolute bottom-10 right-10 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 hover:border-white/40 transition-all z-50 flex items-center gap-2 group'
          >
            Explain Theory{' '}
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
