import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import {CiImageOn} from 'react-icons/ci';
import FilledButton from "../../components/reuseables/FilledButton";
import Modal from "../AddEventModal"
import style from './index.module.css';
import { format } from 'date-fns';

const AddEvent = () => {
    const fileRef = useRef(null);
    const [events, setEvents] = useState([{
        title: "",
        description: "",
        eventDate: ""
    }]);
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState('');

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const dateOnly = selectedDate.split('T')[0];
        setDate(dateOnly);
    };

    function handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        setEvents({
            ...events,
            [name]: value,

        });
        handleDateChange(event)
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleIconClick() {
        fileRef.current.click();
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // setAddMemberError('');
        setShowModal(false);
        // setForms([{name: '', email: ''}]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        console.log(formattedDate)
        try {
            const formData = new FormData();
            formData.append('title', events.title);
            formData.append('description', events.description);
            formData.append('eventDate', events.eventDate);
            formData.append('image', file);

            console.log(formData)

            const response = await axios.post('http://localhost:8080/ubuntu/chatroom/createEvent', formData);

            if (response.status === 200) {
                console.log(response)
                console.log("message " + response.data.message)
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            window.location.reload();
        } catch (err) {
            console.log(err)
            toast.error("Error occurred while creating the event", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    return (
        <div className={style.main}>
            <button onClick={openModal} className={style.communtityButton}>Add Event</button>
            <Modal show={showModal} onClose={closeModal}>

                <div className={style.submain}>
                    <h4>Add Events</h4>
                    <form onSubmit={handleSubmit} className={style.formInfo}>
                        <input
                            type="text"
                            name="title"
                            value={events.title}
                            onChange={(event) => handleChange(event)}
                            className={style.title}
                            placeholder="Enter Event Title"
                        />
                        <textarea
                            name="description"
                            value={events.description}
                            onChange={handleChange}
                            className={style.description}
                            placeholder="Enter Event Description"

                        />
                        <input
                            type="date"
                            name="eventDate"
                            value={events.eventDate}
                            onChange={handleChange}
                            className={style.date}
                            min={Date.now()}
                        />
                        <CiImageOn size="25px" color="#a6e1ec" onClick={(event) => handleIconClick(event)}/>
                        <input
                            type="file"
                            name="file"
                            ref={fileRef}
                            onChange={(event) => handleFileChange(event)}
                            style={{display: "none"}}

                        />
                        <FilledButton
                            textColor="white"
                            backgroundColor="rgba(255, 0, 0, 0.92"
                            text="Post"
                            type="submit"
                        />
                        <ToastContainer/>
                    </form>
                </div>
            </Modal>

        </div>


    );
};

export default AddEvent;

