import React from 'react'
import style from "./index.module.css"
import {FaHome, FaSearch} from "react-icons/fa";
import {MdOutlinePostAdd} from "react-icons/md";
import {IoIosChatboxes, IoIosNotifications} from "react-icons/io";
import { useEffect, useState } from "react";
import PostModal from "../post/PostModal";
import profileImage from "../../assets/images/profile.svg"
import {useNavigate} from "react-router-dom";
import ViewAllPost from "../ViewAllPost";
import logo from "../../assets/community.jpeg"
import { jwtDecode } from 'jwt-decode';


const Home = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [userMail, setUserMail] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token === null){
            navigate("/login");
        }else {
            const decodedToken = jwtDecode(token);
            console.log("Token is ", decodedToken);
            setUserMail(decodedToken.recipient_email);
        }
    }, []);




    const openModalFunction = () => {
        setOpenModal(true);
        hidOverFlow();
    };

    const hidOverFlow = () => {document.body.style.overflow = "hidden";}

    const openOverFlow = () => {document.body.style.overflow = "";}


    const handleClick = (e) => {
        navigate(e)
    };

    const modalFunc = (e) => {
        changeBackgroundOnOver(e);
        setOpenModal(true);
    }

    function changeBackgroundOnOver(e) {
        e.target.style.backgroundColor = "#007bff";
    }


    return (
        <div className={style.mainboard}>
            <div className={style.heading}>
                <div className={style.ourLogo}>
                    {/* <img src={logo} alt={"Logo"} className={style.logo}/> */}
                    <p className={style.ubuntu}>Ubuntu</p>
                </div>
                <div className={style.searchMain}>
                    <input type={"search"} placeholder={"Search"} className={style.search}/>
                </div>
                <div>
                    <IoIosNotifications style={{fill: "black", fontSize: "40px"}}/>
                </div>
                <div className={style.profile}>
                    <p className={style.profileP}>{userMail}</p>
                    <img src={profileImage} className={style.dummyImage} alt={"dp"}/>
                </div>
            </div>

            <div className={style.main}>
                <div className={style.image_div}>
                    <div style={{paddingTop: "30px", cursor: 'pointer'}}>
                        <FaHome style={{fill: "black", fontSize: "25px"}}/>
                        <h4  className={style.btnText}
                            onClick={() => handleClick("")}>Home</h4>
                    </div>

                    <div style={{cursor:'pointer'}}>
                        <MdOutlinePostAdd style={{fill: "black", fontSize: "25px"}}/>
                        <h4  className={style.btnText}
                            onClick={(event) => modalFunc(event)}>Post</h4>
                            {openModal && <PostModal closeModal={setOpenModal} openFlow={openOverFlow}/>}
                    </div>

                    <div style={{cursor:'pointer'}}>
                        <IoIosChatboxes style={{fill: "black", fontSize: "25px"}}/>
                        <h4  className={style.btnText}
                            onClick={() => handleClick("/chat")}>Chat</h4>
                    </div>

                    <div style={{cursor:'pointer'}}>
                        <MdOutlinePostAdd style={{fill: "black", fontSize: "25px"}}/>
                        <h4 className={style.btnText} >Event</h4>
                    </div>
                    <div style={{cursor:'pointer'}}>
                        <MdOutlinePostAdd style={{fill: "black", fontSize: "25px"}}/>
                        <h4 className={style.btnText} onClick={()=>handleClick("/questionsHall")}>Q and A Hall</h4>
                    </div>
                </div>

                <div className={style.viewAllPost}>
                <div>
                    <ViewAllPost/>
                </div>
            </div>
            </div>
        </div>

    );
}

export default Home