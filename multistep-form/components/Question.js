import {React} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Question = ({step, handleClick}) => {

  // console.log(step[0]);
  return (
    <div className={`${styles.questionContainer} ${styles[step?.theClass]}`}>
        <h2 className={styles.questionTitle}>{step?.question && step?.question}</h2>
        <p className={styles.questionSubTitle}>{step?.subtitle !== "" && step?.subtitle}</p>

        <div className={styles.answersContainer}>
            {step.answers.map(answer => (
                <div key={answer?.id} className={`${styles.answersWrapper} ${styles[answer?.theClass]}`}>
                    <input className={styles.hiddenInput} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleClick(answer, step.question)}></input>
                    <label className={styles.answerContainer} htmlFor={answer?.value}>
                        <div className={styles.theAnswerWrapper}>
                          {answer?.icon &&
                            <div className={styles.questionIcon} >
                              <Image src={`/${answer?.icon}`} alt={`${answer?.value} icon`} width="50" height="50"></Image>
                            </div>
                          }
                          {answer?.body && <p>{answer?.body}</p>}
                        </div>
                    </label>
                </div>

            ))}

        </div>
    </div>
  )

}

export default Question