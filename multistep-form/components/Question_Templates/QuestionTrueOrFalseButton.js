import React from 'react'
import styles from '../../styles/Home.module.css'

const QuestionTrueOrFalseButton = ({answer, step, handleClick}) => {
  return (
    <div key={answer?.id} className={`${styles.answerContainer} ${styles[answer?.theClass]}`}>
        <div className={`${styles.answerContainerInner}`}>
            <input className={styles.hiddenInput} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleClick(answer, step.question)}></input>
            <label className={styles.answerLabel} htmlFor={answer?.value}>
                <div className={styles.answerWrapper}>
                    {answer?.title && <h3>{answer?.title}</h3>}
                    {answer?.body && <p className={`${styles.SVGmaskBefore}`} >{answer?.body}</p>}
                </div>
            </label>

        </div>
    </div>
  )
}

export default QuestionTrueOrFalseButton