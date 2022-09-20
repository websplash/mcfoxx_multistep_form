import React from 'react'
import { useState, useEffect} from 'react'
import useFetch from '../useFetch'
import Question from './Question'
import styles from '../styles/Home.module.css'

const Step = () => {
    // Keep the count of the current steps
    /* Check if there are any answers for the selected question if not skip to the next one */
    // Handle back button in a case where there are some steps skipped due to the absence of the right questions
    
    const {data: steps, isLoading, error} = useFetch("https://dev.mcfoxx.de/wp-json/mf/v1/steps")
    // const {data: steps, isLoading, error} = useFetch("http://localhost:3001/steps/")

    // const [currentStep, setCurrentStep] = useState(0)
    const currentStep = React.useRef(0);
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
        console.log("rerenders");
    },);

    useEffect(() => {
        if(!isLoading){
            console.log("runs");
            filterStep();
        }
    }, [isLoading]);

    // This function gets the answers of the passed step in the arguements
    const getCurrentStepAnswers = (counter, newChosenAnswers) => {

        // Not first or last step
        return steps.steps[counter]?.answers?.filter((answer)=> {
            let returnValue = false
                
            answer?.prevAns?.filter(answerDependency => {
                console.log(newChosenAnswers.steps[newChosenAnswers.steps.length -1].answer);
                if(answerDependency == newChosenAnswers.steps[newChosenAnswers.steps.length -1].answer || answerDependency == '__'){
                    returnValue = true
                }
                return returnValue
            
            });
            
            if(returnValue){
                return true
            }
            
            return false
        })

    }

    // This gets the correct answer
    const getCurrentStepQuestions = (counter, newChosenAnswers) => {

        // Filtering the right question
        return steps.steps[counter]?.questions?.filter((question)=> {

            let returnValueQ = false
            question?.prevAns?.filter(questionDependency => {
                console.log(questionDependency);
                if(questionDependency == newChosenAnswers.steps[newChosenAnswers.steps.length -1].answer || questionDependency == '__'){
                    returnValueQ = true;
                }
                return returnValueQ;
            
            });
            
            if(returnValueQ){
                return true
            }
            
            return false
        })

    }

    const findNextCorrectStep = (counter, newChosenAnswers) => { 
        let answersFound = getCurrentStepAnswers(counter, newChosenAnswers)

        if(answersFound?.length > 0){
            return answersFound;
        }else{ 
            console.log("false");
            currentStep.current = counter + 1;

            if(currentStep.current <= steps.steps?.length){
                return findNextCorrectStep(currentStep.current, newChosenAnswers)
            }
        }
    }

    const filterStep = (newChosenAnswers = steps.steps) =>{

        // **************
        // **************
        // Pottencially use comma separated answers then have all of the answers store the specific paths to active it. (will probably need a panel for this)
        // Then maybe try and do this for the questions too?
        // To retain previous values use React.useRef() for more information read here pls https://www.w3schools.com/react/react_useref.asp
        
        // Figure out API Call on click
        // **************
        // **************

        
        if(currentStep.current != steps.steps?.length){
            
            if( currentStep.current !== 0){
                
                 // Calling to get the nearest step that matches previous answers criteria
                 let filteredtempAns = findNextCorrectStep(currentStep.current, newChosenAnswers)

                 // let filteredtempAns = getCurrentStepAnswers(currentStep.current, newChosenAnswers)
                 let filteredtempQ = getCurrentStepQuestions(currentStep.current, newChosenAnswers)
                    console.log(filteredtempQ);
                    console.log(filteredtempAns);

                // If the full path is not properly specified (no next step made) go to the last page, instead of code breaking.
                if(filteredtempQ == undefined || filteredtempAns == undefined || filteredtempAns.length == 0 || filteredtempQ.length == 0) {
                    // Send a dev email to report the bug
                
                    // let ErrchosenAnswer = {
                    //     "stepCount" : newChosenAnswers.steps[newChosenAnswers.steps.length -1].stepCount,
                    //     "id": newChosenAnswers.steps[newChosenAnswers.steps.length -1].id,
                    //     "question" : newChosenAnswers.steps[newChosenAnswers.steps.length -1].question,
                    //     "answer": "error",
                    // }
                    // console.log(ErrchosenAnswer);
                
                    // filteredtempAns = findNextCorrectStep(currentStep.current, ErrchosenAnswer)
                    // console.log(filteredtempAns);
                    // filteredtempQ = getCurrentStepQuestions(currentStep.current, ErrchosenAnswer)
                    // console.log(filteredtempQ);
                }

                setFilteredStep({
                    "id": steps.steps[currentStep.current].id,
                    "component": steps.steps[currentStep.current].component,
                    "theClass": steps.steps[currentStep.current].theClass,
                    "question": filteredtempQ[0].body,
                    "subtitle": steps.steps[currentStep.current].subtitle,
                    "answers": filteredtempAns
                })
                
                
            } else{
                // First step return in standart form
                setFilteredStep({
                    "id": steps.steps[0].id,
                    "component": steps.steps[0].component,
                    "theClass": steps.steps[0].theClass,
                    "question": steps.steps[0].questions[0].body,
                    "subtitle": steps.steps[0].subtitle,
                    "showNext": steps.steps[0].showNext,
                    "answers": steps.steps[0].answers
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
        // On the back button go to the step that the last answer was from (as steps can be skipped )
        currentStep.current = chosenAnswers.steps[chosenAnswers.steps.length -1].stepCount;
        filterStep({ steps: removedLast})

        showNext.show && setShowNext(!showNext.show)    
    }
    
    const handleClick = (answer, question) => {
        // Create a sample answer object

        let chosenAnswer = {
            "stepCount" : currentStep.current,
            "id": answer.id,
            "question" : question,
            "answer": answer.value,
        }
        
        // Add the selected answer to the existing array of objects
        let newChosenAnswers = {...chosenAnswers, steps: [...chosenAnswers.steps, chosenAnswer]}
        setChosenAnswers(newChosenAnswers)
        currentStep.current = currentStep.current + 1;
        filterStep(newChosenAnswers)

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
                    steps?.steps?.length == currentStep.current &&
                    <div>You went too far! nothing to see here. Please go back or refresh the page</div> 
                }

                <div className={styles.navigationBtns}>
                    {currentStep.current > 0 && <div className={styles.goBack} onClick={ ()=> handleBackButton() }>Zuruck</div>}
                    {showNext?.show && <div className={styles.goBack} onClick={ ()=> handleClick(showNext.answer, showNext.question) }>Weiter</div>}
                </div>

            </form>
		</div>
    )

}

export default Step