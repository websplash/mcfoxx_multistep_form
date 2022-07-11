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
    const [chosenAnswers, setChosenAnswers] = useState({"steps": []})
    const [filteredQ, setFilteredQ] = useState(null)
   
    useEffect(() => {
    
        !isLoading && filterAnswers()
   
    }, [currentStep])
   
    const filterAnswers = () =>{

        if( currentStep != 0){

            let filteredtempAns = steps[currentStep]?.answers?.filter((ans)=> {
                let returnValue = false

                if(returnValue == false){

                    ans?.prevAns?.forEach(answer => {
                        if(answer == chosenAnswers.steps[currentStep -1 ].answer){
                            returnValue = true
                        }
                    });
                    
                }

                if(returnValue){
                    return ans
                }

           })

           setFilteredQ(filteredtempAns)

        }else{
            console.log(steps);
            // steps[currentStep]?.answers?.length > 0
            setFilteredQ(steps)
        }
    }

    const handleBackButton = () => {
        // On back remove previous answer

        let removedLast = chosenAnswers?.steps?.concat();
        removedLast.pop();

        setChosenAnswers({ steps: removedLast})
        setCurrentStep(currentStep - 1)

    }
    
    const handleClick = (answer, question) => {
        
        // Create a sample answer object
        let chosenAnswer = {
            "id": answer.id,
            "question" : question,
            "answer": answer.value,
            "expert": ""
        }
        
        // https://stackoverflow.com/questions/62918710/how-to-update-state-with-usestate-in-an-array-of-objects
        
        // Add the selected answer to the existing array of objects
        let newChosenAnswers = { ...chosenAnswers, steps: [...chosenAnswers.steps, chosenAnswer] }
        setChosenAnswers(newChosenAnswers)
        
        setCurrentStep(currentStep + 1)

    }

    return (
        <div className={ `${styles.container} ` }>
            <h2>Latest selection: 
                { chosenAnswers?.steps.map(step => {
                    return <div key={step.id}>{step.answer}</div>
                }) }
            </h2>
            <form>
                { error && <div>{error}</div> } 
                { isLoading && <div>Loading...</div> }
                { console.log(filteredQ)}
                {   
                    filteredQ?.map((ans)=> (
                        <Question key={ans.id} step={ans} handleClick={handleClick}></Question>
                    ))
                }
                
                {   steps.length == currentStep &&
                    <div>This was the last step</div>
                }
                { currentStep > 0 && <div className={styles.goBack} onClick={()=> handleBackButton()}>Go Back</div> }
            </form>
		</div>
    )

}

export default Step