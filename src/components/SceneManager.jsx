import React from 'react'
import { useStory, SCENES } from '../context/StoryContext'
import LoadingDoor from './scenes/LoadingDoor'
import LateRoom from './scenes/LateRoom'
import TimeTheory from './scenes/TimeTheory'
import TimeTravelGame from './scenes/TimeTravelGame'
import FixedTimelineRoom from './scenes/FixedTimelineRoom'
import AdventureChoice from './scenes/AdventureChoice'
import JungleMemoryQuest from './scenes/JungleMemoryQuest'
import PyramidOfEmotions from './scenes/PyramidOfEmotions'
import MainMessage from './scenes/MainMessage'
import WishInteraction from './scenes/WishInteraction'
import RatingMessage from './scenes/RatingMessage'
import MakingOf from './scenes/MakingOf'

// Placeholders for scenes - will be replaced as we implement them
const PlaceholderScene = ({ name }) => (
  <div className='flex h-screen w-full items-center justify-center bg-gray-900 text-white flex-col gap-4'>
    <h1 className='text-4xl font-bold'>{name}</h1>
    <p>Scene under construction</p>
  </div>
)

const SceneManager = () => {
  const { currentScene } = useStory()

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.INTRO:
        return <LoadingDoor />
      case SCENES.LATE_ROOM:
        return <LateRoom />
      case SCENES.TIME_THEORY:
        return <TimeTheory />
      case SCENES.TIME_TRAVEL_GAME:
        return <TimeTravelGame />
      case SCENES.FIXED_TIMELINE_ROOM:
        return <FixedTimelineRoom />
      case SCENES.ADVENTURE_CHOICE:
        return <AdventureChoice />
      case SCENES.JUNGLE_MEMORY_QUEST:
        return <JungleMemoryQuest />
      case SCENES.PYRAMID_OF_EMOTIONS:
        return <PyramidOfEmotions />
      case SCENES.MAIN_MESSAGE:
        return <MainMessage />
      case SCENES.WISH_INTERACTION:
        return <WishInteraction />
      case SCENES.RATING_MESSAGE:
        return <RatingMessage />
      case SCENES.MAKING_OF:
        return <MakingOf />
      default:
        return <PlaceholderScene name='Unknown Scene' />
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden bg-black text-white font-sans'>
      {renderScene()}
    </div>
  )
}

export default SceneManager
