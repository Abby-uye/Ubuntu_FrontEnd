import React, { useState, useEffect } from 'react';
// import ChatHistory from '../ChatHistory';
import styles from './index.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const { BACKEND_MESSAGE_BASE_URL } = require("../../ApiUtils")


const RecentlyChattedUsers = ({ selectedUser }) => {
    const nav = useNavigate()
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");


    useEffect(() => {

        const fetchData = async () => {
            var token = localStorage.getItem("token");
            if(!token) nav("/login");
            
            const decodeToken = jwtDecode(token);

            token = decodeToken.recipient_email;

            console.log(decodeToken);

            setUserId(token);

            console.log(decodeToken.recipient_email);

            console.log(userId);

            try{
               const response =  await axios.get(BACKEND_MESSAGE_BASE_URL+"/getAllRecipient/"+token)
                setUsers(response.data);
            }catch(error){
                console.log(error)
            }
        }
        fetchData();
    }, []);

    const handleClick = (event) => {
        const email = event.target.innerText;
        selectedUser(email);
    }

    
    return (
        <div className={styles.chatContainer}>
            <h2>Recently Chatted Users</h2>
            <ul className={styles.userList}>
                {users.map((user, index) => (
                    <li key={index}>
                        <a href={user.link} onClick={(href) => handleClick(href)}>{user.recipientEmail}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentlyChattedUsers;
