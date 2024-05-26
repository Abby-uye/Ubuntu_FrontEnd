import {useState} from "react";
import styles from "./index.module.css"
import AllCohorts from "../AllCohorts";

const RecentlyChattedUser =()=>{
    // const [users,setUsers] = useState([]);
    // setUsers(["Abby","john","sam"])
    return(

        <div className={styles.chatCont}>
            <AllCohorts/>
            <div className={styles.recentlyChattedUser}>
            <p>Abby</p>
            <p>Uye</p>
            </div>
        </div>
    )
}
export default RecentlyChattedUser