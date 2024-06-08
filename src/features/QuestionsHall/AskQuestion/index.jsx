import style from "./index.module.css"
import React, {useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Modal from "../../AskQuestionModal"

const AskQuestion = () => {
    const userDetailEncoded = localStorage.getItem("token")
    let userId = ""
    const [question, setQuestion] = useState({
        title: "",
        body: "",
        userId: "",
    })
    const [showModal, setShowModal] = useState(false);

    function handleChange(e) {
        const {name, value} = e.target
        setQuestion({
            ...question,
            [name]: value
        })
    }

    try {
        const userDetailDecode = jwtDecode(userDetailEncoded)
        console.log(userDetailDecode)
        userId = userDetailDecode.sender_email
    } catch (error) {
        console.log("Invalid details ", error)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/ubuntu/question/postQuestion", {
                title: question.title,
                body: question.body,
                userId: userId,
            })
            if (response.status === 201) {
                console.log(response)
            }
            window.location.reload();
        } catch (error) {
            console.log(error)
            window.location.reload();

        }
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // setAddMemberError('');
        setShowModal(false);
        // setForms([{name: '', email: ''}]);
    }


    return (
        <div className={style.main}>
            <button onClick={openModal} className={style.communtityButton}>Ask Question</button>
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className={style.miniMain}>
                    <label>Title</label>
                    <input className={style.questionTitle} onChange={handleChange} name={"title"}/>
                    <label>Details Of Your Problem</label>
                    <textarea className={style.questionDescriptions} onChange={handleChange} name={"body"}/>
                    <button type={"submit"} className={style.submitButton}>Submit</button>
                </form>
            </Modal>
        </div>
    )
}
export default AskQuestion