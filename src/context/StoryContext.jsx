import { createContext, useState, useContext } from 'react'

const StoryContext = createContext()

export const SCENES = {
  INTRO: 'INTRO',
  LATE_ROOM: 'LATE_ROOM',
  TIME_THEORY: 'TIME_THEORY',
  TIME_TRAVEL_GAME: 'TIME_TRAVEL_GAME',
  FIXED_TIMELINE_ROOM: 'FIXED_TIMELINE_ROOM',
  ADVENTURE_CHOICE: 'ADVENTURE_CHOICE',
  JUNGLE_MEMORY_QUEST: 'JUNGLE_MEMORY_QUEST',
  PYRAMID_OF_EMOTIONS: 'PYRAMID_OF_EMOTIONS',
  MAIN_MESSAGE: 'MAIN_MESSAGE',
  WISH_INTERACTION: 'WISH_INTERACTION',
  RATING_MESSAGE: 'RATING_MESSAGE',
  MAKING_OF: 'MAKING_OF',
}

export const StoryProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState(SCENES.INTRO)
  const [inventory, setInventory] = useState([]) // For seeds/items
  const [puzzleProgress, setPuzzleProgress] = useState({})
  const [userData, setUserData] = useState({
    wish: '',
    rating: '',
    message: '',
  })
  const [audioEnabled, setAudioEnabled] = useState(false)

  const value = {
    currentScene,
    setCurrentScene,
    inventory,
    setInventory,
    puzzleProgress,
    setPuzzleProgress,
    userData,
    setUserData,
    audioEnabled,
    setAudioEnabled,
  }

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

export const useStory = () => {
  const context = useContext(StoryContext)
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider')
  }
  return context
}
