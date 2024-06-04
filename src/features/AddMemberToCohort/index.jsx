import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./index.module.css";
import axios from "axios";

const AddMember = () => {
     const [cohorts, setCohorts] = useState([]);
    const [selectedCohort, setSelectedCohort] = useState('');
    const [errorData, setErrorData] = useState("");
    const [addMemberError, setAddMemberError] = useState("");
    const [forms, setForms] = useState([{ name: '', email: '' }]);
    const [showModal, setShowModal] = useState(false);

    const handleFormChange = (index, event) => {
        const updatedForms = forms.map((form, i) =>
            i === index ? { ...form, [event.target.name]: event.target.value } : form
        );
        setForms(updatedForms);
    };

    const addForm = () => {
        setForms([...forms, { name: '', email: '' }]);
    };



    const handleSubmitAllForms = async (event) => {
        event.preventDefault();

        const isEmptyForm = forms.some(form => form.name.trim() === '' || form.email.trim() === '');
        if (isEmptyForm) {
            setAddMemberError("Please fill out all fields in the form.");
            return;
        }


        const dataToSubmit = forms.map(form => ({
            fullName: form.name,
            email: form.email,
        }));

        const payload = {
            members: dataToSubmit,
            cohortNumber: selectedCohort,
        }
        console.log(dataToSubmit)
        console.log(payload)

        try {
            const response = await fetch("http://localhost:8080/api/v1/community_manager/add_student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                console.log(response)
                setAddMemberError("");
                setForms([{ name: '', email: '' }]);
                setSelectedCohort('');
            } else {
                setAddMemberError(data.err || "Failed to add members");
            }
        } catch (error) {
            console.log("An error occurred", error);
            setAddMemberError("Failed to add members");
        }
    };

    useEffect(() => {
        const handleGetAllCohorts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/cohort/findAllCohort");

                console.log(response);
                if (response.request.status === 200) {
                    const data = await response.data;
                    setErrorData("");
                    setCohorts(data);
                    console.log(cohorts);
                } else {
                    const errorMessage = await response();
                    setErrorData(JSON.stringify(errorMessage));
                    setCohorts([]);
                }
            } catch (error) {
                console.log("An error occurred", error);
                setErrorData("Failed to load cohorts");
            }
        };

        handleGetAllCohorts();
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () =>{
        setAddMemberError('');
        setShowModal(false);
        setForms([{ name: '', email: '' }]);
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedCohort(event.target.value);
    };
    console.log(cohorts)

    return (
        <div className={styles.addMember}>
            <button onClick={openModal} className={styles.communtityButton}>Add students</button>
            <Modal show={showModal} onClose={closeModal}>
                <p className={styles.addNative}>Add Natives To Cohort</p>

                <div className={styles.inModal}>
                    {errorData && <p className={styles.error}>{errorData}</p>}
                    <select
                        value={selectedCohort}
                        onChange={handleChange}
                        className={styles.selectTag}
                    >{cohorts.map((cohort, index) => (
                        <option key={index} value={cohort.cohortNumber}>{cohort.cohortName}</option>
                    ))}
                    </select>

                    <div className={styles.theForm}>
                    <form onSubmit={handleSubmitAllForms}>
                        {forms.map((form, index) => (
                            <div key={index} className={styles.formItems}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter the native's name"
                                    value={form.name}
                                    onChange={(e) => handleFormChange(index, e)}
                                    className={styles.inputTag}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter the native's email"
                                    value={form.email}
                                    onChange={(e) => handleFormChange(index, e)}
                                    className={styles.inputTag}
                                />
                            </div>
                        ))}
                        <div className={styles.btns}>
                        <button type="button" onClick={addForm} className={styles.theButton}>+</button>
                        <button type="submit" className={styles.theButton}>Done</button>
                        </div>
                        </form>
                    </div>
                    {addMemberError && <p className={styles.error}>{addMemberError}</p>}
                </div>
            </Modal>
        </div>
    );
};

export default AddMember;

