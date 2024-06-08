import {jwtDecode} from "jwt-decode";
import axios from "axios";
// import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "../../ViewAllPost/index.module.css";


const AllUserQuestions = () => {

    const [userQuestion, setUserQuestions] = useState([{
        userId: ""
    }])
    let userToken = localStorage.getItem("token")
    userToken = jwtDecode(userToken)
    let userId = userToken.sender_email
    useEffect(() => {
        const handleGetUserQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/question/getUserQuestion", {
                    userId: userId
                });
                console.log(response)
                if (response.status === 200) {
                    const data = await response.data
                    setUserQuestions(data);
                }
            } catch (error) {
                console.log(error)
                console.log("temporarily unavailable");
            }
        };

        handleGetUserQuestions()
    }, []);


    return (
        <div>
            {userQuestion.length > 0 ? (
                userQuestion.map((question, index) => (
                    <div key={index}>
                        <h2>{question.title}</h2>
                        <p>{question.body}</p>
                        <div className={styles.Comment}>
                            <button className={styles.theButton}>Reply</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Question Available</p>
            )}

        </div>
    )
}


export default AllUserQuestions


// const [userQuestion, setUserQuestion] = useState([{
//         userId:"",
//     }])
//
//     let userToken = localStorage.getItem("token")
//     userToken = jwtDecode(userToken)
//     let userId = userToken.sender_email
//     useEffect(() => {
//         const moveToUserQuestions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/ubuntu/question/getUserQuestion", {
//                     userId: userId
//                 })
//                 if (response.status === 200) {
//                     console.log(response.data)
//                     setUserQuestion(response.data)
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }, []);
//     return (
//         // {userQuestion.length > 0 ? (
//                 userQuestion.map((question, index) => (
//                     <div key={index}>
//                         <h2>{question.title}</h2>
//                         <p>{question.body}</p>
//                         <div className={styles.Comment}>
//                             <button className={styles.theButton}>Reply</button>
//                         </div>
//                     </div>
//                 ))
//             // ) : (
//             //     <p>No Question Available</p>
//             // )
//         // }
//     )
// }

