import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const MEMORIES = [
  'Remember when we stayed up all night just talking? That was the moment I knew you were my best friend.',
  'That time you shared your lunch when I forgot mine... smallest gesture, biggest heart.',
  'Watching you grow from a little kid into this amazing person has been my greatest privilege.',
]

const JungleMemoryQuest = () => {
  const { setCurrentScene } = useStory()
  const [seeds, setSeeds] = useState([
    { id: 1, x: 20, y: 70, collected: false, planted: false },
    { id: 2, x: 80, y: 60, collected: false, planted: false },
    { id: 3, x: 50, y: 85, collected: false, planted: false },
  ])
  const [holdingSeed, setHoldingSeed] = useState(null)
  const [activeMemory, setActiveMemory] = useState(null)
  const [completedMemories, setCompletedMemories] = useState(0)

  const handleCollect = (id) => {
    if (holdingSeed) return
    setSeeds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, collected: true } : s))
    )
    setHoldingSeed(id)
  }

  const handlePlant = () => {
    if (!holdingSeed) return
    setSeeds((prev) =>
      prev.map((s) => (s.id === holdingSeed ? { ...s, planted: true } : s))
    )
    setHoldingSeed(null)
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
      setTimeout(() => setCurrentScene(SCENES.PYRAMID_OF_EMOTIONS), 4000)
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden bg-green-900'>
      {/* Background */}
      <div
        className='absolute inset-0 opacity-40 bg-cover bg-center transition-transform hover:scale-105 duration-[20s]'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564357640203-8d6d6783d810?q=80&w=1974&auto=format&fit=crop')`,
        }}
      ></div>

      {/* Ambient particles (Fireflies) */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-2 w-2 bg-yellow-300 rounded-full blur-[2px] opacity-70'
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className='absolute top-10 left-0 w-full text-center z-10'>
        <h2 className='text-2xl font-light text-green-100 drop-shadow-lg bg-black/30 inline-block px-4 py-1 rounded-full backdrop-blur-sm'>
          {completedMemories < 3
            ? 'Find 3 seeds and plant them in the center soil.'
            : 'The heart ends the quest.'}
        </h2>
      </div>

      {/* Central Planting Spot */}
      <div
        onClick={handlePlant}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-emerald-600/50 flex items-center justify-center transition-all duration-500 ${
          holdingSeed
            ? 'scale-110 bg-emerald-900/40 cursor-pointer shadow-[0_0_50px_emerald]'
            : 'bg-transparent'
        }`}
      >
        <div className='text-emerald-800 text-sm font-bold opacity-50'>
          PLANT HERE
        </div>

        {/* Planted Flowers */}
        {seeds
          .filter((s) => s.planted)
          .map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='absolute'
              style={{
                transform: `rotate(${
                  idx * 120
                }deg) translate(0, -60px) rotate(-${idx * 120}deg)`, // Position in circle
              }}
            >
              {/* Flower Blooming */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onClick={() => handleReadMemory(idx)}
                className='relative w-12 h-12 bg-pink-500 rounded-full cursor-pointer hover:scale-110 shadow-lg flex items-center justify-center'
              >
                <div className='absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20'></div>
                <span className='text-xl'>📜</span>
              </motion.div>
            </motion.div>
          ))}
      </div>

      {/* Scattered Seeds */}
      {seeds.map(
        (s) =>
          !s.collected && (
            <motion.div
              key={s.id}
              className='absolute w-8 h-8 bg-amber-700 rounded-full border-2 border-amber-900 cursor-pointer shadow-lg z-20'
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              onClick={() => handleCollect(s.id)}
            >
              <div className='w-full h-full flex items-center justify-center text-xs'>
                🌰
              </div>
            </motion.div>
          )
      )}

      {/* Cursor Follower (Holding Seed) */}
      {holdingSeed && (
        <motion.div
          className='fixed pointer-events-none z-50 text-2xl w-10 h-10 flex items-center justify-center bg-amber-700/80 rounded-full backdrop-blur-sm shadow-xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ left: 0, top: 0 }} // We use refined cursor logic usually, but for React simple implementation we'll just center it or use mouse tracking.
          // Simpler approach: Just Show "Holding Seed" near the instruction or center
        >
          <div className='fixed top-24 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce'>
            🌱 Holding Seed! Click Center Circle
          </div>
        </motion.div>
      )}

      {/* Memory Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
            onClick={closeMemory}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className='bg-white text-emerald-900 p-8 rounded-2xl max-w-md text-center shadow-2xl border-4 border-emerald-100 relative'
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className='text-xl font-bold mb-4 text-emerald-600'>
                Memory Unlocked ✨
              </h3>
              <p className='font-serif text-lg leading-relaxed italic'>
                "{activeMemory}"
              </p>
              <button
                onClick={closeMemory}
                className='mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700'
              >
                Close & Keep in Heart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Heart Reward */}
      {completedMemories === 3 && !activeMemory && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none'
        >
          <div className='text-9xl filter drop-shadow-[0_0_30px_rgba(255,20,147,0.8)] animate-pulse'>
            💖
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className='text-white text-center font-bold text-xl mt-4 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md'
          >
            Memories planted forever.
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}

export default JungleMemoryQuest
