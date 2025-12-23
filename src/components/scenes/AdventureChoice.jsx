import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const AdventureChoice = () => {
  const { setCurrentScene } = useStory()
  const [rejected, setRejected] = useState(false)

  const handleYes = () => {
    setCurrentScene(SCENES.JUNGLE_MEMORY_QUEST)
  }

  const handleNo = () => {
    setRejected(true)
    setTimeout(() => {
      handleYes()
    }, 2000)
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-sky-900 text-white p-8'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className='text-center'
      >
        <h1 className='text-4xl md:text-6xl font-bold mb-12'>
          Want to go for some adventure? 🌍
        </h1>

        <div className='flex flex-col md:flex-row gap-8 justify-center items-center'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYes}
            className='px-10 py-4 bg-green-500 rounded-2xl text-2xl font-black shadow-lg hover:bg-green-400'
          >
            YES! 🎒
          </motion.button>

          {!rejected ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNo}
              className='px-10 py-4 bg-red-500 rounded-2xl text-2xl font-black shadow-lg hover:bg-red-400'
            >
              NO 🙅‍♀️
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='text-xl font-bold text-yellow-300 max-w-xs'
            >
              "Haha, nice try. We're going anyway! 🏃‍♂️💨"
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AdventureChoice
