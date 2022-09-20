import {React, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QuestionBox from './Question_Templates/QuestionBox'
import QuestionTrueOrFalse from './Question_Templates/QuestionTrueOrFalse'
import PostCode from './Question_Templates/PostCode'

const Question = ({step, handleClick, handleShowNext}) => {
  
  const [showHide, setShowHide] = useState("hideElement")
  const [stateClass, setStateClass] = useState(null)

  const handleSubQuestion = () => {
    setShowHide("showElement")
  }

  const handleSelection = (id) => {
    setStateClass(id)
  }

  return (
    <div className={`${styles.questionContainer} ${styles[step?.theClass]}`}>

        {/* Loop through the questions the same way your are looping through the answers and put the questions in the array then dependent on the previous answer */}
        {step?.question && <h2 className={styles.questionTitle}>{step?.question}</h2>}
        {step?.subtitle !== "" && <p className={styles.questionSubTitle}>{step?.subtitle}</p>}

        <div className={`${styles.allAnswersContainer} ${styles[stateClass && "selectedOption" ]}`}>
          {(step.component == "QuestionBox" || step.component == "QuestionTrueOrFalse") && step.answers.map(answer => (
              <>
                {/* Rendering the normal grey box questions */}
                {step.component == "QuestionBox" &&
                    <QuestionBox key={answer.id} step={step} answer={answer} handleClick={handleClick} handleShowNext={handleShowNext} handleSelection={handleSelection} stateClass={answer?.id === stateClass ? 'selected' : 'notSelected'}></QuestionBox>}

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

          { step.component == "PostCode" && 

            <PostCode step={step} handleClick={handleClick}/>
            
          }
          
        </div>
      </div>
  )

}

export default Question