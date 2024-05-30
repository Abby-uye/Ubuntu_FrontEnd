import style from "./Index.module.css"
import FilledButton from "../../components/reuseables/FilledButton";
import React, {useEffect} from 'react';
import {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import Modal from "../Modal"


const AddCohort = () => {

    const [showModal, setShowModal] = useState(false);
    const [cohorts, setCohorts] = useState([{
        cohortNumber: "",
        cohortName: ""
    }])


    function handleChange(e) {
        const {name, value} = e.target
        setCohorts({
            ...cohorts,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/ubuntu/cohort/createCohort', {
                cohortNumber: cohorts.cohortNumber,
                cohortName: cohorts.cohortName
            })
            if (response.request.status === 200) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            window.location.reload(false);
        } catch (err) {
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }


    }

    useEffect(() => {
        const handleGetAllCohorts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/ubuntu/cohort/findAllCohort");
                console.log("i got here1")
                console.log(response);
                if (response.request.status === 200) {
                    console.log("i got here2")

                    const data = await response.data;
                    console.log("data" + data)
                    setCohorts(data)
                    console.log(cohorts);
                } else {
                    const errorMessage = await response();
                    console.log(errorMessage)
                    setCohorts([]);
                }
            } catch (error) {

                console.log("An error occurred", error);
            }
        };
        handleGetAllCohorts();
    }, []);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // setAddMemberError('');
        setShowModal(false);
        // setForms([{name: '', email: ''}]);
    }


    return (

        <div className={style.main}>
            <button onClick={openModal}>Add Cohort</button>
            <Modal show={showModal} onClose={closeModal}>
                <h3 className={style.heading}>COHORT</h3>
                <div className={style.minimain}>
                    <p>Cohort Name</p>
                    <p>Cohort Number</p>
                </div>
                <div>
                    <ul className={style.map}>
                        {(Array.isArray(cohorts) ? cohorts : []).map((cohort, index) => (
                            <div className={style.cohortdetails}>
                                <p key={index}>
                                    {cohort.cohortNumber}
                                </p>
                                <p key={index}>
                                    {cohort.cohortName}
                                </p>
                            </div>


                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className={style.formInfo}>
                        <input
                            type="number"
                            name={"cohortName"}
                            onChange={handleChange}
                            placeholder="Enter new cohort number"

                        />
                        <input
                            type="text"
                            name={"cohortNumber"}
                            onChange={handleChange}
                            placeholder="Enter new cohort name"
                        />
                        <FilledButton textColor={"white"} backgroundColor={"#671BC7"} text={"Add"}/>
                    </form>
                </div>
            </Modal>
        </div>

    )
};

export default AddCohort