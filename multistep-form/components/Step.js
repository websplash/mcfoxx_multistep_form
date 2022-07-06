import {React, useState} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    // Keep the cound of the current steps
    /* Check if there are any answers for the selected question if not skip to the next one */
    // Handle back button in a case where there are some steps skipped due to the absence of the right questions
    
    const {data: steps, isLoading, error} = useFetch("http://localhost:3001/steps/")
    const [currentStep, setCurrentStep] = useState(0)
    const [chosenAnswers, setChosenAnswers] = useState([{
        "steps": [
            {
                "id": 0,
                "question" : "",
                "answer": "",
                "expert": ""
            }
        ] 
    }])

    const updateChosenAnswer = (value) => {
        
    } 

    const handleBackButton = () => {
        console.log("click");
        setCurrentStep(currentStep - 1)
    }

    const handleClick = (value) => {
        console.log(value);
        setCurrentStep(currentStep++)
        // updateChosenAnswer(value)
    }

    return (
        <div className={`${styles.container} `}>
            <form>
                {error && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {   !isLoading && 
                    <Question key={steps[currentStep].id} step={steps[currentStep]} handleClick={handleClick}></Question>
                }
                {currentStep > 0 && <div className={styles.goBack} onClick={()=> handleBackButton()}>Go Back</div>}
            </form>
		</div>
    )

}

export default Step