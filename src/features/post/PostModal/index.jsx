import { CiImageOn } from "react-icons/ci";
import style from "./index.module.css"
import {useState, useRef, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const {BACKEND_POST_BASE_URL} = require("../../../ApiUtils"); 

const PostModal = ({closeModal, openFlow}) => {
    const fileRef = useRef(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJxdWl6LWFwcGxpY2F0aW9uIiwic3ViIjoiYWNjZXNzX3Rva2VuIiwic2VuZGVyX2VtYWlsIjoiNjY1NWViOGQyZjZkNGUxMjVjZGQxOWIyIiwicmVjaXBpZW50X2VtYWlsIjoib2pvdDYzMEBnbWFpbC5jb20iLCJleHAiOjE3MTg2NzIwNjN9.xGI2fnsnGZ42OmBGxMyavESzcZbRt4x9bNWiEqAjBe4";

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
            var response = await axios.post(BACKEND_POST_BASE_URL, form_data);
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
                <form className={style.form} onSubmit={handleSubmit}>
                    <button onClick={closeModalFunc}>X</button>
                    <input
                    placeholder="What is The Gist"
                    onChange={(event) => handleInputChange(event)}
                    name="title"
                    type="text"
                    />
                    <input
                    placeholder="What is Happening"
                    onChange={handleInputChange}
                    name="body"
                    type="text"
                    />
                    <div>
                    <CiImageOn size="25px" color="#a6e1ec" onClick={handleIconClick}/>
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