
import React, { useState, useEffect } from 'react';
import ChatHistory from '../ChatHistory';
import styles from './index.module.css';

const RecentlyChattedUsers = ({ selectedUserProp }) => {
    const [users, setUsers] = useState([]);
    const [chatHistory, setChatHistory] = useState({});
    const [selectedUser, setSelectedUser] = useState(selectedUserProp);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('recentUsers')) || [];
        const storedChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
        setUsers(storedUsers);
        setChatHistory(storedChatHistory);
    }, []);

    useEffect(() => {
        if (selectedUserProp) {
            setSelectedUser(selectedUserProp);
        }
    }, [selectedUserProp]);

    const saveUsers = (users) => {
        localStorage.setItem('recentUsers', JSON.stringify(users));
    };

    const saveChatHistory = (chatHistory) => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    };

    const handleSendMessage = (name) => {
        const newUser = { name, link: `#${name.toLowerCase()}` };

        if (!chatHistory[name]) {
            setChatHistory((prevHistory) => {
                const updatedHistory = {
                    ...prevHistory,
                    [name]: [{ sender: 'System', text: `Sent a new message to ${name}`, timestamp: new Date().toISOString(), type: 'system' }]
                };
                saveChatHistory(updatedHistory);
                return updatedHistory;
            });
        } else {
            setSelectedUser(name);
        }

        const updatedUsers = [newUser, ...users.filter(user => user.name !== name)];
        if (updatedUsers.length > 5) {
            updatedUsers.pop();
        }
        setUsers(updatedUsers);
        saveUsers(updatedUsers);
    };

    const handleSendMessageToSelectedUser = () => {
        if (!selectedUser || !newMessage.trim()) return;

        setChatHistory((prevHistory) => {
            const updatedHistory = {
                ...prevHistory,
                [selectedUser]: [...prevHistory[selectedUser], { sender: 'You', text: newMessage.trim(), timestamp: new Date().toISOString(), type: 'sent' }]
            };
            saveChatHistory(updatedHistory);
            return updatedHistory;
        });
        setNewMessage('');
    };

    return (
        <div className={styles.chatContainer}>
            <h2>Recently Chatted Users</h2>
            <ul className={styles.userList}>
                {users.map((user, index) => (
                    <li key={index}>
                        <a href={user.link} onClick={() => handleSendMessage(user.name)}>{user.name}</a>
                    </li>
                ))}
            </ul>
            <div className={styles.chatArea}>
                {selectedUser && (
                    <>
                        <h3>Chat History with {selectedUser}</h3>
                        <ChatHistory messages={chatHistory[selectedUser]} />
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message"
                            className={styles.messageInput}
                        />
                        <button onClick={handleSendMessageToSelectedUser} className={styles.sendButton}>Send</button>
                    </>
                )}
            </div>

        </div>
    );
};

export default RecentlyChattedUsers;
