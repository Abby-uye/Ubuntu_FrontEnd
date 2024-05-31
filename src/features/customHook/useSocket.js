import { useEffect, useState, useCallback } from "react"
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../../ApiUtils";

export const useSocket = (room, username) =>  {
    const [socket, setSocket] = useState(null);
    
    const [socketResponse, setSocketResponse] = useState({
        room: "",
        content: "",
        username: "",
    });

    const [isConnected, setConnected] = useState(false);

    const sendData = useCallback(
        (payload) => {
            if(socket){
          socket.emit("send_message", {
            room: room,
            content: payload.content,
            username: username,
        });
    }
}, [socket, room, username]);

    console.log(SOCKET_BASE_URL);

    useEffect(() => {
        console.log("Inside useEffect. Room:", room, "Username:", username);

        const newSocket = io(SOCKET_BASE_URL, {
            reconnection: false,
            query: `username=${username}&room=${room}`
        });

        newSocket.on("connect", () => setConnected(true));
        newSocket.on("read_message", (response) => {
            setSocketResponse({
                room: response.chatMessageId,
                content: response.content,
                username: response.sendId
            })
        })

        setSocket(newSocket);
        
        console.log(newSocket);
        console.log(socketResponse);

        return () => {
            if(newSocket) newSocket.disconnect(); 
        }
    }, [room, username, socketResponse]);


    return {socketResponse, isConnected, sendData}
}

