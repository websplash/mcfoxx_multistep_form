import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const QuestionBox = ({answer, step, handleClick, handleShowNext, handleSelection, stateClass}) => {

    const [problemDesc, setProblemDesc] = useState("")

    const openTextarea = (answer, question) => {
        handleSelection(answer.id)
        handleShowNext(answer, question, true)
    }
    
    const handleTyping = (value, answer, question) => {
        setProblemDesc(value)
    }

    return (
    <div key={answer?.id} className={`${styles.answerContainer} ${styles[answer?.theClass]} ${styles[stateClass]}`}>
        <div className={`${styles.answerContainerInner}`}>
            {answer.theClass == "textarea" ? 
                <input className={styles.hiddenInput} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => openTextarea(answer, step.question)}></input>
               : <input className={styles.hiddenInput} type="radio" id={answer?.value} name={answer?.value} value={answer?.value} onClick={() => handleClick(answer, step.question)}></input>
            }
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
        {answer.theClass == "textarea" && 
            <div className={`${styles.testmodal}`}>
                <div className={styles.testmodalContainer}>
                    <textarea placeholder='In diesem Textfeld kannst du uns weitere Informationen mitteilen, die uns helfen, dein Problem schneller zu lösen. Beispielsweise hilft uns eine detailliertere Problembeschreibung und die genaue Modellnummer deines Gerätes, sofern bekannt (diese steht oft auf der Rückseite deines Geräts)' 
                        value={problemDesc} onChange={(e)=> handleTyping(e.value, answer, step.question)}></textarea>
                </div>
            </div>
        }
    </div>
  )
}

export default QuestionBox