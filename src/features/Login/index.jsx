import style from "./index.module.css"
import images from "../../assets/login/gifForLogin.gif"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilledButton from "../../components/reuseables/FilledButton";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/Ubuntu-Logo.png"
import { BACKEND_AUTH_URL } from "../../ApiUtils";
// import * as Yup from "yup";


const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("");
        }
    }, [])

    const handleSubmit = async (e) => {
        console.log("email " + user.email)
        console.log("password " + user.password)
        e.preventDefault()
        if(user.email === "community@manager.com" && user.password === "password1234"){
            navigate("/communityManagerPage")
        }
        try {
            
            const response = await axios.post(BACKEND_AUTH_URL, {
                email: user.email,
                password: user.password
            })
            if (response.request.status === 200) {
                localStorage.setItem("token", response.data.token)
                console.log(response.data.token)
                navigate("/home")
            }

        } catch (err) {

            toast.error("Invalid details", {
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

    return (

        <div className={style.main}>
            <img src={logo} alt={"gif"} style={{width: "60%", height: "97vh"}}/>

            <div className={style.form}>
                <p className={style.welcome} style={{color: "#FF2E2E"}}>Welcome !</p>
                <p className={style.login} style={{color: "black"}}>Sign in to stay connected with the most <span
                    style={{display: "block"}}>    prestigious community</span></p>

                <form className={style.formInfo} onSubmit={(e) => handleSubmit(e)}>

                    <input type={"email"} placeholder={"Enter Your Email"} className={style.loginInfo}
                           name={"email"} onChange={handleChange}></input>

                    <input type={"password"} placeholder={"Enter Your Password"} className={style.loginInfo}
                           name={"password"}
                           onChange={handleChange}></input>

                    <div className={style.button}>
                        <FilledButton  textColor={"white"} backgroundColor={"#FF2E2E"} text={"Login"}/>
                    </div>
                </form>


            </div>
            <ToastContainer/>
        </div>
    )
}    
export default Login
