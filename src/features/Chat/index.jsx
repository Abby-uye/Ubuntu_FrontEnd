import {useEffect, useState} from "react";
import style from "./index.module.css"
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import RecentlyChattedUser from "../RecentlyChattedUser";
// import CohortState from "../CohortState";
// import DisplayCohortAndMembers from "../DisplayCohortAndMembers";
import AllCohorts from "../AllCohorts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_CHATROOM_BASE_URL } from "../../ApiUtils";
import { jwtDecode } from "jwt-decode";


const Chat = ()=>{
    const navigate = useNavigate()
    const [messages,setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [openTextArea, setOpenTextArea] = useState(false);
    var email = "";


    
    useEffect(() => {
        if (localStorage.getItem("token") === null){
            navigate("/login");
        }
        const decodedObject = jwtDecode(localStorage.getItem("token"));
        email = decodedObject.recipient_email;
    });

    useEffect(() => {
        const initializeReuqest = async() => {

            const payLoad = {
                recipient_email: selectedUser,
                sender_email: email
            }
            console.log(payLoad);
            try{
                const response =  await axios.post(BACKEND_CHATROOM_BASE_URL+"/initialize", payLoad);
                console.log(response);

                if (response.status === 200){
                    console.log(response);
                    if(response.data.activated){
                        setOpenTextArea(true);
                    }

                }

            }catch(error){
                console.log(error);
            }
    }
    console.log(selectedUser);
    if(selectedUser !== "") initializeReuqest();      
    }, [selectedUser])



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
        <div className={style.users}>
            <AllCohorts/>
            <RecentlyChattedUser selectedUser={setSelectedUser}/>
        </div>
        {openTextArea && 
        <div className={style.messageCont}>
            <ChatHistory messages={messages}/> <ChatInput onSend={handleSendMessage}/>
            {/* // <button onClick={() => receiveMessage("Hello from Alice!")}>Simulate Receive</button> */}
            </div>}
        </div>
    )


}

export default Chat