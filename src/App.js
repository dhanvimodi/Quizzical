//import logo from './logo.svg';
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import './App.css';

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)

  function playButton() {
    setQuizStarted(true)
  }

  return (
    <div className="App">
      <img src={require("./images/yellowBlob.png")} className="yellowBlob" alt="" />
      {
        quizStarted ? <QuizScreen /> : <HomeScreen playButton={playButton} />
      }
      <img className="blueBlob" src={require("./images/blue-blob.png")} alt="" />

    </div>
  );
}

export default App;
