// import {useEffect, useState} from "react";
// import axios from "axios";
import style from "./index.module.css";

import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import './AllQuestions.css';


const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = useState({}); // Manage the expanded state of each question
    const [newQuestion, setNewQuestion] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    useEffect(() => {
        const handleGetAllQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/question/getQuestion");
                if (response.status === 200) {
                    const data = response.data;
                    setQuestions(data);
                }
            } catch (error) {
                console.log(error);
                console.log("temporarily unavailable");
            }
        };

        handleGetAllQuestions();
    }, []);

    const toggleReadMore = (index) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    };

    const truncateText = (text, limit) => {
        const lines = text.split('\n');
        if (lines.length > limit) {
            return lines.slice(0, limit).join('\n') + '\n...';
        }
        return text;
    };
    const handleAddQuestion = () => {
        setQuestions([...questions, { title: 'New Question', body: newQuestion }]);
        setNewQuestion('');
    };

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={index} className={style.questioncontainer}>
                        <h2>{question.title}</h2>
                        <pre className={style.questionbody}>
              {expanded[index] ? question.body : truncateText(question.body, 4)}
            </pre>
                        {question.body.split('\n').length > 4 && (
                            <button onClick={() => toggleReadMore(index)} className={style.togglebutton}>
                                {expanded[index] ? 'Read less' : 'Read more'}
                            </button>
                        )}
                        <div className={style.commentsection}>
                            <button className={style.replybutton}>Reply</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Questions Available</p>
            )}
            <div className="pagination">
                {Array.from({length: Math.ceil(questions.length / questionsPerPage)}, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className="page-button">
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
// </div>
    )
        ;
};

export default AllQuestions;


// const AllQuestions =()=>{
//
//     const [questions ,setQuestions] = useState([])
//     useEffect(() => {
//         const handleGetAllQuestions = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8080/ubuntu/question/getQuestion");
//                 console.log(response)
//                 if (response.status === 200) {
//                     const data = await response.data
//                     setQuestions(data);
//                 }
//             } catch (error) {
//                 console.log(error)
//                 console.log("temporarily unavailable");
//             }
//         };
//
//         handleGetAllQuestions()
//     }, []);
//
//
//     return(
//         <div>
//             {questions.length > 0 ? (
//                 questions.map((question, index) => (
//                     <div key={index}>
//                         <h2>{question.title}</h2>
//                         <p>{question.body}</p>
//                         <div className={styles.Comment}>
//                             <button className={styles.theButton}>Reply</button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No Question Available</p>
//             )}
//
//         </div>
//     )
// }
//
// export default AllQuestions
//
//
