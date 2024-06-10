import React, {useEffect, useState} from "react";
import axios from "axios";
import RemoveMemberModal from "../RemoveMemberModal";
import styles from "./index.module.css";
import { BACKEND_COHORT_BASE_URL, BACKEND_USER_BASE_URL, BACKEND_COMMUNITY_MANAGER_BASE_URL } from "../../ApiUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const RemoveStudent = () => {
    const [cohorts, setCohorts] = useState([]);
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [visibleCohorts, setVisibleCohorts] = useState({});
    const [removeUserResponse, setRemoveUserResponse] = useState("");
    const [removeUserError, setRemoveUserError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newCohort, setNewCohort] = useState("")


    useEffect(() => {
        const handleGetAllCohort = async () => {
            try {
                const response = await axios.get(`${BACKEND_COHORT_BASE_URL}/findAllCohort`);
                if (response.status === 200) {
                    setCohorts(response.data);
                } else {
                    setCohorts([]);
                }
            } catch (error) {
                setErrorMessage("Error while fetching data: " + error);
            }
        };
        handleGetAllCohort()
    }, []);


    const getAllStudentsBy = async (cohortNumber) => {
        try {
            const response = await axios.get(`${BACKEND_USER_BASE_URL}/cohort/${cohortNumber}`);
           console.log(response.data)
            if (response.status === 200) {
                setStudents(response.data);
                console.log(response.data);
            } else {
                setStudents([]);
            }
        } catch (error) {
            setStudents([]);
        }
    };

    const handleToggleVisibility = (cohort) => {

        if (newCohort === cohort){
            setNewCohort(null)
            setStudents([])
        }else {
            setNewCohort(cohort)
            getAllStudentsBy(cohorts[cohort].cohortNumber)
        }
        setVisibleCohorts(prevState => ({
            ...prevState, [cohort]: !prevState[cohort]
        }));
        getAllStudentsBy(cohorts[cohort].cohortNumber);

    };
    const openModal = () => {
        setShowModal(true);

    }
    const closeModal = () =>{
        setShowModal(false);
    }
    const handleRemoveStudent = async (userId) => {
        try {
            const response = await axios.delete(`${BACKEND_COMMUNITY_MANAGER_BASE_URL}/remove_student`, {
                data: userId
            });
            if (response.status === 200) {
                setRemoveUserResponse(response.data);
                setRemoveUserError("");
                let studentOverall = students.filter((student) => student.id !== userId)
                setStudents(studentOverall);
            } else {
                setRemoveUserResponse("");
                setRemoveUserError(response.data);
            }
        } catch (error) {
            setRemoveUserError(error);
        }
    };

    const confirmRemoveStudent = (userId) => {
        console.log(userId)
        if (window.confirm('Are you sure you want to remove this member?')) {
            handleRemoveStudent(userId);
        }
    };

    return (
        <div>
        <button onClick={openModal} className={styles.communtityButton}>Remove Student</button>
        <RemoveMemberModal show={showModal} onClose={closeModal}>


        <div className={styles.getAllCohort}>
                    {Object.keys(cohorts).map((cohort, index) => (
                        <div key={index} className={styles.cohortList}>
                            <p
                                onClick={() => handleToggleVisibility(cohort)}
                                className={styles.cohortName}
                            >
                                {cohorts[cohort].cohortName}
                            </p>
                            {newCohort === cohort && (
                                <div className={styles.memberList}>
                                    {students.map((student, index) => (
                                        <div className={styles.remove}>
                                        <p
                                            className={styles.memberItem}
                                            key={index}
                                        >
                                            {student.email}
                                        </p>
                                            <FontAwesomeIcon icon={faTimes} onClick={() => confirmRemoveStudent(student.id)}/>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </RemoveMemberModal>
        </div>
    );
};

export default RemoveStudent;
