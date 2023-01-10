import React from "react"

export default function Question(props) {

    const [selectedOption, setSelectedOption] = React.useState('')

    const selectedOptionStyle = {
        backgroundColor: "#DBDEF0"
    }
    const correctOptionStyle = {
        backgroundColor: "#94D7A2"
    }
    const incorrectOptionStyle = {
        backgroundColor: "#F8BCBC",
        opacity: 0.5
    }

    function selectStyle(option) {
        if (props.showResult) {
            if (option === props.correctAnswer)
                return correctOptionStyle
            else
                if (option === selectedOption)
                    return incorrectOptionStyle
        }
        else {
            if (option === selectedOption)
                return selectedOptionStyle
        }
    }

    function selectOption(option) {
        if (!props.showResult) {
            setSelectedOption(option)
            if (option === props.correctAnswer)
                props.addResult(true, props.questionId)
            else
                props.addResult(false, props.questionId)
        }
    }

    const optionElements = props.optionsArray.map(
        (option, index) => <p
            key={index}
            onClick={() => selectOption(option)}
            className="options"
            style={selectStyle(option)}>
            {option}
        </p>
    )

    return (
        <div className="questionComponent">
            <h4 className="questionText">{props.question}</h4>
            <div className="optionsContainer">
                {optionElements}
            </div>
            <div className="questionSeparator"></div>

        </div>
    )
}