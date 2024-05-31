
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import AddMember from "../AddMemberToCohort"; // Import the AddMember component
import UserProfile from "../CreateProfile"; // Import the UserProfile component

const Cohort = ({ setCohorts }) => {
    const [newCohortName, setNewCohortName] = useState('');
    const [selectedCohort, setSelectedCohort] = useState('');
    const [cohorts, updateCohorts] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [newCohortNumber, setNewCohortNumber] = useState("")

    useEffect(() => {
        const savedCohorts = JSON.parse(localStorage.getItem('cohorts')) || {};
        updateCohorts(savedCohorts);
        setCohorts(savedCohorts);
    }, [setCohorts]);

    const handleNewNameCohortChange = (event) => {
        setNewCohortNumber(event.target.value);
    };

    const handleNewNumberCohortChange = (event) => {
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

    const handleMemberClick = (member) => {
        setSelectedUser(member);
    };

    const handleCloseProfile = () => {
        setSelectedUser(null);
    };

    return (
        <div className={styles.cohortContainer}>
            {!selectedCohort && (
                <>
                    <input
                        type="text"
                        value={newCohortName}
                        onChange={handleNewNameCohortChange}
                        placeholder="Enter new cohort name"
                        className={styles.cohortInput}
                    />
                    <input
                        type="text"
                        value={newCohortNumber}
                        onChange={handleNewNumberCohortChange}
                        placeholder="Enter new cohort number"
                        className={styles.cohortInput}
                    />
                    <button onClick={handleCreateCohort} className={styles.cohortButton}>
                        Create Cohort
                    </button>
                </>
            )}

            <br/><br/>

            <div>
                <select onChange={(e) => setSelectedCohort(e.target.value)} disabled={!!selectedCohort}>
                    <option value="">Select Cohort</option>
                    {Object.keys(cohorts).map((cohort) => (
                        <option key={cohort} value={cohort}>
                            {cohort}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCohort && (
                <div>
                    <h3>{selectedCohort}</h3> {/* Display the cohort name as static text */}
                    <ul className={styles.membersList}>
                        {cohorts[selectedCohort].map((member, index) => (
                            <li
                                className={styles.memberItem}
                                key={index}
                                onClick={() => handleMemberClick(member)}
                            >
                                {member.name}
                            </li>
                        ))}
                    </ul>
                    <AddMember
                        cohorts={cohorts}
                        updateCohorts={updateCohorts}
                        selectedCohort={selectedCohort}
                    />
                </div>
            )}
            {selectedUser && (
                <UserProfile user={selectedUser} onClose={handleCloseProfile} cohortName={selectedCohort} />
            )}
        </div>
    );
};

export default Cohort;
