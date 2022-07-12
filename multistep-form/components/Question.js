import {React} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Question = ({step, handleClick}) => {

  // console.log(step[0]);
  return (
    <div className={styles.questionContainer}>
        <h2>{step?.question && step.question}</h2>
        <h3>{step?.subtitle && step.subtitle}</h3>
        <div className='answersSelection'>

            {step.answers.map(answer => (
                <div key={answer.id} className='answerWrapper'>
                    <input type="radio" id={answer.value} name={answer.value} value={answer.value} onClick={() => handleClick(answer, step.question)}></input>
                    <label htmlFor={answer.value}>{answer.body}
                      {answer?.icon &&
                        <Image src={`/${answer.icon}`} alt={`${answer.value} icon`} width="150" height="150"></Image>
                      }
                    </label>
                </div>

            ))}

        </div>
    </div>
  )

}

export default Question