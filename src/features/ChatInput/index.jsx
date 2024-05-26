import {useState} from "react";
import styles from "./index.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({onSend})=>{
    const [message, setMessage] = useState('');
    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
        }
    return(
        <div className={styles.inputContainer}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.input}
                placeholder="Type a message..."
            />
            <button onClick={handleSend} className={styles.buttn}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    )}

    export default ChatInput