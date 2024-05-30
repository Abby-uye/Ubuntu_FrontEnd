import React from 'react'
import style from "./index.module.css"
import {FaHome, FaSearch} from "react-icons/fa";
import {MdOutlinePostAdd} from "react-icons/md";
import {IoIosChatboxes, IoIosNotifications} from "react-icons/io";
import {data} from "./data"
import dummyDp from "../../assets/profile-pic-dummy-300x300-removebg-preview.png"
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import FilledButton from "../../components/reuseables/FilledButton";
import ViewAllPost from "./ViewAllPost";


const Home = () => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(e)
    };

    function changeBackgroundOnOver(e) {
        e.target.style.backgroundColor = "#007bff"
    }

    function changeBackgroundOutOver(e) {
        e.target.style.backgroundColor = "#a6e1ec"
    }

    return (
        <div className={style.mainboard}>
            <div className={style.heading}>
                <img src={dummyDp} className={style.dummyImage} alt={"dp"}/>
                <div style={{backgroundColor: "#a6e1ec", width: "100%", height: "50px"}}></div>
                <div className={style.searchMain}>
                    <FaSearch style={{fill: "#671BC7", fontSize: "15px"}}/>
                    <input type={"search"} placeholder={"Search"} className={style.search}/>
                </div>
                <IoIosNotifications style={{fill: "#671BC7", fontSize: "40px"}} className={style.notification}/>
            </div>

            <div className={style.main}>
                <div className={style.image_div}>
                    <div style={{paddingTop: "30px"}}>
                        <FaHome style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}
                            onClick={handleClick("/home")}>Home</h4>
                    </div>
                    <div>
                        <MdOutlinePostAdd style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}
                            onClick={handleClick("/post")}>Post</h4>
                    </div>

                    <div>
                        <IoIosChatboxes style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}
                            onClick={handleClick("/communityManagerPage")}>Chat</h4>
                    </div>
                    <div>
                        <MdOutlinePostAdd style={{fill: "#671BC7", fontSize: "25px"}}/>
                        <h4 onMouseOver={changeBackgroundOnOver} onMouseLeave={changeBackgroundOutOver}>Event</h4>
                    </div>
                </div>

                <div>
                    {/*{data.map(value => {*/}
                    {/*    return (*/}
                    {/*        <div key={value.title} style={{*/}
                    {/*            display: "flex",*/}
                    {/*            flexDirection: "column",*/}
                    {/*            justifyContent: "center",*/}
                    {/*            alignItems: "center"*/}
                    {/*        }}>*/}
                    {/*            <div style={{width: "45%"}}>*/}
                    {/*                <h3>{value.title}</h3>*/}
                    {/*                <p>{value.description}</p>*/}
                    {/*            </div>*/}
                    {/*            <div style={{*/}
                    {/*                display: "flex",*/}
                    {/*                justifyContent: "center",*/}
                    {/*                alignItems: "center",*/}
                    {/*                width: "65%"*/}
                    {/*            }}>*/}
                    {/*                <img style={{width: "65%"}} src={value.picture} alt={value.title}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}

                    <ViewAllPost/>
                </div>
                <FilledButton textColor={"white"} backgroundColor={"#a6e1ec"} text={"Update"}/>
            </div>
        </div>
        // return (
        //     <div>
        //         <div style={{backgroundColor: "red", width: "100%", height: "50px"}}></div>
        //         <div className={style.main}>
        //             <div className={style.image_div}>
        //                 <div style={{paddingTop: "30px"}}>
        //                     <FaHome style={{fill: "red", fontSize: "25px"}}/>
        //                     <h4>Home</h4>
        //                 </div>
        //                 <div>
        //                     <MdOutlinePostAdd style={{fill: "red", fontSize: "25px"}}/>
        //                     <h4>Post</h4>
        //                 </div>
        //                 <div>
        //                     <FaSearch style={{fill: "red", fontSize: "25px"}}/>
        //                     <h4>Search</h4>
        //                 </div>
        //                 <div>
        //                     <IoIosChatboxes style={{fill: "red", fontSize: "25px"}}/>
        //                     <Link to={"/chatConnection"}>Home</Link>
        //
        //                 </div>
        //                 <div>
        //                     <IoIosNotifications style={{fill: "red", fontSize: "25px"}}/>
        //                     <h4>Notification</h4>
        //                 </div>
        //             </div>
        //             <div>
        //                 {data.map(value => {
        //                     return (
        //                         <div key={value.title} style={{
        //                             display: "flex",
        //                             flexDirection: "column",
        //                             justifyContent: "center",
        //                             alignItems: "center"
        //                         }}>
        //                             <div style={{width: "45%"}}>
        //                                 <h3>{value.title}</h3>
        //                                 <p>{value.description}</p>
        //                             </div>
        //                             <div style={{
        //                                 display: "flex",
        //                                 justifyContent: "center",
        //                                 alignItems: "center",
        //                                 width: "65%"
        //                             }}>
        //                                 <img style={{width: "65%"}} src={value.picture} alt={value.title}/>
        //                             </div>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         </div>
        //     </div>
    );
}

export default Home