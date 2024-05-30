import { useEffect, useState } from "react"
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../../ApiUtils";

export const useSocket = (room, username) =>  {
    const [socket, setSocket] = useState("");
    
    const [socketResponse, setSocketResponse] = useState({
        room: "",
        content: "",
        username: "",
    });

    const [isConnected, setConnected] = useState(false);

    const sendData = useCallback(
        (payload) => {
          socket.emit("send_message", {
            room: room,
            content: payload.content,
            username: username,
        });
    }, []);

    useEffect(() => {
        const socket = io(SOCKET_BASE_URL, {
            reconnection: false,
            query: `username=${username}&room=${room}`
        });
        setSocket(socket);
        socket.on("connect", () => setConnected(true));
        socket.on("read_message", (response) => {
            setSocketResponse({
                room: response.chatMessageId,
                content: response.content,
                username: response.sendId
            })
        })

        return () => { socket.disconnect() }
    }, [])

    return {socketResponse, isConnected, sendData}







}