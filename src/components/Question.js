import { initial, result } from "lodash"
import React from "react"

export default function Question(props){
   
    const [optionsArray,setOptionsArray]=React.useState(getOptionsArray)
    const [selectedOption,setSelectedOption]=React.useState('')
   // const [showResult,setShowResult]=React.useState(false)
   // console.log(props.questionIndex+" options are "+optionsArray)
    // console.log(props.question)
   // let optionElements
    // React.useEffect(()=>{
    //     // props.question.incorrect_answers.splice(
    //     //     Math.floor(Math.random()*(props.question.incorrect_answers.length +1)),
    //     //     0,
    //     //     props.question.correct_answer
    //     )
    console.log(props)
    // },[props.newGame])
    // console.log('Options array is'+optionsArray)
    const selectedOptionStyle={
        backgroundColor:"#DBDEF0"
    }
    const correctOptionStyle={
        backgroundColor:"#94D7A2"
    }
    const incorrectOptionStyle={
        backgroundColor:"#F8BCBC",
        opacity:0.5
    }
    function selectStyle(option){
        if(props.showResult){
            if(option===props.question.correct_answer) 
                return correctOptionStyle
            else
                if(option===selectedOption)
                    return incorrectOptionStyle
        }
        else{
            if(option===selectedOption)
                return selectedOptionStyle
        }
    }
    

    function getOptionsArray(){
        const tempArr=props.question.incorrect_answers
        const idx=Math.floor(Math.random()*(tempArr.length +1))
        tempArr.splice(idx,0,props.question.correct_answer)
        return tempArr
    }

    function selectOption(option){
       // console.log("Selected option is "+option)
        setSelectedOption(option)
        if(option===props.question.correct_answer)
            props.addResult(true,props.questionIndex)
        else
            props.addResult(false,props.questionIndex)
    }

    const optionElements=optionsArray.map(
        option=><p 
                onClick={()=>selectOption(option)} 
                className="options"
                style={selectStyle(option)}>
                    {option}
                </p>
        )
    
    //console.log("Options array is"+optionsArray)

    

    return(
    <div className="questionComponent">
        <h4 className="questionText">{props.question.question}</h4>
        <div className="optionsContainer">
            {optionElements}
        </div>
        <div className="questionSeparator"></div>
        
    </div>
    )
}