import React from 'react'
import { StoryProvider } from './context/StoryContext'
import SceneManager from './components/SceneManager'

const App = () => {
  return (
    <StoryProvider>
      <SceneManager />
    </StoryProvider>
  )
}

export default App
