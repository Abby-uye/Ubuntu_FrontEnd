import { BACKEND_MESSAGE_BASE_URL, FORMATDATE } from "../../ApiUtils";
import { useState, useEffect} from "react";
import axios from "axios";
import styles from "./index.module.css";


const ChatHistory = ({selectedUser, socket, username, message}) => {
const [responseData, setResponseData] = useState(null);
const [error, setError] = useState();

const messageListener = (data) => {
    setResponseData((prevMessages) => [...prevMessages, data]);
};

useEffect(() => {
    if(responseData === null){
        setResponseData(message);
    }
    messageListener(message);
}, [message])


useEffect(() => {
    socket.on("message", messageListener);

    return () => {
        socket.off("message", messageListener);
    };
}, [socket]);

useEffect(() => {
    const getMessage = async() => {
        const payload = {sendId: username, recipientId: selectedUser};
        try{
            const response = await axios.post(BACKEND_MESSAGE_BASE_URL+"/messages", payload);
            setResponseData(response.data);
        }catch(error){
            console.log(error);
            setError(error);
        }
    }
getMessage();
}, [selectedUser]);


return (
    <div className={styles.chatHistory}>
        {responseData && responseData.map((msg, index) => (
            <div
                key={index}
                className={msg.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
                >
                <strong>{msg.sendId}:</strong> {msg.message}

                <div className={styles.timestamp}>
                    {msg.dateSent ? FORMATDATE(new Date(msg.dateSent)) : FORMATDATE(new Date())}
                </div>
            </div>
            ))}
        </div>
    );

}

export default ChatHistory