import style from "./index.module.css"
import addCohort from "../../asset/communityManger/addCohortIcon1-removebg-1.png"
import addStudents from "../../asset/communityManger/addStudentIcon-removebg-preview.png"
import removeStudent from "../../asset/communityManger/removeAStudentIcon-removebg-preview.png"
import addEvent from "../../asset/communityManger/addEventIcon-removebg-preview.png"
import updateEvent from "../../asset/communityManger/updateImageIcon-removebg-preview.png"
import deleteEvent from "../../asset/communityManger/deleteEventIcon-removebg-preview.png"

const CommunityManagerPage = () => {
    function changeBackgroundOnOver  (e){
            e.target.style.backgroundColor = "#007bff"
    }
    function changeBackgroundOutOver  (e){
            e.target.style.backgroundColor = "#a6e1ec"
    }
    return (
        <div className={style.main}>
            <div className={style.heading}>
                <div className={style.community}>
                    <p style={{margin: 10}}>Community Manager</p>
                </div>
                <input  type={"search"} placeholder={"Search"}/>
            </div>

            <div className={style.duties}>
                <div className={style.addCohort}>
                    <img src={addCohort} alt={"addcohort"} className={style.addCohortImage}/>
                    <h3  onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin:0}}>Add  Cohort</h3>
                </div>
                <div className={style.addStudents}>
                    <img src={addStudents} alt={"addStudents"} className={style.addStudentsImage}/>
                    <h3  onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin:0}}>Add  Students</h3>
                </div>

                <div className={style.removeStudent}>
                    <img src={removeStudent} alt={"removeStudent"} className={style.removeStudentImage}/>
                    <h3  onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin:0}}>Remove  Student</h3>
                </div>

                <div className={style.addEvent}>
                    <img src={addEvent} alt={"addEvent"} className={style.addEventImage}/>
                    <h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}  style={{margin:0}}>Add  Event</h3>
                </div>

                <div className={style.updateEvent}>
                    <img src={updateEvent} alt={"updateEvent"} className={style.updateEventImage}/>
                    <h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin:0}}>Update  Event</h3>
                </div>

                <div className={style.deleteEvent}>
                    <img src={deleteEvent} alt={"deleteEvent"} className={style.deleteEventImage}/>
                    <h3 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver} style={{margin:0}}>Delete  Event</h3>
                </div>

            </div>

        </div>
    )
}
export default CommunityManagerPage