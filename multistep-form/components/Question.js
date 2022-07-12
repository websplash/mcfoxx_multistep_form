import {React} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QuestionBox from './Question_Templates/QuestionBox'

const Question = ({step, handleClick}) => {

  return (
    <div className={`${styles.questionContainer} ${styles[step?.theClass]}`}>
        {step?.question && <h2 className={styles.questionTitle}>{step?.question}</h2>}
        {step?.subtitle !== "" && <p className={styles.questionSubTitle}>{step?.subtitle}</p>}

        <div className={styles.allAnswersContainer}>

          {step.answers.map(answer => (
            
            <QuestionBox key={answer.id} step={step} answer={answer} handleClick={handleClick}></QuestionBox>

          ))}

        </div>
      </div>
  )

}

export default Question