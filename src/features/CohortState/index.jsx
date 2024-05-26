import styles from "./index.module.css"
import Cohort from "../Cohort";
import {useState} from "react";

const CohortState = ()=>{
    const [cohorts, setCohorts] = useState({});
    const [visibleCohorts, setVisibleCohorts] = useState({});

    const handleToggleVisibility = (cohort) => {
        setVisibleCohorts(prevState => ({
            ...prevState,
            [cohort]: !prevState[cohort],
        }));
    };

    return (
        <div className={styles.cohortState}>
            <Cohort
                cohorts={cohorts}
                setCohorts={setCohorts}
                visibleCohorts={visibleCohorts}
                setVisibleCohorts={setVisibleCohorts}
            />

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

export default CohortState;
