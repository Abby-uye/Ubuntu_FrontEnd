import React, {useEffect, useState} from "react";
import axios from "axios";
import style from "./index.module.css"
import Modal from "../AddEventModal"

const AllEvent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [events, setEvents] = useState([{
        title: "",
        description: "",
        eventDate: ""
    }]);
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // setAddMemberError('');
        setShowModal(false);
        // setForms([{name: '', email: ''}]);
    }

    useEffect(() => {
        const handleGetAllEvents = async () => {
            try {
                const response = await axios.post("http://localhost:8080/ubuntu/chatroom/getAllEvents");
                console.log(response);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log("data" + data)
                    setEvents(data)
                    // setFile(response.data.eventImage)
                    console.log(response.data);
                } else {
                    const errorMessage = response.data.message;
                    console.log(errorMessage)
                    setEvents([]);
                }
            } catch (error) {
                console.log("An error occurred", error);
            }
        };
        handleGetAllEvents().then();
    }, []);

    return (
        <div className={style.bodyMain}>
            <button onClick={openModal} className={style.communtityButton}>Events</button>
            <Modal show={showModal} onClose={closeModal}>
                <div className={style.main}>
                    <div className={style.heading}>
                        {/*<div className={style.mapAll}>*/}
                        <h3>Upcoming Event</h3>
                    </div>
                    <div>
                        <div className={style.map}>
                            {events && events.map((newEvent, index) => (

                                <div key={index} className={style.eventDetails}>
                                    <h3>{newEvent.title}</h3>
                                    <h4>{newEvent.eventDate}</h4>
                                    <p>{newEvent.description}</p>
                                    {newEvent.eventImage && <img src={newEvent.eventImage} alt="event"/>}
                                    <img src={newEvent.eventImage} alt="event"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}
export default AllEvent;
