
import { useState } from "react";
import styles from "./index.module.css";
import initialProfilePicture from "../../assets/profile-pic-dummy-300x300.jpg"// Adjust the path accordingly

const UserProfile = ({ user, onClose, cohortName }) => {
    const [profile, setProfile] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        // Get cohorts data from local storage
        const savedCohorts = JSON.parse(localStorage.getItem('cohorts')) || {};

        // Find and update the specific member's profile within the correct cohort
        const updatedMembers = savedCohorts[cohortName].map((member) =>
            member.name === profile.name ? profile : member
        );

        // Update the cohorts object with the modified members list
        const updatedCohorts = {
            ...savedCohorts,
            [cohortName]: updatedMembers
        };

        // Save the updated cohorts data back to local storage
        localStorage.setItem('cohorts', JSON.stringify(updatedCohorts));

        alert('Profile updated successfully!');
    };

    return (
        <div className={styles.profile}>
            <button onClick={onClose} className={styles.closeButton}>Close</button>
            <div className={styles.profileHeader}>
                <img src={profile.profilePictures || initialProfilePicture} alt="Profile" />
                <div>
                    <input
                        type="text"
                        name="userName"
                        value={profile.userName}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                </div>
                <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className={styles.description}
                />
                <div className={styles.posts}>
                    {/* Render posts here */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
