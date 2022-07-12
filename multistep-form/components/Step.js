import {React, useState, useEffect} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    // Keep the cound of the current steps
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
                        return answer
                    }
                    
                })

                
                let tempStep = {
                    "id": steps[counter].id,
                    "question": steps[counter].question,
                    "answers": filteredtempAns
                }
                
                setFilteredStep(tempStep)
                
            }else{
                // First step
                console.log("first");
                setFilteredStep(steps[0])
            }
            
        }else{
            // Last step
            console.log("last");
            setFilteredStep(null)
        }

    }

    const handleBackButton = () => {
        // ** Missing feature - If question is skipped and back button is pressed

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
        
        // https://stackoverflow.com/questions/62918710/how-to-update-state-with-usestate-in-an-array-of-objects
        
        // Add the selected answer to the existing array of objects
        let newChosenAnswers = {...chosenAnswers, steps: [...chosenAnswers.steps, chosenAnswer]}
        setChosenAnswers(newChosenAnswers)
        
        setCurrentStep(currentStep + 1)
        filterStep(currentStep + 1, newChosenAnswers)
        
    }
    
    return (
        <div className={`${styles.container} `}>
            <h2>Latest selection: 
                {chosenAnswers?.steps.map(step => {
                    return <div key={step.id}>{step.answer}</div>
                })}
            </h2>
            <form>
                {error && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {   
                    filteredStep &&
                    <Question key={filteredStep.id} step={filteredStep} handleClick={handleClick}></Question>
                }
                {   steps.length == currentStep &&
                    <div>This was the last step</div> 
                }
                {currentStep > 0 && <div className={styles.goBack} onClick={ ()=> handleBackButton() }>Go Back</div>}

            </form>
		</div>
    )

}

export default Step