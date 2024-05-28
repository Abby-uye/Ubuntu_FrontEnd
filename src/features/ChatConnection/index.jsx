import style from "./index.module.css"
import {useEffect, useState} from "react";
import  SockJS  from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ChatConnection = () => {
    const [stompClient, setStompClient] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [recipientId, setRecipientId] = useState(null);
    const [message, setMessage] = useState(null);

    function onMessageReceived() {


    }

    function sendMessage(){
        const messageInput = message.value.trim;
        if (stompClient && messageInput){
            const chatMessage ={
                sendId: userId,
                content:messageInput.value.trim(),
                recipientId: recipientId,
            }
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
        }
    }

    function OnConnected() {
        stompClient.subscribe(`/user/${username}/queue/message`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);

    }

    function OnError() {

    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        console.log(socket);
        const stomp = Stomp.over(socket);
        console.log(stomp);
        setStompClient(stomp);
        stompClient.connect({}, OnConnected, OnError)
    }, []);



    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    return (
        <div className={style.chatcontainerhidden} id={style.chatpage}>
            <div className={style.userslist}>
                <div className={style.userslistcontainer}>
                    <h2>Online Users</h2>
                    <ul id={style.connectedUsers}>
                    </ul>
                </div>
                <div>
                    <p id={style.connecteduserfullname}></p>
                    <a className={style.logout} href="javascript:void(0)" id={style.logout}>Logout</a>
                </div>
            </div>

            <div className={style.chatarea}>
                <div className={style.chatarea} id={style.chatmessages}>
                </div>

                <form id={style.messageForm} name={style.messageForm} class={style.hidden}>
                    <div className={style.messageinput}>
                        <input onChange={handleInputChange} autocomplete="off" type="text" id={style.message}
                               placeholder="Type your message..."></input>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChatConnection