// AddMember.js
import { useState } from "react";
import styles from "./index.module.css";
import CreateProfile from "../CreateProfile"; // Import the CreateProfile component

const AddMember = ({ cohorts, updateCohorts, selectedCohort }) => {
    const [newMember, setNewMember] = useState('');
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const [currentMember, setCurrentMember] = useState('');

    const handleInputChange = (event) => {
        setNewMember(event.target.value);
    };

    const handleAddMember = () => {
        if (newMember.trim() && selectedCohort) {
            const memberName = newMember.trim();
            setCurrentMember(memberName);
            setNewMember('');
            setIsCreatingProfile(true);
        }
    };

    return (
        <div>
            {!isCreatingProfile ? (
                <>
                    <input
                        type="text"
                        value={newMember}
                        onChange={handleInputChange}
                        placeholder="Enter member name"
                        className={styles.cohortInput}
                    />
                    <button className={styles.cohortButton} onClick={handleAddMember}>
                        Add Member
                    </button>
                </>
            ) : (
                <CreateProfile
                    memberName={currentMember}
                    cohorts={cohorts}
                    updateCohorts={updateCohorts}
                    selectedCohort={selectedCohort}
                    setIsCreatingProfile={setIsCreatingProfile}
                />
            )}
        </div>
    );
};

export default AddMember;
