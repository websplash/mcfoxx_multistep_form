import {React, useState, useEffect} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    // Keep the count of the current steps
    /* Check if there are any answers for the selected question if not skip to the next one */
    // Handle back button in a case where there are some steps skipped due to the absence of the right questions
    
    const {data: steps, isLoading, error} = useFetch("https://dev.mcfoxx.de/wp-json/mf/v1/steps")
    // const {data: steps, isLoading, error} = useFetch("http://localhost:3001/steps/")

    const [currentStep, setCurrentStep] = useState(0)
    const [chosenAnswers, setChosenAnswers] = useState({            
        "steps": [],
        "expert": "", 
    })
    const [filteredStep, setFilteredStep] = useState(null)
    const [showNext, setShowNext] = useState({
        "show" : false,
        "answer" : '', 
        "question" : ''
    })   

    useEffect(() => {
        if(!isLoading){
            console.log("runs");
            filterStep();
        }
    }, [isLoading]);

    const filterStep = (counter = currentStep, newChosenAnswers = steps) =>{
        console.log("filter");
        // **************
        // **************
        // Pottencially use comma separated answers then have all of the answers store the specific paths to active it. (will probably need a panel for this)
        // Then maybe try and do this for the questions too?
        // To retain previous values use React.useRef() for more information read here pls https://www.w3schools.com/react/react_useref.asp
        
        // Figure out API Call on click
        // **************
        // **************

        if(counter != steps.length){
    
            if( counter !== 0){
                // Not first or last step
                
                let filteredtempAns = steps[counter]?.answers?.filter((answer)=> {
                    let returnValue = false
                        
                    answer?.prevAns?.filter(answerDependency => {

                        if(answerDependency == newChosenAnswers.steps[counter -1].answer){
                            returnValue = true
                        }
                        return returnValue
                    
                    });
                    
                    if(returnValue){
                        return true
                    }
                    
                    return false
                })

                // Filtering the rigth question
                let filteredtempQ = steps[counter]?.questions?.filter((question)=> {
                    let returnValueQ = false
                    question?.prevAns?.filter(questionDependency => {
                        
                        if(questionDependency == newChosenAnswers.steps[counter -1].answer || questionDependency === '__'){
                            returnValueQ = true;
                        }
                        return returnValueQ;
                    
                    });
                    
                    if(returnValueQ){
                        return true
                    }
                    
                    return false
                })
                
                let tempStep = {
                    "id": steps[counter].id,
                    "component": steps[counter].component,
                    "theClass": steps[counter].theClass,
                    "question": filteredtempQ[0].body,
                    "subtitle": steps[counter].subtitle,
                    "answers": filteredtempAns
                }
                
                setFilteredStep(tempStep)
                
            } else{
                // First step return in standart form
                setFilteredStep({
                    "id": steps[0].id,
                    "component": steps[0].component,
                    "theClass": steps[0].theClass,
                    "question": steps[0].questions[0].body,
                    "subtitle": steps[0].subtitle,
                    "showNext": steps[0].showNext,
                    "answers": steps[0].answers
                })
            }
            
        } else{
            // Last step
            setFilteredStep(null)
        }

    }

    const handleBackButton = () => {
        console.log("Handle back");
        // On back remove previous answer
        let removedLast = chosenAnswers?.steps?.concat();
        removedLast.pop();

        setChosenAnswers({ steps: removedLast})
        setCurrentStep(currentStep - 1)
        filterStep(currentStep - 1, { steps: removedLast})

        showNext.show && setShowNext(!showNext.show)    
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

        console.log(newChosenAnswers);
        showNext.show && setShowNext(!showNext.show)
    }

    const handleShowNext = (answer, question, condition) => {
        console.log(answer);
        setShowNext({
            "show" : condition,
            "answer" : answer, 
            "question" : question
        })
    }
    
    return (
        <div className={`${styles.container} `}>
            {/* <h2>The selections:  
                {chosenAnswers?.steps.map(step => {
                    return <span key={step.id}> {step.answer},</span>
                })}
            </h2> */}
            <form>
                {error && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {   
                    filteredStep &&
                    <Question key={filteredStep.id} step={filteredStep} handleClick={handleClick} handleShowNext={handleShowNext}></Question>
                }
                {   
                    steps.length == currentStep &&
                    <div>You went too far! nothing to see here. Please go back or refresh the page</div> 
                }

                <div className={styles.navigationBtns}>
                    {currentStep > 0 && <div className={styles.goBack} onClick={ ()=> handleBackButton() }>Zuruck</div>}
                    {showNext?.show && <div className={styles.goBack} onClick={ ()=> handleClick(showNext.answer, showNext.question) }>Weiter</div>}
                </div>

            </form>
		</div>
    )

}

export default Step