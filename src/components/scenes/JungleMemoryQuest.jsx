import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// Assets
import leafTexture from '../../assets/jungle_leaf.png'
import seedTexture from '../../assets/magic_seed.png'
import flowerTexture from '../../assets/tropical_flower.png'
import soilTexture from '../../assets/soil_mound.png'
import heartTexture from '../../assets/glowing_heart.png'

const MEMORIES = [
  'Remember when we stayed up all night just talking? That was the moment I knew you were my best friend.',
  'That time you shared your lunch when I forgot mine... smallest gesture, biggest heart.',
  'Watching you grow from a little kid into this amazing person has been my greatest privilege.',
]

const JungleMemoryQuest = () => {
  const { setCurrentScene } = useStory()

  // Game State
  const [seeds, setSeeds] = useState([
    { id: 1, x: 20, y: 70, collected: false, planted: false, revealed: false },
    { id: 2, x: 80, y: 60, collected: false, planted: false, revealed: false },
    { id: 3, x: 50, y: 85, collected: false, planted: false, revealed: false },
  ])

  // Leaves cover the seeds initially
  const [leaves, setLeaves] = useState([
    { id: 1, x: 20, y: 70, rotation: 45, scale: 1.2 },
    { id: 2, x: 80, y: 60, rotation: -30, scale: 1.1 },
    { id: 3, x: 50, y: 85, rotation: 10, scale: 1.3 },
  ])

  const [holdingSeed, setHoldingSeed] = useState(false)
  const [activeMemory, setActiveMemory] = useState(null)
  const [completedMemories, setCompletedMemories] = useState(0)

  // Mouse position for custom cursor
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleLeafClick = (id) => {
    // Remove the leaf to reveal the seed
    setLeaves((prev) => prev.filter((l) => l.id !== id))
    setSeeds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, revealed: true } : s))
    )
  }

  const handleCollectSeed = (id) => {
    if (holdingSeed) return
    setSeeds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, collected: true } : s))
    )
    setHoldingSeed(true)
  }

  const handlePlant = () => {
    if (!holdingSeed) return

    // Find the first collected but not planted seed to plant
    const seedToPlant = seeds.find((s) => s.collected && !s.planted)

    if (seedToPlant) {
      setSeeds((prev) =>
        prev.map((s) => (s.id === seedToPlant.id ? { ...s, planted: true } : s))
      )
      setHoldingSeed(false)
    }
  }

  const handleReadMemory = (index) => {
    setActiveMemory(MEMORIES[index])
    if (completedMemories <= index) {
      setCompletedMemories(index + 1)
    }
  }

  const closeMemory = () => {
    setActiveMemory(null)
    if (completedMemories === 3) {
      setTimeout(() => setCurrentScene(SCENES.PYRAMID_OF_EMOTIONS), 5000)
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden bg-[#0a1f0a] cursor-none'>
      {/* Custom Cursor */}
      <motion.div
        className='fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference'
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <div className='w-full h-full rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm' />
      </motion.div>

      {/* Cursor Item (Seed) when holding */}
      <AnimatePresence>
        {holdingSeed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: mousePos.x + 20,
              y: mousePos.y + 20,
            }}
            exit={{ scale: 0, opacity: 0 }}
            className='fixed z-[99] pointer-events-none'
          >
            <img
              src={seedTexture}
              alt='Holding seed'
              className='w-12 h-12 drop-shadow-lg object-contain'
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background */}
      <div
        className='absolute inset-0 opacity-60 bg-cover bg-center transition-transform hover:scale-105 duration-[30s]'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564357640203-8d6d6783d810?q=80&w=1974&auto=format&fit=crop')`,
        }}
      ></div>
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none' />

      {/* Instructions */}
      <div className='absolute top-10 w-full flex justify-center z-10 pointer-events-none'>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-emerald-500/30'
        >
          <h2 className='text-xl md:text-2xl font-light text-green-50 tracking-wider font-serif'>
            {completedMemories < 3
              ? 'Find the hidden seeds, plant them, and listen to the forest.'
              : 'The Jungle Heart beats for you.'}
          </h2>
        </motion.div>
      </div>

      {/* Central Planting Mound */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center z-10'>
        {/* The Soil */}
        <div
          onClick={handlePlant}
          className={`relative w-full h-full transition-all duration-500 ${
            holdingSeed
              ? 'cursor-pointer scale-105 brightness-110 drop-shadow-[0_0_30px_rgba(255,255,100,0.3)]'
              : ''
          }`}
        >
          <img
            src={soilTexture}
            alt='Soil Mound'
            className='w-full h-full object-contain rounded-full opacity-90 hover:opacity-100 transition-opacity'
          />

          {/* Glow effect when holding seed */}
          {holdingSeed && (
            <div className='absolute inset-0 rounded-full border-4 border-yellow-200/30 animate-pulse pointer-events-none' />
          )}
        </div>

        {/* Planted Flowers */}
        {seeds
          .filter((s) => s.planted)
          .map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className='absolute z-20 origin-bottom'
              style={{
                transform: `rotate(${
                  idx * 120
                }deg) translate(0, -60px) rotate(-${idx * 120}deg)`, // Position in circle around center
                left: '50%',
                top: '50%',
                marginLeft: '-40px', // half of width
                marginTop: '-40px',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className='w-20 h-20 cursor-pointer drop-shadow-2xl'
                onClick={() => handleReadMemory(idx)}
              >
                <img
                  src={flowerTexture}
                  alt='Tropical Flower'
                  className='w-full h-full object-contain animate-spin-slow-reverse'
                />
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                  <span className='text-2xl animate-bounce'>✨</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
      </div>

      {/* Game Area - Leaves and Seeds */}
      {/* We map over original positions. Leaves are on top of seeds. */}
      {/* 1. Leaves */}
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={`leaf-${leaf.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: leaf.scale, rotate: leaf.rotation }}
            exit={{
              opacity: 0,
              scale: 0,
              rotate: leaf.rotation + 90,
              x: 50,
              y: 50,
            }}
            whileHover={{ scale: leaf.scale * 1.1, rotate: leaf.rotation + 5 }}
            className='absolute z-30 cursor-pointer drop-shadow-xl'
            style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
            onClick={() => handleLeafClick(leaf.id)}
          >
            <img
              src={leafTexture}
              alt='Jungle Leaf'
              className='w-32 h-32 md:w-40 md:h-40 object-contain filter brightness-110'
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 2. Seeds (Underneath leaves, revealed when leaf is gone) */}
      {seeds.map(
        (s) =>
          !s.collected &&
          s.revealed && (
            <motion.div
              key={s.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2, y: -5 }}
              className='absolute z-20 cursor-pointer'
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                marginLeft: '30px',
                marginTop: '30px',
              }} // Offset slightly to be under center of leaf area
              onClick={() => handleCollectSeed(s.id)}
            >
              <div className='relative'>
                <div className='absolute inset-0 bg-yellow-400/30 blur-xl animate-pulse rounded-full'></div>
                <img
                  src={seedTexture}
                  alt='Magic Seed'
                  className='w-16 h-16 object-contain relative z-10'
                />
              </div>
            </motion.div>
          )
      )}

      {/* Ambient Fireflies */}
      <div className='absolute inset-0 pointer-events-none z-10'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-1 w-1 bg-yellow-400 rounded-full blur-[1px]'
            animate={{
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-default'
            onClick={closeMemory}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='bg-emerald-900/90 text-emerald-50 p-10 rounded-3xl max-w-2xl text-center shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-emerald-500/30 relative overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements */}
              <div className='absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2'></div>
              <div className='absolute bottom-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2'></div>

              <h3 className='text-3xl font-serif text-emerald-300 mb-8 tracking-wide'>
                A Memory Blooms...
              </h3>
              <p className='font-serif text-xl md:text-2xl leading-relaxed italic text-emerald-100'>
                "{activeMemory}"
              </p>
              <button
                onClick={closeMemory}
                className='mt-10 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full hover:from-emerald-500 hover:to-green-500 transition-all transform hover:scale-105 shadow-lg'
              >
                Cherish & Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Heart Reward */}
      <AnimatePresence>
        {completedMemories === 3 && !activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none'
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
              className='relative'
            >
              <div className='absolute inset-0 bg-red-500/20 blur-[100px] animate-pulse'></div>
              <img
                src={heartTexture}
                alt='Quest Complete Heart'
                className='w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(255,50,50,0.6)] animate-pulse-slow'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className='mt-8 text-center'
            >
              <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-red-300 to-red-500 bg-clip-text text-transparent drop-shadow-sm font-serif'>
                Love Grows
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default JungleMemoryQuest
