import React from "react"

export default function HomeScreen(props){
    
//   function playButton(){
//     console.log("In play button function")
//    // console.log(quizStarted)
//   }
    return(
        <div className="homeScreen">
           
            <h2 className="title">Quizzical</h2>
            <p className="description">A quiz game</p>
            <button className="playButton" onClick={props.playButton}>Play Game</button>

        </div>
    )
}