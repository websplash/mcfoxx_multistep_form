import React from 'react'
import { useState } from 'react';
import useFetch from '../../useFetch'
import styles from '../../styles/Home.module.css';


const PostCode = ({step, handleClick}) => {
    const {data: postCodes, isLoading, error} = useFetch("http://localhost:3001/postCodes/")
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const count = React.useRef(0);

    const handleChange = (element, index) => {
        // Filter only numbers
        if (isNaN(element.value)) return false;
        
        // Set the field only get the first inputet number to make sure 
        //multiple values are not put in for 1 field
        setOtp([...otp.map((d, idx) => (idx === index ? element.value[0] : d))]);

        if(element.value[0] != ''){
            count.current = count.current+1;
            console.log(otp);
            // If all of the fields are filled in jump to next step
            if(count.current === otp.length){
                // Get the comma separated list and put it in an array
                let postCodesArr = postCodes[0].split(',');
                // Check if the post code is in the service area
                (!isLoading && !error) && handleClick({"id": 1, "value": postCodesArr.includes(otp.join('') + element.value[0]) ? 'in-person' : 'remote'}, step.question);
            } 
        }
        //Focus next input
        element.nextSibling && element.nextSibling.focus();
        
    };

    return (
        <div className={styles.PostCodeContainer}>
            <div className={styles.PostCodeInputContainer}>
                {otp.map((data, index) => (
                    <input
                        className={styles.otpField}
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        placeholder={index +1}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostCode