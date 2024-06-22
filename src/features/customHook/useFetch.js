import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_MESSAGE_BASE_URL } from "../../ApiUtils";


export const useFetch = ({ url, send, recipient }) => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (
            async function(){
                const payload = {
                    sendId : send,
                    recipientId: recipient,
                }
                try{
                    const response = await axios.post(BACKEND_MESSAGE_BASE_URL+url, payload)
                    console.log("Fetch Message -> ", response)
                    setResponseData(response.data);
                }catch(error){
                    setError(error);
                }
            })()
    }, [url]);
    return {responseData, error};
}