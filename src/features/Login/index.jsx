import style from "./index.module.css"
import images from "../../asset/login/ourCommunity.jpg"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilledButton from "../../components/reuseables/FilledButton";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import * as Yup from "yup";



const Login = () => {
    const navigate = useNavigate()
    // const validationSchema = Yup.object().shape({
    //     email: Yup.string()
    //         .email('Invalid email address')
    //         .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must be a valid email Address')
    //         .required('Email Address is required'),
    // });
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


    const handleSubmit = async (e) => {
        console.log("email " + user.email)
        console.log("password " + user.password)
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/ubuntu/user/auth', {
                email: user.email,
                password: user.password
            })
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate("/home")
            }

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

    return (
        <div className={style.main}>
            <img src={images} alt={"login"} width={""} height={""}/>

            <div className={style.form}>

                <p className={style.welcome}>Welcome !</p>
                <p className={style.login}>Sign in to stay connected with the most prestigious community</p>
                <form className={style.formInfo} onSubmit={(e) => handleSubmit(e)}>
                    <input type={"email"} placeholder={"Email:"} className={style.loginInfo}
                           name={"email"} onChange={handleChange}></input>
                    <input type={"password"} placeholder={"Password:"} className={style.loginInfo} name={"password"}
                           onChange={handleChange}></input>
                    <div className={style.button}>
                        <FilledButton textColor={"white"} backgroundColor={"peachpuff"} text={"Login"}/>
                    </div>
                </form>


            </div>
            <ToastContainer/>
        </div>
    )

}

export default Login