import {useEffect, useState} from "react";
import styles from "./index.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const ChatInput = ({onSend})=>{
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState("ojot630@gmail.com");
    const [recipientId, setRecipientId] = useState("deborahdelighted5@gmail.com");

    function sendMessage(event){
        const messageInput = message.trim;
        if (stompClient && messageInput){
            const chatMessage ={
                sendId: userId,
                content:messageInput,
                recipientId: recipientId,
            }
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
        }
        setMessage('');
        event.preventDefault();
    }

    function onMessageReceived(payload) {
        console.log('Message received', payload);
        const message = JSON.parse(payload.body);
        console.log(message)
    }

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
        }

    function OnConnected(frame) {
        console.log("Connected to ", frame);
        stompClient.subscribe(`/user/${userId}/queue/message`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);


    }

    function OnError(error) {
        console.log("Error ", error)
    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        console.log(socket);
        const stomp = Stomp.over(socket);
        console.log(stomp);
        setStompClient(stomp);
        stomp.connect({}, OnConnected, OnError);

        return() => {
            if(stompClient != null){
                stompClient.disconnect(() => {
                    console.log('Disconnected')
                })
            }
        }
    }, [stompClient]);



    return(
        <div className={styles.inputContainer}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.input}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage} className={styles.buttn}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>
)}

export default ChatInput