import { useEffect,useState } from "react";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            console.log('Connected');
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("disconnected");
            setSocket(null);
        }
    }, [])
    return socket;
}