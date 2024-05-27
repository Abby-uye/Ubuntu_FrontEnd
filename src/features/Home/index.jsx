import style from "./index.module.css"
import {FaHome, FaSearch} from "react-icons/fa";
import {MdOutlinePostAdd} from "react-icons/md";
import {IoIosChatboxes, IoIosNotifications} from "react-icons/io";
import {data} from "./data"


const Home = () => {

    return (
        <div>
            <div style={{backgroundColor: "red", width: "100%", height: "50px"}}></div>
            <div className={style.main}>
                <div className={style.image_div}>
                    <div style={{paddingTop:"30px"}}>
                        <FaHome style={{fill: "red", fontSize: "25px"}}/>
                        <h4>Home</h4>
                    </div>
                    <div>
                        <MdOutlinePostAdd style={{fill: "red", fontSize: "25px"}}/>
                        <h4>Post</h4>
                    </div>
                    <div>
                        <FaSearch style={{fill: "red", fontSize: "25px"}}/>
                        <h4>Search</h4>
                    </div>
                    <div>
                        <IoIosChatboxes style={{fill: "red", fontSize: "25px"}}/>
                        <h4>Chat</h4>
                    </div>
                    <div>
                        <IoIosNotifications style={{fill: "red", fontSize: "25px"}}/>
                        <h4>Notification</h4>
                    </div>
                </div>
                <div>
                    {data.map(value => {
                        return (
                            <div key={value.title} style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                <div style={{width: "45%"}}>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center", width: "65%"}}>
                                    <img  style={{width: "65%"}} src={value.picture} alt={value.title}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home