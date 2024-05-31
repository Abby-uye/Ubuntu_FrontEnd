import style from "./index.module.css"
import addCohort from "../../assets/communityManger/addCohortIcon1-removebg-1.png"
import addStudents from "../../assets/communityManger/addStudentIcon-removebg-preview.png"
import removeStudent from "../../assets/communityManger/removeAStudentIcon-removebg-preview.png"
import addEvent from "../../assets/communityManger/addEventIcon-removebg-preview.png"
import updateEvent from "../../assets/communityManger/updateImageIcon-removebg-preview.png"
import deleteEvent from "../../assets/communityManger/deleteEventIcon-removebg-preview.png"
import event from "../../assets/communityManger/event.png"

import AddMemberToCohort from "../AddMemberToCohort";
import AddCohort from "../AddCohort";
import AddMember from "../AddMemberToCohort";
import {MdOutlinePostAdd} from "react-icons/md";
import React from "react";
import {IoIosChatboxes, IoIosNotifications} from "react-icons/io";
import ViewAllPost from "../ViewAllPost";
import AddEvent from "../AddEvent";
import AllEvent from "../AllEvents";

const CommunityManagerPage = () => {

    function changeBackgroundOnOver(e) {
        e.target.style.backgroundColor = "#007bff"
    }


    return (
        <div className={style.main}>
            <div className={style.heading}>
                <div className={style.community}>
                    <p style={{margin: 10, fontWeight: 600, fontSize: 30}}>Community Manager</p>
                </div>
                <input type={"search"} placeholder={"Search"}/>
                <div className={style.noticationHeading}>
                    <IoIosNotifications style={{fill: "#671BC7", fontSize: "40px"}} className={style.notification}/>
                </div>
            </div>

            <div className={style.submain}>
                <div className={style.duties}>
                    <div className={style.addCohort}>
                        <img src={addCohort} alt={"addcohort"} className={style.addCohortImage}/>
                        <AddCohort/>
                    </div>

                    <div className={style.addStudents}>
                        <img src={addStudents} alt={"addStudents"} className={style.addStudentsImage}/>
                        <AddMember/>
                    </div>

                    <div className={style.removeStudent}>
                        <img src={removeStudent} alt={"removeStudent"} className={style.removeStudentImage}/>
                        <button className={style.communtityButton}>Remove Student</button>

                    </div>

                    <div className={style.addEvent}>
                        <img src={addEvent} alt={"addEvent"} className={style.addEventImage}/>
                        <AddEvent/>

                    </div>

                    <div className={style.updateEvent}>
                        <img src={updateEvent} alt={"updateEvent"} className={style.updateEventImage}/>
                        <button className={style.communtityButton}>Update Event</button>

                    </div>

                    <div className={style.deleteEvent}>
                        <img src={deleteEvent} alt={"deleteEvent"} className={style.deleteEventImage}/>
                        <button className={style.communtityButton}>Delete Event</button>

                    </div>

                    <div className={style.chat}>
                        <IoIosChatboxes style={{fill: "black", fontSize: "25px"}}/>
                        <button className={style.communtityButton}>Chat</button>
                    </div>

                    <div className={style.post}>
                        <MdOutlinePostAdd style={{fill: "black", fontSize: "25px"}}/>
                        <button className={style.communtityButton}>Post</button>
                    </div>

                    <div className={style.event}>
                        <img src={event} alt={"event"} className={style.eventImage}/>
                        <AllEvent/>
                    </div>
                </div>
                <ViewAllPost/>
            </div>

        </div>
    )
}
export default CommunityManagerPage