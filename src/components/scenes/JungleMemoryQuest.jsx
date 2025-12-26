import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

// --- CONSTANTS ---
const MEMORIES = [
  'Remember when we stayed up all night just talking? That was the moment I knew you were my best friend.',
  'That time you shared your lunch when I forgot mine... smallest gesture, biggest heart.',
  'Watching you grow from a little kid into this amazing person has been my greatest privilege.',
]

const FINAL_MESSAGE = {
  title: 'To My Dearest Sister',
  body: 'These memories are just small seeds. You have planted a garden of happiness in my life just by being you. Thank you for growing alongside me.',
}

// --- SUB-COMPONENTS ---

// Organic Leaf with hover effects
const OrganicLeaf = ({ x, y, rotation, scale, color, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale,
      rotate: rotation,
      y: [0, -3, 0],
    }}
    transition={{
      opacity: { duration: 0.8 },
      scale: { type: 'spring', stiffness: 100 },
      rotate: { duration: 0.5 },
      y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    }}
    exit={{
      opacity: 0,
      scale: 0,
      rotate: rotation + 120,
      transition: { duration: 0.5 },
      pointerEvents: 'none',
    }}
    whileHover={{
      scale: scale * 1.2,
      rotate: rotation + 10,
      transition: { type: 'spring', stiffness: 300 },
    }}
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
    className='absolute z-30 cursor-pointer drop-shadow-2xl'
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <svg
      width='100'
      height='100'
      viewBox='0 0 100 100'
      className={`fill-current ${color} opacity-90`}
    >
      <path
        d='M50 100 C 20 100 0 50 50 0 C 100 50 80 100 50 100'
        className='drop-shadow-lg'
      />
      <path
        d='M50 100 L 50 20'
        stroke='rgba(255,255,255,0.2)'
        strokeWidth='2'
        fill='none'
        className='drop-shadow-sm'
      />
      {/* Leaf veins */}
      <path
        d='M50 20 L 30 40'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M50 20 L 40 60'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M50 20 L 60 60'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M50 20 L 70 40'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth='1.5'
        fill='none'
      />
    </svg>
  </motion.div>
)

// Seed with glow effect
const Seed = ({ x, y, onClick }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{
      scale: 1,
      y: [0, -5, 0],
    }}
    transition={{
      scale: { type: 'spring', stiffness: 150 },
      y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    }}
    whileHover={{ scale: 1.3, rotate: 180 }}
    onClick={(e) => {
      e.stopPropagation()
      onClick()
    }}
    className='absolute z-20 w-16 h-16 cursor-pointer flex items-center justify-center'
    style={{
      left: `${x}%`,
      top: `${y}%`,
      marginLeft: '25px',
      marginTop: '25px',
    }}
  >
    {/* Outer glow */}
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className='absolute w-12 h-12 bg-amber-400 rounded-full blur-lg'
    />
    {/* Inner glow */}
    <div className='absolute w-8 h-8 bg-amber-300 rounded-full blur-md animate-pulse' />
    {/* Seed core */}
    <div className='relative w-5 h-5 bg-gradient-to-br from-amber-100 to-amber-300 rounded-full shadow-inner border border-amber-100/50' />
  </motion.div>
)

