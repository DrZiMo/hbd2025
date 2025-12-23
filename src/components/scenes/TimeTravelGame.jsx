import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const TimeTravelGame = () => {
  const { setCurrentScene } = useStory()
  const [month, setMonth] = useState(12)
  const [meteors, setMeteors] = useState([])
  const [lasers, setLasers] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const gameRef = useRef(null)

  // Month countdown (Game Timer)
  useEffect(() => {
    const timer = setInterval(() => {
      setMonth((prev) => {
        if (prev <= 6) {
          clearInterval(timer)
          setGameWon(true)
          return 6
        }
        return prev - 1
      })
    }, 4000) // 4 seconds per month -> ~24-30s game duration

    return () => clearInterval(timer)
  }, [])

  // Meteor Spawner
  useEffect(() => {
    if (gameWon) return
    const spawner = setInterval(() => {
      const id = Date.now()
      const x = Math.random() * 80 + 10 // 10% to 90% width
      setMeteors((prev) => [...prev, { id, x, y: -10 }])
    }, 800)

    return () => clearInterval(spawner)
  }, [gameWon])

  // Game Loop (Move Meteors)
  useEffect(() => {
    if (gameWon) return
    const loop = setInterval(() => {
      setMeteors(
        (prev) =>
          prev
            .map((m) => ({ ...m, y: m.y + 2 })) // Speed
            .filter((m) => m.y < 120) // Remove if off screen
      )
    }, 50)
    return () => clearInterval(loop)
  }, [gameWon])

  // Win Sequence
  useEffect(() => {
    if (gameWon) {
      setTimeout(() => {
        setCurrentScene(SCENES.FIXED_TIMELINE_ROOM)
      }, 3000)
    }
  }, [gameWon, setCurrentScene])

  const handleShoot = (e) => {
    if (gameWon) return
    const rect = gameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Add laser visual
    const laserId = Date.now()
    setLasers((prev) => [...prev, { id: laserId, x, y }])
    setTimeout(() => {
      setLasers((prev) => prev.filter((l) => l.id !== laserId))
    }, 200)

    // Hit detection
    setMeteors((prev) =>
      prev.filter((m) => {
        const mx = (m.x / 100) * rect.width
        const my = (m.y / 100) * rect.height
        const dist = Math.hypot(mx - x, my - y)
        return dist > 50 // Hit radius
      })
    )
  }

  return (
    <div
      ref={gameRef}
      className='relative h-screen w-full overflow-hidden bg-black cursor-crosshair'
      onClick={handleShoot}
    >
      {/* Space Tunnel Background */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black animate-pulse'></div>

      {/* Stars speed effect */}
      <div className='absolute inset-0'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute bg-white rounded-full opacity-0'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 20 + 10 + 'px',
            }}
            animate={{ opacity: [0, 1, 0], top: ['0%', '100%'] }}
            transition={{
              duration: Math.random() * 0.5 + 0.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Month Counter */}
      <div className='absolute top-10 right-10 z-20 flex flex-col items-end'>
        <h2
          className='text-6xl font-black text-white tracking-widest outline-text'
          style={{ textShadow: '0 0 20px blue' }}
        >
          {month < 10 ? `0${month}` : month}
        </h2>
        <p className='text-cyan-400 font-mono text-sm uppercase'>
          Timewarp Active
        </p>
      </div>

      {/* Meteors */}
      <AnimatePresence>
        {meteors.map((m) => (
          <motion.div
            key={m.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: `${m.y}%`, left: `${m.x}%` }}
            exit={{ scale: 1.5, opacity: 0, backgroundColor: 'orange' }}
            className='absolute h-12 w-12 rounded-full z-10 shadow-[0_0_15px_rgba(255,0,0,0.5)] bg-gradient-to-br from-gray-700 to-black border border-red-900 flex items-center justify-center'
          >
            🔥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Lasers */}
      {lasers.map((l) => (
        <div
          key={l.id}
          className='absolute bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_cyan]'
          style={{
            left: l.x,
            height: '100%',
            transformOrigin: 'bottom',
            transform: `rotate(${
              Math.atan2(
                l.y - window.innerHeight,
                l.x - window.innerWidth / 2
              ) *
                (180 / Math.PI) +
              90
            }deg)`, // Simplified straight up for now or just generic blast
          }}
        >
          {/* Actually just a burst at click location is better for "clicking meteors" */}
          <div className='absolute top-0 left-0 w-full h-full bg-cyan-500 opacity-50 blur-md'></div>
        </div>
      ))}
      {lasers.map((l) => (
        <div
          key={`burst-${l.id}`}
          className='absolute w-20 h-20 bg-cyan-500 rounded-full blur-xl opacity-80 pointer-events-none transform -translate-x-1/2 -translate-y-1/2'
          style={{ left: l.x, top: l.y }}
        />
      ))}

      {/* Win Flash */}
      {gameWon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-0 bg-white z-50 flex items-center justify-center'
        >
          <h1 className='text-6xl font-black text-black'>JUNE REACHED</h1>
        </motion.div>
      )}
    </div>
  )
}

export default TimeTravelGame
