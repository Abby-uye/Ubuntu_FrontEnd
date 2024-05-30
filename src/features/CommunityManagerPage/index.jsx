import style from "./index.module.css"
import addCohort from "../../assets/communityManger/addCohortIcon1-removebg-1.png"
import addStudents from "../../assets/communityManger/addStudentIcon-removebg-preview.png"
import removeStudent from "../../assets/communityManger/removeAStudentIcon-removebg-preview.png"
import addEvent from "../../assets/communityManger/addEventIcon-removebg-preview.png"
import updateEvent from "../../assets/communityManger/updateImageIcon-removebg-preview.png"
import deleteEvent from "../../assets/communityManger/deleteEventIcon-removebg-preview.png"

import AddMemberToCohort from "../AddMemberToCohort";
import AddCohort from "../AddCohort";
import AddMember from "../AddMemberToCohort";

const CommunityManagerPage = () => {

    function changeBackgroundOnOver(e) {
        e.target.style.backgroundColor = "#007bff"
    }

    function changeBackgroundOutOver(e) {
        e.target.style.backgroundColor = "#a6e1ec"
    }


    return (
        <div className={style.main}>
            <div className={style.heading}>
                <div className={style.community}>
                    <p style={{margin: 10,fontWeight:600,fontSize:30}}>Community Manager</p>
                </div>
                <input type={"search"} placeholder={"Search"}/>
            </div>

            <div className={style.duties}>
                <div className={style.addCohort}>
                    <img src={addCohort} alt={"addcohort"} className={style.addCohortImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}*/}
                    {/*    style={{margin: 0}}>Add Cohort</h3>*/}
                    {/*<button className={style.communtityButton}> </button>*/}
                    <AddCohort/>
                </div>

                <div className={style.addStudents}>
                <img src={addStudents} alt={"addStudents"} className={style.addStudentsImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin: 0}}>Add Students</h3>*/}
                    <AddMember/>
                </div>

                <div className={style.removeStudent}>
                    <img src={removeStudent} alt={"removeStudent"} className={style.removeStudentImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}*/}
                    {/*    style={{margin: 0}}>Remove Student</h3>*/}
                    <button className={style.communtityButton}>Remove Student</button>

                </div>

                <div className={style.addEvent}>
                    <img src={addEvent} alt={"addEvent"} className={style.addEventImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}*/}
                    {/*    style={{margin: 0}}>Add Event</h3>*/}
                    <button className={style.communtityButton}>Add Student</button>

                </div>

                <div className={style.updateEvent}>
                    <img src={updateEvent} alt={"updateEvent"} className={style.updateEventImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}*/}
                    {/*    style={{margin: 0}}>Update Event</h3>*/}
                    <button className={style.communtityButton}>Update Event</button>

                </div>

                <div className={style.deleteEvent}>
                    <img src={deleteEvent} alt={"deleteEvent"} className={style.deleteEventImage}/>
                    {/*<h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}*/}
                    {/*    style={{margin: 0}}>Delete Event</h3>*/}
                    <button className={style.communtityButton}>Delete Event</button>

                </div>

            </div>

        </div>
    )
}
export default CommunityManagerPage