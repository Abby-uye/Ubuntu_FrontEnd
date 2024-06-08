import style from "./index.module.css"
import {IoIosNotifications} from "react-icons/io";
import React, {useRef, useState} from "react";
import FilledButton from "../../components/reuseables/FilledButton";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import AskQuestion from "./AskQuestion";
import AllQuestions from "./AllQuestions";
import {jwtDecode} from "jwt-decode";

const QuestionsHall = () => {
    const navigate = useNavigate()

    // const [userQuestions, setUserQuestion] = useState({
    //     userId: ""
    // })

    const moveToHome = async () => {
        navigate("/home")
    }

    // let userToken = localStorage.getItem("token")
    // userToken = jwtDecode(userToken)
    // let userId = userToken.sender_email
    //
    // const moveToUserQuestions = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8080/ubuntu/question/getUserQuestion", {
    //             userId: userId
    //         })
    //         if(response.status === 200){
    //             console.log(response.data)
    //             setUserQuestion(response.data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className={style.main}>
            <div className={style.heading}>
                <div className={style.questionHall}>
                    <p style={{margin: 10, fontWeight: 600, fontSize: 30}}>Question Hall</p>
                </div>
                <input type={"search"} placeholder={"Search"}/>
                <div className={style.noticationHeading}>
                    <IoIosNotifications style={{fill: "#671BC7", fontSize: "40px"}} className={style.notification}/>
                </div>

            </div>

            <div className={style.allButtons}>
                <div className={style.buttons}>
                    <button style={{color: "black", backgroundColor: ""}} onClick={moveToHome}> Home</button>
                    <button style={{color: "white", backgroundColor: "rgba(255, 0, 0, 0.92)"}}>My Questions</button>
                </div>
            </div>

            <div className={style.questionBoard}>
                <div className={style.askQuestion}>
                    <AskQuestion/>
                </div>
                <div className={style.allQuestionsBoard}>
                    <AllQuestions/>
                    {/*<p> Question one on the list</p>*/}
                </div>
            </div>


        </div>

    )

}

export default QuestionsHall