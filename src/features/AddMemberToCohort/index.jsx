// import {useEffect, useState} from "react";
// import Modal from "../Modal"
// import styles from "./index.module.css"
// import {json} from "react-router-dom";
//
//
// const AddMember = () => {
//
//     const [cohorts, setCohorts] = useState([]);
//     const [selectedCohort, setSelectedCohort] = useState('');
//     const [errorData, setErrorData] = useState("");
//     const [addMemberError, setAddMemberError] = useState("");
//     const [nativeName, setNativeName] = useState('');
//     const [nativeEmail, setNativeEmail] = useState('');
//     const [forms, setForms] = useState([{name: '', email: ''}]);
//
//
//     const handleFormChange = (index, event) => {
//         const updatedForms = forms.map((form, i) =>
//             i === index ? {...form, [event.target.name]: event.target.value} : form
//         );
//         setForms(updatedForms);
//     };
//
//     const addForm = () => {
//         setForms([...forms, {name: '', email: ''}]);
//     };
//
//     const handleSubmitAllForms = async (event) => {
//         event.preventDefault();
//
//         const dataToSubmit = forms.map(form => ({
//             name: form.name,
//             email: form.email,
//             cohortId: selectedCohort
//         }));
//
//
//         const handleAddStudent = async (event) => {
//
//             event.preventDefault();
//
//             const memberData = {
//                 name: nativeName,
//                 email: nativeEmail,
//                 cohortId: selectedCohort
//             };
//             const dataToSubmit = forms.map(form => ({
//                 name: form.name,
//                 email: form.email,
//                 cohortId: selectedCohort
//             }));
//
//             try {
//                 const response = fetch("http://localhost:8080/api/v1/comunityManager/add_student", {
//                     method: "POST",
//                     headers: {
//                         "content-Type": "application/json"
//                     },
//                     body: JSON.stringify({dataToSubmit})
//                 })
//                 const data = (await response).json()
//                 if (response.ok) {
//                     setAddMemberError("")
//                     setForms([{name: '', email: ''}]);
//                     setSelectedCohort('');
//                 } else {
//                     setAddMemberError(data.err)
//                 }
//             } catch (error) {
//                 console.log("An error occurred ", error)
//                 setAddMemberError("failed to load cohorts")
//             }
//
//         }
//
//
// // useEffect(()=>{
// //     const handleGetAllCohorts= async ()=>{
// //         try {
// //             const response =  await  fetch("http://localhost:8080/ubuntu/cohort/findAllCohort",{
// //               method :"Get",
// //                headers :{
// //                "content-Type" : "application/json"
// //            }})
// //             )
// //             if(response.ok){
// //                 const data = await response.json()
// //                 setErrorData("")
// //                 setCohorts(data)
// //             }
// //             else {
// //                 const errorMessage = await response.json();
// //                 setErrorData(JSON.stringify(errorMessage))
// //                 setCohorts([])
// //             }
// //         }
// //
// //         catch
// //             (error)
// //             console.log("An error occurred ",error)
// //             setErrorData("failed to load cohorts")
// //         }
// //
// //     }
// //
// //   handleGetAllCohorts()
// //     },[])
//
//
//
//
//         const openModal = () => setShowModal(true);
//         const closeModal = () => setShowModal(false);
//
//         const handleChange = (event) => {
//             setSelectedCohort(event.target.value);
//         };
//
//         return (
//             <div className={styles.addMember}>
//                 <h1>React Modal Example</h1>
//                 <button onClick={openModal}>Open Modal</button>
//
//                 <Modal show={showModal} onClose={closeModal}>
//
//                     <p>Add Natives To Cohort</p>
//
//                     <div className={styles.inModal}>
//                         {errorData && <p className={styles.error}>{errorData}</p>}
//                         <select
//                             value={selectedCohort}
//                             onChange={handleChange}
//                             className={styles.selectTag}
//                         >
//                             <option value="" disabled>Select a cohort</option>
//
//                             {cohorts.map((cohort, index) => (
//                                 <option key={index} value={cohort.id}>{cohort.name}</option>
//                             ))}
//
//                         </select>
//
//                         <form onSubmit={handleSubmitAllForms}>
//                             {forms.map((form, index) => (
//                                 <div key={index} className={styles.formItems}>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Enter the native's name"
//                                         value={form.name}
//                                         onChange={(e) => handleFormChange(index, e)}
//                                         className={styles.inputTag}
//                                     />
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         placeholder="Enter the native's email"
//                                         value={form.email}
//                                         onChange={(e) => handleFormChange(index, e)}
//                                         className={styles.inputTag}
//                                     />
//                                 </div>
//                             ))}
//                             <button type="button" onClick={addForm} className={styles.theButton}>+</button>
//                             <button type="submit" className={styles.theButton}>Done</button>
//                         </form>
//
//                     </div>
//
//
//                 </Modal>
//             </div>
//
//         )
//
//
//     }
// }
// export default AddMember;



import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./index.module.css";
import axios from "axios";
import { BACKEND_COHORT_BASE_URL, BACKEND_COMMUNITY_MANAGER_ADD_MEMBER } from "../../ApiUtils";

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
            const response = await fetch(BACKEND_COMMUNITY_MANAGER_ADD_MEMBER, {
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
                const response = await axios.get(BACKEND_COHORT_BASE_URL+ "/findAllCohort");

                console.log(response);
                if (response.request.status === 200) {
                    const data = await response.data;
                    setErrorData("");
                    setCohorts(data.data);
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

