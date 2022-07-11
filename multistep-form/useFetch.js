import { useEffect, useState } from "react"

const useFetch = (url) => {

    const [data, setData] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')

    const fetchTheData = async () => {

        const abortCont = new AbortController();

        try{
            const res = await fetch(url, {signal: abortCont.signal})
            if(!res.ok){
                throw Error("Could not fetch the data")
            }
            const data = await res.json();
            setData(data)
            setIsLoading(false)
            setError('');
        }catch(err){
            console.error(err);
            if(err.name == "AbortError"){
                console.log("Fetch Aborted");
            }else{
                setIsLoading(false)
                setError(err.message);
            }
        }

        // Aborts the fetch if the new page is loaded or the page is realoaded
        return () => abortCont.abort();
    }
    
    useEffect(() => {

        fetchTheData()

	},[url])

    return {data, isLoading, error}

}

export default useFetch;