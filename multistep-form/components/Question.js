import React from 'react'
import styles from '../styles/Home.module.css'

const Question = ({step, handleClick}) => {

  // console.log(step[0]);
  return (
    <div className={styles.questionContainer}>
        <h2>{step.question}</h2>
        <div className='answersSelection'>

            {step.answers.map(answer => (
                <div key={answer.id} className='answerWrapper'>
                    <input type="radio" id={answer.value} name={answer.value} value={answer.value} onClick={() => handleClick(answer, step.question)}></input>
                    <label htmlFor={answer.value}>{answer.body}</label>
                </div>

            ))}

        </div>
    </div>
  )

}

export default Question