import './Riddle.css';
import { useState, Fragment } from 'react';
import qbank from '../assets/questionbank'
import Congrats from './congrats';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import gif from '../assets/wrongAnswer.gif'
import riddleComplete from '../assets/riddleComplete.gif'

export default function Riddle() { //pass the riddle state to the main component if required: {riddleState}
    
    const [riddleCounter, setRiddleCounter] = useState(1) // counts the number of riddles attempted, not the index of the riddle in the qbank array. 
    //const [riddle, setRiddle] = useState(false) //state to show whether the riddles were solved or not
    const [answer, setAnswer] = useState('')  //state to store the user's answer input
    const [hints, setHints] = useState('') // state to store the hints to be displayed for each question
    const [question, setQuestion] = useState(qbank[0].question) //state to store the current question
    const [correctAnswer, setCorrectAnswer] = useState(qbank[0].answer) //state to store the correct answer for the current question
    const [completed, setCompleted] = useState(false) // state to show whether all the riddles were completed or not
    const [showAlert, setShowAlert] = useState(false) // state to show the alert message when the user gives a wrong answer
    const alertMessages = [
        'Correct Answer! The theif has left more riddles',
        'Well done! Now go to the next riddle',
        'You got it right! Lets go to the next one',
        'I knew you had it in you! Great job!',
        'You are doing great! I couldn\'t have done it myself! Next riddle coming up!',
    ]
    const MySwal = withReactContent(Swal)
    const showWrongAnswerAlert = () => {
        MySwal.fire({
            imageUrl: gif,
            imageWidth: 300,
            imageHeight: 300,
            theme: 'dark',
            confirmButtonText: 'Try again, you got this!',
        })
    }
    const congratsAlert = withReactContent(Swal)
    const showCongratsAlert = () => {
        congratsAlert.fire({
            imageUrl: riddleComplete,
            imageWidth: 500,
            imageHeight: 500,
            theme: 'dark',
            confirmButtonText: 'Yayyyyyyy! We did it! ',
        })
    }
    const changeRiddleHandler = () => {
        // check if the answer is correct or not
        if (answer.toLowerCase() !== correctAnswer.toLowerCase()) {
            // if the answer is wrong, show an alert and reset the answer and hints
            showWrongAnswerAlert()
            setAnswer('')
            setHints('')
        }
        else {
            // if the answer is correct, move to the next riddle and reset the answer and hints
            setShowAlert(true) // show the alert message when the user gives a correct answer
            qbank.push(qbank.shift())
            setAnswer('')
            setCorrectAnswer(qbank[0].answer)
            setQuestion(qbank[0].question)
            setHints('')
            if (riddleCounter === qbank.length) {
                // if the user has completed all the riddles, set the completed state to true to show the congratulations message and hide the form
                //hide form and show congratulations message in the main component
                showCongratsAlert()
                setCompleted(true)
                //riddleState(true) // set the riddle state to true to show the next page with the surprise
            }
            setRiddleCounter(riddleCounter + 1) // increment the riddle counter to show the next riddle number
        }
    }

    return (
        <div>
            {completed? <Congrats /> :
            <div className = "riddle-container" >
                <h1>Riddle Number: {riddleCounter}</h1>
                    {showAlert ?<div className='alert-container'>
                        <p>
                            <code>{alertMessages[Math.floor(Math.random() * alertMessages.length)]}<br/><br/>
                             <button className='close-btn' onClick={() => setShowAlert(false)}>Go to the next riddle!</button>
                            </code>
                           
                        </p>
                    </div>:
                    <div className="riddle-form">
                        <div className="question-container" hidden={completed}>
                            <p><code>{question.split('<br>').map((line, i) => <Fragment key={i}>{line}<br /></Fragment>)}</code></p>
                        </div>
                        <input
                            type="text"
                            className="answer-input"    
                            placeholder="Your answer here" 
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <div className="hints-container">
                            <input type='text' value={hints} readOnly className='hint_display'/><br/><br/>
                            <button className="hint1" onClick={() => setHints(qbank[0].hints[0])}>Hint 1</button>
                            <button className="hint2" onClick={() => setHints(qbank[0].hints[1])}>Hint 2</button>
                            <button className="hint3" onClick={() => setHints(qbank[0].hints[2])}>Hint 3</button>
                            <button className="hint4" onClick={() => setHints(qbank[0].hints[3])}>Hint 4</button>
                        </div>
                        <button className="submit" onClick={changeRiddleHandler}>Check Answer</button>
                    </div >}
                </div>}
            </div>
    );
}