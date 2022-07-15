import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const QuestionBox = ({answer, step, handleClick}) => {
    return (
    <div key={answer?.id} className={`${styles.answerContainer} ${styles[answer?.theClass]}`}>
        <div className={`${styles.answerContainerInner}`}>
            <input className={styles.hiddenInput} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleClick(answer, step.question)}></input>
            <label className={styles.answerLabel} htmlFor={answer?.value}>
                <div className={styles.answerWrapper}>
                    {answer?.icon &&
                        <div className={styles.questionIcon} >
                        <Image src={`/${answer?.icon}`} alt={`${answer?.value} icon`} width="50" height="50"></Image>
                        </div>
                    }
                    {answer?.title && <h3>{answer?.title}</h3>}
                    {answer?.body && <p>{answer?.body}</p>}
                </div>
            </label>

        </div>
    </div>
  )
}

export default QuestionBox