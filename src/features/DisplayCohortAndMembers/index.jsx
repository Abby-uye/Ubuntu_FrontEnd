import styles from "./index.module.css"
import {useEffect, useState} from "react";
import Cohort from "../Cohort";
const DisplayCohortAndMembers =()=>{
    const [cohorts, setCohorts] = useState({});
    const [visibleCohorts, setVisibleCohorts] = useState({});

    useEffect(() => {
        const savedCohorts = JSON.parse(localStorage.getItem('cohorts')) || {};
        setCohorts(savedCohorts);
    }, []);
    const handleToggleVisibility = (cohort) => {
        setVisibleCohorts(prevState => ({
            ...prevState,
            [cohort]: !prevState[cohort],
        }));
    };

    return (
        <div className={styles.cohortState}>
            {Object.keys(cohorts).map(cohort => (
                <div key={cohort} className={styles.cohortList}>
                    <p onClick={() => handleToggleVisibility(cohort)} className={styles.cohortName}>
                        {cohort}
                    </p>
                    {visibleCohorts[cohort] && (
                        <div className={styles.memberList}>
                            {cohorts[cohort].map((member, index) => (
                                <p key={index} className={styles.memberItem}>{member}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DisplayCohortAndMembers;
