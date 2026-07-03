import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Riddle from './pages/Riddle'
import riddleImg from './assets/riddle_img.png'

function App() {

  function handleState(state) { 
    setRiddleCompleted(state)
    setShowRiddle(false)
  }
  const initialHeading = "Please help me! :'''("
  const [buttonText, setButtonText] = useState('Start the investigation!')
  const [count, setCount] = useState(0)
  const [riddleCompleted, setRiddleCompleted] = useState(false)
  const [message, setMessage] = useState(
    'Hi Detective! I am in big trouble. There has been a break-in at my home and items have been stolen. ' +
    'The items missing are very important to me. ' + 'The thief has left some riddles for finding the items ' +
    'I need your help in solving them for I know only you can help me. '
  )
  const [showRiddle, setShowRiddle] = useState(false);

  const handleClick = () => {
    const nextCount = count + 1
    setCount(nextCount)
    if (nextCount - 1 == 0) {
      setShowRiddle(true)
      setCount(nextCount)
      setRiddleCompleted(false)
    }
  }
  const backgroundStory = "It all happened this morning. I went out to get some groceries and when I came back, I was astonished to find that the front door of my house was unlocked. " +
    "When I went inside, everything was hither and thither. It took me a while to realize what had happened, someone had broken into my house. " +
    "The thief has stolen my most valuable items. I have no idea who could have done this. But I know that only you can help me find the thief and recover my stolen items. " +
    "Please help me, Detective!"

  return (
    <>
      <section id="center">
        <div className="main_img_container">
          <img src={riddleImg} className="base" alt="" />
        </div>
        {showRiddle ? <Riddle riddleState={handleState} /> :
          <div>
            <h1>{initialHeading}</h1>
            <code className='message'>
              <p>{message}</p>
            </code>
            <code className='message'>
              <p><b>Background Story:</b> {backgroundStory}</p>
            </code>
            <button
              type="button"
              className="start_button"
              onClick={handleClick}
            >
              {buttonText}
            </button>
          </div>}
      </section>
    </>
  )
}

export default App
