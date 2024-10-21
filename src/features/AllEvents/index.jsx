import React, {useEffect, useState} from "react";
import axios from "axios";
import style from "./index.module.css"
import Modal from "../AddEventModal"
import { BACKEND_EVENT_BASE_URL, FORMATDATE } from "../../ApiUtils";

const AllEvent = () => {
    const [events, setEvents] = useState([{
        title: "",
        description: "",
        eventDate: ""
    }]);
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
                const response = await axios.get(BACKEND_EVENT_BASE_URL+ "/findAllEvent");
                console.log(response);
                if (response.status === 200) {
                    const data = await response.data;
                    setEvents(data.body)
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

    const convertToJpgUrl = (imageUrl) => {
        if (imageUrl.endsWith('.heic')) {
          return imageUrl.replace(/\.heic$/, '.jpg').replace(/\/upload\//, '/upload/f_jpg/');
        }
        return imageUrl;
    };

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
                                    <h4>{FORMATDATE(new Date(newEvent.eventDate))}</h4>
                                    <p>{newEvent.description}</p>
                                    {newEvent.eventImage && <img src={convertToJpgUrl(newEvent.eventImage)} alt="event"/>}
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
