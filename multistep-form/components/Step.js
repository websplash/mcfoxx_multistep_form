import {React, useState} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    /* Check if there are any answers for the selected question if not skip to the next one */
    
    const {data: steps, isLoading, error} = useFetch("http://localhost:3001/steps/")
    const [chosenAnswers, setChosenAnswers] = useState([])

    const updateChosenAnswer = (value) => {
        // 
    } 

    const handleClick = (value) => {
        console.log(value);
    }

    return (
        <div className={`${styles.container} `}>
            <form>
                {error && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {steps.length > 0 && steps.map(step => (
                    <Question key={step.id} step={step} handleClick={handleClick}></Question>
                ))}
            </form>
		</div>
    )

}

export default Step