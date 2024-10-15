import styles from "./index.module.css"
import {useEffect, useState} from "react";
import UserProfile from '../CreateProfile'
import axios from "axios";
const {BACKEND_COHORT_BASE_URL, BACKEND_USER_BASE_URL} = require("../../ApiUtils")

const DisplayCohortAndMembers =()=>{

    const [cohorts, setCohorts] = useState({});
    const [students, setStudent] = useState([]);
    const [newCohort, setCohort] = useState();
    const [selectedUserProfile, setSelectedUserProfile] = useState(null);

    const getAllStudentsBy = async (cohortNumber) => {
        try{
            const response = await axios.get(BACKEND_USER_BASE_URL+"/cohort/"+cohortNumber);
            console.log(response);
            if(response.request.status === 200){
                setStudent([])
                setStudent(response.data);
            }else{
                setStudent([]);
            }
        }catch(error){
            console.log(error);
            setStudent([]);
        }
    }

    useEffect(() => {
        const fetchCohorts = async () => {
            try{
                const response = await axios.get(BACKEND_COHORT_BASE_URL+"/findAllCohort");
                if (response.request.status === 200){
                    console.log(response.data);
                    var cohort = await response.data;
                    setCohorts(cohort);
                }else {
                    console.log(response);
                    setCohorts([]);
                }

            }catch(error){
                console.log(error);
            }
        }
        fetchCohorts().then();

    }, []);

    const handleToggleVisibility = (cohort) => {
        if (newCohort === cohort) {
            setCohort(null);
            setStudent([]);
        } else {
            setCohort(cohort);
            getAllStudentsBy(cohorts[cohort].cohortNumber);
        }
    };

    const handleMemberClick = (cohort, member) => {
        setSelectedUserProfile(member);
    };

    return (
        <div className={styles.cohortState}>
            {Object.keys(cohorts).map(cohort => (
                <div key={cohort} className={styles.cohortList}>
                    <p onClick={() => handleToggleVisibility(cohort)} className={styles.cohortName}>
                        {cohorts[cohort].cohortName}
                    </p>
                    {newCohort === cohort && (
                        <div className={styles.memberList}>
                            {students.map((student, index) => (
                                     <p key={index}
                                     style={{ color: student.accountState === "ACTIVATED" ? "inherit" : "red" }}
                                     className={styles.memberItem}
                                     onClick={() => handleMemberClick(cohorts[cohort].cohortName, student.email)}
                                  >{student.email}</p>
                                ))}
                        </div>
                    )}
                </div>
            ))}
            {/* {selectedUserProfile && (
                <UserProfile userProfile={selectedUserProfile} />
            )} */}
        </div>
    );
};

export default DisplayCohortAndMembers;
