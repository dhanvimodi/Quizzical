import React from "react"
import Question from "../components/Question"
import {nanoid} from "nanoid"


export default function QuizScreen(){
    const [questions,setQuestions]=React.useState([])
    const [showResult,setShowResult]=React.useState(false)
    const [resultArray,setResultArray]=React.useState([])
    const [newGame,setNewGame]=React.useState(false)
    const [score,setScore]=React.useState(0)

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response=>response.json())
        .then(response=>setQuestions(createQuestionArray(response.results)))
    },[newGame])


    function createQuestionArray(data){
        const questionArray=data.map((question)=>({
            questionId:nanoid(),
            question:question.question,
            incorrectAnswers:question.incorrect_answers,
            correctAnswer:question.correct_answer,
            optionsArray:getOptionsArray(question)
        }))
        return questionArray
    }

    function addResult(result,id){
        let tempArr=resultArray
        let i=0;
        for(;i<tempArr.length;i++){
            if(tempArr[i].questionId===id){
                tempArr[i].result=result
                break;
            }
        }
        if(i===tempArr.length){
            tempArr[i]={
                questionId:id,
                result:result
            }
        }
        setResultArray(tempArr)
    }

    function getOptionsArray(que){
        const tempArr=que.incorrect_answers
        const idx=Math.floor(Math.random()*(tempArr.length +1))
        tempArr.splice(idx,0,que.correct_answer)
        return tempArr
    }
    
    const questionElements=questions.map(
        (que)=>
             <Question
                        key={que.questionId} 
                        question={que.question} 
                        addResult={addResult}
                        questionId={que.questionId}
                        showResult={showResult}
                        newGame={newGame}
                        correctAnswer={que.correctAnswer}
                        incorrectAnswers={que.incorrectAnswers}
                        optionsArray={que.optionsArray}
                    />
        )

    function playAgain(){
        setNewGame(!newGame)
        setShowResult(false)
        setResultArray([])
        setScore(0)
    }

    function calculateResult(){
        if(resultArray.length!==questions.length)
            alert("Please answer all the questions")
        else{
            let score=0
            resultArray.map(result=>(
                result.result && score++
            ))
            setScore(score)
            setShowResult(true)
        }
        
    }
    return(
        <div className="quizScreen">
            {questionElements}
            
                {
                    showResult ?
                    <div className="resultButtonContainer">
                        <h1 className="resultText">You scored {score}/{questions.length} correct answers</h1>
                        <button className="playButton" 
                                onClick={playAgain}>Play Again</button>
                    </div>
                    :
                    <div className="resultButtonContainer">
                        <button className="playButton" 
                        onClick={calculateResult}>Check Answers</button>
            </div>
                } 

           
        </div>
    )
}