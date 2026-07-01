import './Congrats.css'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import surprise from '../assets/surprise.jpg'
import React from 'react';
import {useState} from 'react';
export default function Congrats() {
    const qrSwal = withReactContent(swal)
    const [showMessage, setShowMessage] = React.useState(false);
    const showQRAlert = () => {
        qrSwal.fire({
            text: 'Scan the QR code to find out!',
            imageUrl: surprise,
            imageWidth: 300,
            imageHeight: 300,
            theme: 'dark',
            confirmButtonText: 'Close',
        });
    };
     const handleButtonClick = () => {
         setShowMessage(true);
         showQRAlert();
    }
    const message = "We did it, we found the stolen items! Your help was invaluable in solving the case. The items stolen were actually meant for a special someone. Do you wanna know for whom they were meant????"
    const finalMessage = "Hope you like what you see ;)"
    return (
        <div>
            {!showMessage ?
                <div>
                    <h1>Well done Detective!</h1>
                    <p>{message}</p>
                    <button className="counter" onClick={handleButtonClick}>
                        Yes, tell me!!!
                    </button>
                    <button className="counter" onClick={handleButtonClick}>
                        Do you have to ask?
                    </button>
                </div> :
                <div><code>{finalMessage}</code></div>
            }
        </div>
    );
}