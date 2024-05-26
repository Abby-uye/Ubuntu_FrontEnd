import styles from "./index.module.css"
const ChatHistory = ({messages})=>{
    // return(
    //     <div className={styles.chatHistory}>
    //         {messages.map((msg, index) => (
    //             <div
    //                 key={index}
    //                 style={{
    //                     ...styles.message,
    //                     alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
    //                     backgroundColor: msg.type === 'sent' ? '#DCF8C6' : '#FFF',
    //                 }}
    //             >
    //                 <strong>{msg.sender}:</strong> {msg.text}
    //             </div>
    //         ))}
    // </div>
    // )


    return (
        <div className={styles.chatHistory}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
                >
                    <strong>{msg.sender}:</strong> {msg.text}
                </div>
            ))}
        </div>
    );

}

export default ChatHistory