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
  
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={riddleImg} className="base" width="170" height="179" alt="" />
        </div>
        {showRiddle ? <Riddle riddleState={handleState} /> :
          <div>
            <h1>Please help me! :'''(</h1>
              <code className='header_message'>
                <p>{message}</p>
            </code>
            <button
              type="button"
              className="counter"
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
