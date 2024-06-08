import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../ViewAllPost/index.module.css";

const AllQuestions =()=>{

    const [questions ,setQuestions] = useState([])
    useEffect(() => {
        const handleGetAllQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/question/getQuestion");
                console.log(response)
                if (response.status === 200) {
                    const data = await response.data
                    setQuestions(data);
                }
            } catch (error) {
                console.log(error)
                console.log("temporarily unavailable");
            }
        };

        handleGetAllQuestions()
    }, []);


    return(
        <div>
            {questions.length > 0 ? (
                questions.map((question, index) => (
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

export default AllQuestions
