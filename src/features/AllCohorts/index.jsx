import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import style from "./index.module.css"
import DisplayCohortAndMembers from "../DisplayCohortAndMembers";
import Cohort from "../Cohort";
const AllCohorts = ()=>{
const [isOpen,setIsOpen] = useState(false);
const  toggleIsOpen = ()=>{
setIsOpen(!isOpen);
};
    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload(); // Reload the page to reflect the changes
    };
return (

    <div>

        {/*<div className={style.appContainer}>*/}
        {/*    <button onClick={clearLocalStorage} className={style.clearButton}>*/}
        {/*        Clear Local Storage*/}
        {/*    </button>*/}
        {/*    <Cohort setCohorts={() => {*/}
        {/*    }}/>*/}
        {/*</div>*/}
        {
            isOpen ? (
                <FontAwesomeIcon icon={faTimes} onClick={toggleIsOpen} className={style.faTimes}/>
            ) : (
                <FontAwesomeIcon icon={faBars} onClick={toggleIsOpen} className={style.faBars}/>
            )
        }

        <div className={`${style.menu} ${isOpen ? style.active : ''}`}>
            <DisplayCohortAndMembers/>
        </div>
    </div>
)
}

export default AllCohorts