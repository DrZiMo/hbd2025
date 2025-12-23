import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStory, SCENES } from '../../context/StoryContext'

const SCENE_OPTIONS = [
  'The Late Skeleton',
  'Time Travel Game',
  'The Jungle Memories',
  'The Pyramid Puzzles',
  'The Main Message',
  'Everything!',
]

const RatingMessage = () => {
  const { setCurrentScene, setUserData } = useStory()
  const [favorite, setFavorite] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData((prev) => ({ ...prev, rating: favorite, message }))

    // Smooth exit
    setCurrentScene(SCENES.MAKING_OF)
  }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 overflow-y-auto'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-lg bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-purple-300'>
          Just one last thing... 📝
        </h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          {/* Section 1: Favorite Part */}
          <div className='flex flex-col gap-3'>
            <label className='text-gray-300 font-medium'>
              Which part did you love the most?
            </label>
            <div className='flex flex-wrap gap-2'>
              {SCENE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type='button'
                  onClick={() => setFavorite(opt)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    favorite === opt
                      ? 'bg-purple-500 text-white shadow-lg scale-105'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Message */}
          <div className='flex flex-col gap-3'>
            <label className='text-gray-300 font-medium'>
              Write me a small message 🤍
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Types something here...'
              rows={4}
              className='w-full bg-gray-900 text-white rounded-xl p-4 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none'
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={!favorite}
            className={`py-4 rounded-xl font-bold text-lg shadow-lg ${
              favorite
                ? 'bg-white text-gray-900 hover:bg-gray-100 cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Finish Journey →
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default RatingMessage
