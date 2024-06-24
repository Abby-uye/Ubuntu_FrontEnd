import {useEffect, useState} from "react";
import style from "./index.module.css"
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import RecentlyChattedUser from "../RecentlyChattedUser";
import AllCohorts from "../AllCohorts";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import { BACKEND_CHATROOM_BASE_URL } from "../../ApiUtils";
import { jwtDecode } from "jwt-decode";


const Chat = ({socket})=> {
    const navigate = useNavigate();
    const [message,setMessage] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [openTextArea, setOpenTextArea] = useState(false);
    const [userEmail, setUserEmail] = useState();
    var email = "";

    
    useEffect(() => {
        if (localStorage.getItem("token") === null){
            navigate("/login");
        }
        const decodedObject = jwtDecode(localStorage.getItem("token"));
        email = decodedObject.recipient_email;
        setUserEmail(email);
        if(socket){
        socket.emit("register", email);
        }
    }, []);

    useEffect(() => {
        const initializeReuqest = async() => {

            const payLoad = {
                recipient_email: selectedUser,
                sender_email: userEmail
            };
            
            try{
                const response =  await axios.post(BACKEND_CHATROOM_BASE_URL+"/initialize", payLoad);

                if (response.status === 200){
                    if(response.data.activated){
                        setOpenTextArea(true);
                    }else {
                        toast.success(`Message Request Sent To ${selectedUser}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                        setOpenTextArea(false);
                    }
                }
            }catch(error){
                console.log(error);
            }
    }
    if(selectedUser !== "") initializeReuqest();      
    }, [selectedUser]);



    const handleSendMessage = (message) => {
        if(message !== ""){
            if(socket) {
                console.log("Handle Send Message ", socket)
                socket.emit("send_message", {
                    sendId: userEmail, 
                    recipientId: selectedUser,
                    content: message
                });
            }
            const obj = {
                message: message,
                sendId: userEmail,
                recipientId: selectedUser
            }
            setMessage(obj);
        }
    };

    return(
        <div className={style.mainCont}>
        <div className={style.users}>
            <AllCohorts/>
            <RecentlyChattedUser selectedUser={setSelectedUser}/>
        </div>
        {openTextArea && 
        <div className={style.messageCont}>
            <ChatHistory selectedUser={selectedUser} socket={socket} username={userEmail} message={message}/>
            <ChatInput onSend={handleSendMessage}/>
            </div>}
            <ToastContainer/>
        </div>
    )


}

export default Chat