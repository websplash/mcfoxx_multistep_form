import {React, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QuestionBox from './Question_Templates/QuestionBox'
import QuestionTrueOrFalse from './Question_Templates/QuestionTrueOrFalse'

const Question = ({step, handleClick}) => {
  
  const [showHide, setShowHide] = useState("hide-opacity")
  // const [showHide, setShowHide] = useState("")

  const handleSubQuestion = () => {
    setShowHide("show-opacity")
    console.log("sub question");
  }

  return (
    <div className={`${styles.questionContainer} ${styles[step?.theClass]}`}>
        {step?.question && <h2 className={styles.questionTitle}>{step?.question}</h2>}
        {step?.subtitle !== "" && <p className={styles.questionSubTitle}>{step?.subtitle}</p>}

        <div className={styles.allAnswersContainer}>

          {step.answers.map(answer => (
              <>
                {/* Rendering the normal grey box questions */}
                {step.component == "QuestionBox" &&
                    <QuestionBox key={answer.id} step={step} answer={answer} handleClick={handleClick}></QuestionBox>}

                  {step.component == "QuestionTrueOrFalse" &&
                    <QuestionTrueOrFalse key={answer.id} step={step} answer={answer} handleClick={handleClick} handleSubQuestion={handleSubQuestion}></QuestionTrueOrFalse>}
              </>

          ))}

          { step.component == "QuestionTrueOrFalse" && 

            <div className={`${styles.subQuestionContainer} ${styles[showHide]}`}>
                {/* Loops through all of the answers in the quesion */}
                {step.answers.map(answer => (
                  <>
                    {/* Gets the subquestion title if there is one */}
                    {answer?.subQuestion && <h2 className={`${styles.questionTitle}`}>{answer?.subQuestion?.question}</h2>}

                    <div className={`${styles.subQuestionAnswersContainer}`}>
                      {//Looping through the subanswers if there are such as - (Ya/Nein) and outputs them 
                      answer?.subQuestion?.answers?.map(subAnswer => (
                        <QuestionTrueOrFalse key={subAnswer.id} step={step} answer={subAnswer} handleClick={handleClick}></QuestionTrueOrFalse>
                      ))}
                    </div>
                  </>

                ))}

            </div>

          }
          
        </div>
      </div>
  )

}

export default Question