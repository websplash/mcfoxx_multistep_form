import {React, useState, useEffect} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    // Keep the count of the current steps
    /* Check if there are any answers for the selected question if not skip to the next one */
    // Handle back button in a case where there are some steps skipped due to the absence of the right questions
    
    const {data: steps, isLoading, error} = useFetch("http://localhost:3001/steps/")
    const [currentStep, setCurrentStep] = useState(0)
    const [chosenAnswers, setChosenAnswers] = useState({            
        "steps": [],
        "expert": "", 
    })
    const [filteredStep, setFilteredStep] = useState(null)

    useEffect(() => {
        if(!isLoading){
            console.log("runs");
            filterStep();
        }
    }, [isLoading]);

    const filterStep = (counter = currentStep, newChosenAnswers = steps) =>{

        // **************
        // **************
        // Pottencially use comma separated answers then have all of the answers store the specific paths to active it. (will probably need a panel for this)
        // Then maybe try and do this for the questions too?

        // **************
        // **************

        if(counter != steps.length){
    
            if( counter !== 0){
                // Not first or last step
                console.log("not first");
                
                let filteredtempAns = steps[counter]?.answers?.filter((answer)=> {
                    let returnValue = false
                        
                    answer?.prevAns?.filter(answerDependency => {

                        // if(returnValue == false){
                        if(answerDependency == newChosenAnswers.steps[counter -1].answer){
                            returnValue = true
                        }
                        // }

                        return returnValue
                    
                    });
                    
                    if(returnValue){
                        return true
                    }
                    
                    return false
                })
                
                let tempStep = {
                    "id": steps[counter].id,
                    "component": steps[counter].component,
                    "theClass": steps[counter].theClass,
                    "question": steps[counter].question,
                    "subtitle": steps[counter].subtitle,
                    "answers": filteredtempAns
                }
                
                setFilteredStep(tempStep)
                
            } else{
                // First step
                console.log("first");
                setFilteredStep(steps[0])
            }
            
        } else{
            // Last step
            console.log("last");
            setFilteredStep(null)
        }

    }

    const handleBackButton = () => {
        // On back remove previous answer
        let removedLast = chosenAnswers?.steps?.concat();
        removedLast.pop();

        setChosenAnswers({ steps: removedLast})
        setCurrentStep(currentStep - 1)
        filterStep(currentStep - 1, { steps: removedLast})
    }
    
    const handleClick = (answer, question) => {
        // Create a sample answer object
        let chosenAnswer = {
            "id": answer.id,
            "question" : question,
            "answer": answer.value,
        }
        
        // Add the selected answer to the existing array of objects
        let newChosenAnswers = {...chosenAnswers, steps: [...chosenAnswers.steps, chosenAnswer]}
        setChosenAnswers(newChosenAnswers)
        setCurrentStep(currentStep + 1)
        filterStep(currentStep + 1, newChosenAnswers)
    }
    
    return (
        <div className={`${styles.container} `}>
            <h2>The selections:  
                {chosenAnswers?.steps.map(step => {
                    return <span key={step.id}> {step.answer},</span>
                })}
            </h2>
            <form>
                {error && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {   
                    filteredStep &&
                    <Question key={filteredStep.id} step={filteredStep} handleClick={handleClick}></Question>
                }
                {   
                    steps.length == currentStep &&
                    <div>This was the last step</div> 
                }
                {currentStep > 0 && <div className={styles.goBack} onClick={ ()=> handleBackButton() }>Zuruck</div>}

            </form>
		</div>
    )

}

export default Step