// Flower with improved animation
const Flower = ({ index, onClick }) => {
  const colors = [
    'from-pink-400 to-rose-600',
    'from-purple-400 to-indigo-600',
    'from-blue-400 to-cyan-600',
  ]
  const petalColor = colors[index % colors.length]

  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: [0, -3, 0],
      }}
      transition={{
        scale: { type: 'spring', stiffness: 100, damping: 15 },
        rotate: { duration: 1 },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.15 }}
      className='absolute cursor-pointer'
      style={{
        transform: `rotate(${index * 120}deg) translateY(-90px) rotate(-${
          index * 120
        }deg)`,
        zIndex: 40,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {/* Flower glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className='absolute inset-0 bg-white/30 blur-xl rounded-full -z-20 scale-150'
      />

      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='relative flex items-center justify-center'
      >
        {/* Flower center */}
        <div className='w-6 h-6 bg-gradient-to-t from-yellow-600 to-yellow-200 rounded-full shadow-[0_0_20px_rgba(253,224,71,0.9)] z-20' />

        {/* Petals */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.1,
              type: 'spring',
              stiffness: 150,
            }}
            whileHover={{ scale: 1.1 }}
            className={`absolute w-8 h-14 bg-gradient-to-b ${petalColor} opacity-95`}
            style={{
              borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
              transform: `rotate(${i * 60}deg) translateY(-25px)`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        ))}

        {/* Floating pollen particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`pollen-${i}`}
            animate={{
              y: [-10, -25],
              opacity: [0, 1, 0],
              x: [0, (i - 1.5) * 8],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className='absolute w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[1px] z-30'
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// --- MAIN COMPONENT ---
const JungleMemoryQuest = () => {
  const { setCurrentScene } = useStory()

  const [leaves, setLeaves] = useState([])
  const [seeds, setSeeds] = useState([])
  const [inventory, setInventory] = useState(null)
  const [plantedCount, setPlantedCount] = useState(0)
  const [bloomedFlowers, setBloomedFlowers] = useState([])
  const [activeMemory, setActiveMemory] = useState(null)
  const [storedMemories, setStoredMemories] = useState([])
  const [showHowToPlay, setShowHowToPlay] = useState(true)
  const [showFinalHeart, setShowFinalHeart] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  // Initialize leaves and seeds
  useEffect(() => {
    const generateSafePosition = () => {
      let x, y, dist
      do {
        x = Math.random() * 80 + 10
        y = Math.random() * 80 + 10
        dist = Math.hypot(x - 50, y - 50)
      } while (dist < 25) // Slightly larger exclusion zone
      return { x, y }
    }

    const newLeaves = Array.from({ length: 20 }, (_, i) => {
      // Increased to 20 leaves
      const pos = generateSafePosition()
      return {
        id: i,
        x: pos.x,
        y: pos.y,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.7, // Adjusted scale range
        color:
          Math.random() > 0.6
            ? 'text-emerald-700'
            : Math.random() > 0.3
            ? 'text-teal-800'
            : 'text-green-900',
      }
    })

    setLeaves(newLeaves)

    // Randomly select 3 positions for seeds
    const selected = [...newLeaves]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((leaf, i) => ({
        id: i,
        x: leaf.x,
        y: leaf.y,
        collected: false,
      }))

    setSeeds(selected)
  }, [])

  // Handle leaf click (from Code B)
  const handleLeafClick = (id) => {
    setLeaves((prev) => prev.filter((leaf) => leaf.id !== id))
  }

  // Handle seed click (from Code A)
  const handleSeedClick = (id) => {
    if (inventory !== null) return
    setSeeds((prev) =>
      prev.map((seed) => (seed.id === id ? { ...seed, collected: true } : seed))
    )
    setInventory(id)
  }

  // Handle soil click (from Code A)
  const handleSoilClick = () => {
    if (inventory === null) return
    setBloomedFlowers((prev) => [...prev, inventory])
    setInventory(null)
    setPlantedCount((prev) => prev + 1)
  }

  // Handle flower click (from Code A)
  const handleFlowerClick = (index) => {
    if (!activeMemory) {
      setActiveMemory(MEMORIES[index])
    }
  }

  // Store memory (from Code A with improved logic)
  const storeMemory = () => {
    setStoredMemories((prev) => [...prev, activeMemory])
    setActiveMemory(null)

    if (storedMemories.length + 1 >= 3) {
      setTimeout(() => setShowFinalHeart(true), 1000)
    }
  }

  // Close memory modal
  const closeMemory = () => {
    setActiveMemory(null)
  }

  return (
    <div className='relative h-screen bg-[#0a120a] overflow-hidden font-serif'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #4ade80 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* HOW TO PLAY (from Code A) */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4'
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className='bg-[#051105]/90 backdrop-blur-xl p-8 rounded-2xl max-w-md text-center border border-emerald-800/50'
            >
              <h2 className='text-2xl text-emerald-200 mb-4'>🌿 How to Play</h2>
              <div className='space-y-4 text-emerald-100 mb-6'>
                <p>
                  1. <span className='text-amber-300'>Find glowing seeds</span>{' '}
                  hidden among the leaves
                </p>
                <p>
                  2. <span className='text-emerald-300'>Plant them</span> in the
                  center soil
                </p>
                <p>
                  3. <span className='text-pink-300'>Tap each flower</span> to
                  unlock a memory
                </p>
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className='px-8 py-3 bg-emerald-700/50 hover:bg-emerald-600/50 border border-emerald-500 rounded-full text-emerald-300 transition-all hover:scale-105 active:scale-95'
              >
                Begin Journey
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className='absolute top-8 w-full text-center z-40'>
        <h2 className='text-emerald-200/70 tracking-[0.3em] text-sm uppercase'>
          {plantedCount < 3
            ? `Seeds Planted: ${plantedCount}/3`
            : '🌺 Garden Complete! 🌺'}
        </h2>
      </div>

      {/* LEAVES (with exit animation) */}
      <AnimatePresence>
        {leaves.map((leaf) => (
          <OrganicLeaf
            key={leaf.id}
            {...leaf}
            onClick={() => handleLeafClick(leaf.id)}
          />
        ))}
      </AnimatePresence>

      {/* SEEDS */}
      {seeds.map(
        (seed) =>
          !seed.collected && (
            <Seed
              key={seed.id}
              {...seed}
              onClick={() => handleSeedClick(seed.id)}
            />
          )
      )}

      {/* CENTER SOIL */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              'inset 0 0 20px rgba(0,0,0,0.5)',
              'inset 0 0 30px rgba(74, 222, 128, 0.1)',
              'inset 0 0 20px rgba(0,0,0,0.5)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          onClick={handleSoilClick}
          className={`w-72 h-72 rounded-full flex items-center justify-center cursor-pointer ${
            inventory !== null
              ? 'bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 border-2 border-emerald-500/50'
              : 'bg-black/40 border border-white/10'
          }`}
        >
          {/* Soil texture */}
          <div className='absolute inset-0 rounded-full overflow-hidden'>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className='absolute w-4 h-4 bg-black/20 rounded-full'
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {bloomedFlowers.map((seedId, index) => (
            <Flower
              key={seedId}
              index={index}
              onClick={() => handleFlowerClick(index)}
            />
          ))}

          {/* Planting hint */}
          {inventory !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute -bottom-20 text-center'
            >
              <p className='text-emerald-300 text-sm'>
                Click here to plant the seed
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* MEMORY MODAL */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'
            onClick={closeMemory}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-[#051105] p-10 rounded-2xl max-w-xl text-center border border-emerald-800/50 shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='text-4xl mb-4'>💭</div>
              <p className='text-emerald-100 text-xl leading-relaxed mb-8'>
                {activeMemory}
              </p>
              <button
                onClick={storeMemory}
                className='px-8 py-3 bg-emerald-800/50 hover:bg-emerald-700/50 border border-emerald-500 rounded-full text-emerald-300 transition-all hover:scale-105 active:scale-95'
              >
                💖 Store Memory
              </button>
              <p className='text-emerald-400/50 text-xs mt-4'>
                Click anywhere else to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL HEART */}
      <AnimatePresence>
        {showFinalHeart && !showFinalMessage && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className='fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer'
            onClick={() => setShowFinalMessage(true)}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2 },
                rotate: { repeat: Infinity, duration: 3 },
              }}
              className='text-9xl text-rose-500'
            >
              ❤️
            </motion.div>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='absolute bottom-20 text-rose-200 text-lg'
            >
              Click to continue
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL MESSAGE */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-gradient-to-br from-[#1a0505] to-[#051105] flex items-center justify-center z-50 text-center p-8'
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='max-w-2xl'
            >
              <h1 className='text-5xl md:text-6xl text-rose-100 mb-8 font-bold'>
                {FINAL_MESSAGE.title}
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className='text-rose-200 text-lg leading-relaxed mb-12'
              >
                {FINAL_MESSAGE.body}
              </motion.div>
              <button
                onClick={() => setCurrentScene(SCENES.PYRAMID_OF_EMOTIONS)}
                className='px-10 py-4 bg-rose-800/30 hover:bg-rose-700/40 border border-rose-500/50 rounded-full text-rose-300 text-lg transition-all hover:scale-105 active:scale-95 shadow-xl'
              >
                🌷 Keep These Memories Safe
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default JungleMemoryQuest
