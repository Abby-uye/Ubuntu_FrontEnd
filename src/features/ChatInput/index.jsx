import {useEffect, useState} from "react";
import styles from "./index.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const ChatInput = ({onSend})=>{
    const [message, setMessage] = useState();

    function handleMessage(event){
        setMessage(event.target.value);
    }
    
    return(
        <div className={styles.inputContainer}>
            <input
                type="text"
                value={message}
                onChange={(e) => handleMessage(e)}
                className={styles.input}
                placeholder="Type a message..."
            />
.            <button className={styles.buttn} onClick={(event) => onSend(message)}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
)}

export default ChatInput