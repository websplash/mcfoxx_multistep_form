import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const QuestionTrueOrFalse = ({answer, step, handleClick, handleSubQuestion}) => {

    // KNOWN BUGS : Only the second level answer will be put into the answer history if in second layer
  return (
    <div key={answer?.id} className={`${styles.answerContainer} ${styles[answer?.theClass]}`}>
        <div className={`${styles.answerContainerInner}`}>
            
            {answer?.subQuestion ? 
                <input className={`${styles.hiddenInput}`} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleSubQuestion()}></input>
                :   
                <input className={`${styles.hiddenInput} nextStep`} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleClick(answer, step.question)}></input>}
            
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

export default QuestionTrueOrFalse