import axios from "axios";
import Speak_hook from "./hooks/Speak_hook"
import useSpeechRecognition from "./hooks/Speech_recognition_hook";

function App() {
  const { Text, StartListening, hasRecognitionSupport, Listining } = useSpeechRecognition();
  const { speakText } = Speak_hook()

  if (!Text) { }
  else {
    console.log(Text)
    axios.post('http://localhost:8001/', {
      text : Text
    }).then((response) => {
      // console.log(response);
      speakText(response.data)
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <>
      {!hasRecognitionSupport ? (<div>Browser not supported</div>) :
        (
          <>
            <div className="main">
              <div className="spinner" onClick={StartListening} disabled={Listining}>
                <div className="spinner1"></div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default App;
