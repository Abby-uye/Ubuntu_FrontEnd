import style from "./index.module.css"
import {FaHome, FaSearch} from "react-icons/fa";
import {MdOutlinePostAdd} from "react-icons/md";
import {IoIosChatboxes, IoIosNotifications} from "react-icons/io";
import {data} from "./data"
import { useEffect, useState } from "react";
import PostModal from "../post/PostModal";
import {Link, useNavigate} from "react-router-dom";
import FilledButton from "../../components/reuseables/FilledButton";


const Home = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("token") === null){
            navigate("/login")
        }
    }, []);


    const openModalFunction = () => {
        setOpenModal(true)
        hidOverFlow()
    }

    const hidOverFlow = () => {document.body.style.overflow = "hidden";}

    const openOverFlow = () => {document.body.style.overflow = "";}

    function changeBackgroundOnOver  (e){
        e.target.style.backgroundColor = "#007bff"
    }

    function changeBackgroundOutOver(e) {e.target.style.backgroundColor = "#a6e1ec"}

    return (
        <div className={style.mainboard}>
            <div className={style.heading}>
                <div style={{backgroundColor: "#a6e1ec", width: "100%", height: "50px"}}></div>
                <div className={style.searchMain}>
                    <FaSearch style={{fill: "#671BC7", fontSize: "15px"}}/>
                    <input type={"search"}  placeholder={"Search"} className={style.search}/>
                </div>
                <IoIosNotifications style={{fill: "#671BC7", fontSize: "40px"}} className={style.notification}/>
            </div>

            <div className={style.main}>
                <div className={style.image_div}>
                    <div style={{paddingTop: "30px"}}>
                        <FaHome style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseEnter={openModalFunction} onMouseOver={changeBackgroundOnOver}
                         onMouseLeave={changeBackgroundOutOver}>Home</h4>
                        {openModal && <PostModal closeModal={setOpenModal} openFlow={openOverFlow}/>}
                    </div>
                    <div>
                        <MdOutlinePostAdd style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}>Post</h4>
                    </div>

                    <div>
                        <IoIosChatboxes style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <Link to={"/chatConnection"} className={style.chatLink} onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}>Chat</Link>
                    </div>
                    <div>
                        <MdOutlinePostAdd style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}>Event</h4>
                    </div>
                </div>
                <div>
                    {data.map(value => {
                        return (
                            <div key={value.title} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div style={{width: "45%"}}>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "65%"
                                }}>
                                    <img style={{width: "65%"}} src={value.picture} alt={value.title}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <FilledButton textColor={"#671BC7"} backgroundColor={"#a6e1ec"} text={"+Update"}/>

            </div>
        </div>
    );
}

export default Home