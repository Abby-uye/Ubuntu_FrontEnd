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


const Chat = ()=> {
    const navigate = useNavigate();
    const [messages,setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [openTextArea, setOpenTextArea] = useState(false);
    const [userEmail, setUserEmail] = useState();
    const [sendData, setSendData] = useState(null);
    var email = "";

    
    useEffect(() => {
        if (localStorage.getItem("token") === null){
            navigate("/login");
        }
        const decodedObject = jwtDecode(localStorage.getItem("token"));
        email = decodedObject.recipient_email;
        setUserEmail(email);
    }, []);

    useEffect(() => {
        const initializeReuqest = async() => {

            const payLoad = {
                recipient_email: selectedUser,
                sender_email: userEmail
            };

            
            try{
                const response =  await axios.post(BACKEND_CHATROOM_BASE_URL+"/initialize", payLoad);

                console.log(response);

                if (response.status === 200){
                    console.log(response);
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
    console.log(selectedUser);
    if(selectedUser !== "") initializeReuqest();      
    }, [selectedUser]);



    const handleSendMessage = (message) => {
        if(message !== ""){
            sendData({
                content : message
            })
        }
        addMessageToList({
            content: message,
            username: email
        })
    };

    const addMessageToList = (val) => {
        if (val.room == "") return;
        setMessages([...messages, val]);
      };

    return(
        <div className={style.mainCont}>

        <div className={style.users}>
            <AllCohorts/>
            <RecentlyChattedUser selectedUser={setSelectedUser}/>
        </div>
        {openTextArea && 
        <div className={style.messageCont}>
            {/* <ChatHistory selectedUser={selectedUser} sendData={setSendData} username={userEmail}/>  */}
            <ChatInput onSend={handleSendMessage}/>
            </div>}
            <ToastContainer/>
        </div>
    )


}

export default Chat