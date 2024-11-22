import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080});
const gameManager = new GameManager();

wss.on('connection', function connection(ws){
    console.log('A user connected');
    ws.send(JSON.stringify({ message: 'Welcome to the Chess Server!' }));
    gameManager.addUser(ws)
    ws.on("disconnect",() => gameManager.removeUser(ws))
});
