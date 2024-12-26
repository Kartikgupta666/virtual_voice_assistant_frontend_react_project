import { useState, useEffect } from "react";

let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.interimResults = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [Text, setText] = useState("");
    const [Listining, setListining] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            setText(event.results[0][0].transcript);
            console.log(event.results[0][0].transcript)
            recognition.stop();
            console.log("not listening")
            setListining(false);
        };
    }, []);

    const StartListening = () => {
        setText('')
        console.log("listening")
        setListining(true);
        recognition.start();
    }

    const StopListenting = () => {
        console.log("not listening")
        setListining(false);
        recognition.stop();
    }

    return { StartListening, hasRecognitionSupport: !!recognition, Text, Listining, StopListenting };
}
export default useSpeechRecognition;