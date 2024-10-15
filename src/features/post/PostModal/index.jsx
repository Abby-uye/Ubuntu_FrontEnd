import { CiImageOn } from "react-icons/ci";
import style from "./index.module.css"
import {useState, useRef, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {BACKEND_POST_BASE_URL} from "../../../ApiUtils";


const PostModal = ({closeModal, openFlow}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    const fileRef = useRef(null);
    const [postRequest, setPostRequest] = useState({title: "", body: ""});
    const [file, setFile] = useState();
    const [userId, setUserId] = useState();

    function handleInputChange(event){
        setPostRequest(prevRequest => ({...prevRequest, [event.target.name]: event.target.value}))
    }

    function closeModalFunc(){
        closeModal(false);
        openFlow();
    }

    function handleFileChange(event){
        setFile(event.target.files[0]);
    }
    
    useEffect(() => {
        
        if(token === null){
            navigate("/login");
        }

        try {
            const decoded = jwtDecode(token);
            setUserId(decoded.sender_email);
        } catch (error) {
            console.error('Invalid token:', error);
        }
        }, [])

        async function handleSubmit(event){
            event.preventDefault();
            const form_data = new FormData();
            form_data.append("title", postRequest.title);
            form_data.append("body", postRequest.body);
            form_data.append("image", file);
            form_data.append("userId", userId);
        try{
            var response = await axios.post(BACKEND_POST_BASE_URL + "/create_post", form_data);
        if (response.status === 201){
                alert("Post created successfully with id of "+ response.data.id)
        }else {
                alert(response.data.message);
        }
        }catch(error){
            console.log(error);
        }
        setPostRequest({})
        setFile("");
    }

        function handleIconClick(){
            fileRef.current.click();
        }

return(
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <
                    form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.faTimes}>
                    <FontAwesomeIcon  onClick={closeModalFunc} icon={faTimes}/>
                    </div>
                    <input
                    required
                    placeholder="What is The Gist"
                    onChange={(event) => handleInputChange(event)}
                    name="title"
                    type="text"
                    />
                    <textarea
                    placeholder="What is Happening"
                    onChange={handleInputChange}
                    name="body"
                    className={style.textArea}
                    />
                    <div>
                    <CiImageOn size="30px" color="black" onClick={handleIconClick}/>
                    <input
                    type="file"
                    name="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                    style={{ display: "none"}}
                    />
                    <button type="submit">Post</button>
                    </div>
            </form>
        </div>
 </div>
    )
}


export default PostModal
