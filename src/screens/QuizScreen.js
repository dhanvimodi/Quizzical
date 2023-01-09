import React from "react"
import Question from "../components/Question"
import nanoid from "nanoid"


// category:"Entertainment: Video Games"
// correct_answer:"Microsoft"
// difficulty:"easy"
// incorrect_answers:(3) ['Apple', 'Google', 'Yahoo']
// question:"Which company did Gabe Newell work at before founding Valve Corporation?"
// type:"multiple"

export default function QuizScreen(){
    const [questions,setQuestions]=React.useState([])
    const [showResult,setShowResult]=React.useState(false)
    const [result,setResult]=React.useState(0)
    const [newGame,setNewGame]=React.useState(false)

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response=>response.json())
        .then(response=>setQuestions(response.results))
       // .then(response=>setQuestions(response.results))
    },[newGame])

console.log(questions)

    function addResult(result,index){

        for(let i=0;i<questions.length;i++){
            if(index===i)
                if(result)
                    setResult((prevResult)=>prevResult+1)
        }
    }

    // function getOptionsArray(que){
    //     const tempArr=que.incorrect_answers
    //     const idx=Math.floor(Math.random()*(tempArr.length +1))
    //     tempArr.splice(idx,0,que.correct_answer)
    //     return tempArr
    // }
    
    //console.log(result)
    const questionElements=questions.map(
        (que,index)=>
            //const optionArray=getOptionsArray(que)
             <Question
                        key={index} 
                        question={que} 
                        addResult={addResult}
                        questionIndex={index}
                        showResult={showResult}
                        newGame={newGame}
                        //  optionArray={que.incorrect_answers.
                        //     splice(
                        //          Math.floor(Math.random()*(que.incorrect_answers.length +1)),
                        //          0,
                        //          que.correct_answer)}
                    />
        )

    function playAgain(){
        setNewGame(true)
        setShowResult(false)
        setResult(0)
        // <QuizScreen/>
    }

    return(
        <div className="quizScreen">
            {/* <button onClick={getOptionsArray}>Click</button> */}
            {questionElements}
            
                {
                    showResult ?
                    <div className="resultButtonContainer">
                        <p className="resultText">You scored {result}/{questions.length} correct answers</p>
                        <button className="playButton" 
                                onClick={playAgain}>Play Again</button>
                    </div>
                    :
                    <div className="resultButtonContainer">
                        <button className="playButton" 
                        onClick={()=>setShowResult(true)}>Check Answers</button>
            </div>
                } 

           
        </div>
    )
}