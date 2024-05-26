import styles from "./index.module.css"
import {useEffect, useState} from "react";
const Cohort = ({ setCohorts})=>{

    const [newCohortName, setNewCohortName] = useState('');
    const [newMember, setNewMember] = useState('');
    const [selectedCohort, setSelectedCohort] = useState('');
    const [cohorts, updateCohorts] = useState({});


    useEffect(() => {
        const savedCohorts = JSON.parse(localStorage.getItem('cohorts')) || {};
        updateCohorts(savedCohorts);
        setCohorts(savedCohorts);
    }, [setCohorts]);
    const handleInputChange = (event) => {
        setNewMember(event.target.value);
    };


    const handleAddMember = () => {
        if (newMember.trim() && selectedCohort) {
            const updatedCohorts = {
                ...cohorts,
                [selectedCohort]: [...cohorts[selectedCohort], newMember.trim()],
            };
            updateCohorts(updatedCohorts);
            setCohorts(updatedCohorts);
            localStorage.setItem('cohorts', JSON.stringify(updatedCohorts));
            setNewMember('');
        }
    };

    const handleNewCohortChange = (event) => {
        setNewCohortName(event.target.value);
    };


    const handleCreateCohort = () => {
        if (newCohortName.trim() && !cohorts[newCohortName.trim()]) {
            const cohortName = newCohortName.trim();
            const updatedCohorts = {
                ...cohorts,
                [cohortName]: [],
            };
            updateCohorts(updatedCohorts);
            setCohorts(updatedCohorts);
            localStorage.setItem('cohorts', JSON.stringify(updatedCohorts));
            setNewCohortName('');
            setSelectedCohort(cohortName);
        }
    };



    return (
        <div className={styles.cohortContainer}>
            <input
                type="text"
                value={newCohortName}
                onChange={handleNewCohortChange}
                placeholder="Enter new cohort name"
                className="cohortInput"
            />
            <button onClick={handleCreateCohort}  className={styles.cohortButton}>Create Cohort</button>

            <br /><br />

            <input
                type="text"
                value={newMember}
                onChange={handleInputChange}
                placeholder="Enter member name"
                className={styles.cohortInput}
            />
            <select value={selectedCohort} onChange={(e) => setSelectedCohort(e.target.value)}
                    className={styles.cohortSelect}
            >
                <option value="">Select a cohort</option>
                {Object.keys(cohorts).map(cohort => (
                    <option key={cohort} value={cohort}>
                        {cohort}
                    </option>
                ))}
            </select>
            <button onClick={handleAddMember} className={styles.cohortButton}>Add Member</button>
        </div>
    );
};

export default Cohort
