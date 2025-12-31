import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useStory, SCENES } from '../../context/StoryContext'

const WishInteraction = () => {
  const { setCurrentScene, setUserData } = useStory()
  const [wish, setWish] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!wish.trim()) return

    setUserData((prev) => ({ ...prev, wish }))
    setLoading(true)

    // Keys from .env
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const templateParams = {
      wish: wish,
    }

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
        setSubmitted(true)
        setLoading(false)
        // Navigate after a delay to show the success message
        setTimeout(() => {
          setCurrentScene(SCENES.RATING_MESSAGE)
        }, 3000)
      },
      (err) => {
        console.log('FAILED...', err)
        setLoading(false)
        // Even if it fails, we might want to let them proceed or show an error
        // For now, let's pretend it worked for the user's sake so they don't get stuck
        setSubmitted(true)
        setTimeout(() => {
          setCurrentScene(SCENES.RATING_MESSAGE)
        }, 3000)
      }
    )
  }

  const [stars, setStars] = useState([])

  React.useEffect(() => {
    const generatedStars = [...Array(50)].map((_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      width: Math.random() * 3 + 'px',
      height: Math.random() * 3 + 'px',
      animationDuration: Math.random() * 3 + 2 + 's',
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-indigo-950 text-white p-8 relative overflow-hidden'>
      {/* Background Stars */}
      <div className='absolute inset-0'>
        {stars.map((star) => (
          <div
            key={star.id}
            className='absolute bg-white rounded-full opacity-70 animate-pulse'
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              animationDuration: star.animationDuration,
            }}
          ></div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='z-10 w-full max-w-md text-center'
      >
        {!submitted ? (
          <>
            <h2 className='text-3xl font-bold mb-8'>Time to make a wish 😄</h2>
            <p className='text-xl mb-8 text-indigo-200'>Make a wish.</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <input
                type='text'
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder='Here...'
                className='w-full bg-indigo-900/50 border-2 border-indigo-400 rounded-xl px-6 py-4 text-white placeholder-indigo-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all text-center text-lg'
                autoFocus
                disabled={loading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                disabled={loading}
                className='bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Sending...' : 'Send to the Stars 🚀'}
              </motion.button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='flex flex-col items-center'
          >
            <div className='text-6xl mb-4'>✨</div>
            <h3 className='text-2xl font-bold text-pink-300'>Wish Received.</h3>
            <p className='text-indigo-200 mt-2'>
              The universe is working on it.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default WishInteraction
