import styles from "./index.module.css"
const ChatHistory = ({messages})=> {
    return (
        <div className={styles.chatHistory}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.type === 'sent' ? styles.sentMessage : styles.receivedMessage}>
                    <strong>{msg.sender}:</strong> {msg.text}

                    <div className={styles.timestamp}>
                        {new Date().toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default ChatHistory