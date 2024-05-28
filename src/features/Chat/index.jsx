import {useState} from "react";
import style from "./index.module.css"
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import RecentlyChattedUser from "../RecentlyChattedUser";
import CohortState from "../CohortState";
import DisplayCohortAndMembers from "../DisplayCohortAndMembers";
import AllCohorts from "../AllCohorts";


const Chat = ()=>{

    const [messages,setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, { text: message, sender: 'You' }]);
    };

    const receiveMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, { text: message, sender: 'Alice', type: 'received' }]);
    };
    return(
        <div className={style.mainCont}>

            {/*<CohortState/>*/}
            {/*<DisplayCohortAndMembers/>*/}
            <AllCohorts/>
            {/*<RecentlyChattedUser/>*/}
        <div className={style.messageCont}>
            <ChatHistory messages={messages}/>
            <ChatInput onSend={handleSendMessage}/>
            <button onClick={() => receiveMessage("Hello from Alice!")}>Simulate Receive</button>
            </div>
        </div>
    )


}

export default Chat