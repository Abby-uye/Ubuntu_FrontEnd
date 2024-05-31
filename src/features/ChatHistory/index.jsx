import { useFetch } from "../customHook/useFetch";
import { useSocket } from "../customHook/useSocket";
import styles from "./index.module.css"

const ChatHistory = ({selectedUser, setSendData, username}) => {

    let room = username + "_" + selectedUser;

    const [socketResponse, isConnected, sendData] = useSocket(room, username);

    console.log(isConnected);
    console.log(sendData);
    console.log(socketResponse);

    const [responseData, error] = useFetch("/messages", username, selectedUser);

    console.log(error)

    console.log(responseData);

    setSendData(sendData);

    return (
        <div className={styles.chatHistory}>
            {responseData && responseData.map((msg, index) => (
                <div
                    key={index}
                    className={msg.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
                >
                    <strong>{msg.sendId}:</strong> {msg.message}

                    <div className={styles.timestamp}>
                        {new Date().toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default ChatHistory