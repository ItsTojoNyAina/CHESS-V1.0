import { WebSocket } from 'ws';
import {Chess} from 'chess.js';
import { Game_Over, Move, Init_game } from './message';

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    private table: Chess ;
    private startTime: Date;
    private moveCount = 0; 

    constructor(p1: WebSocket, p2: WebSocket){
        this.player1 = p1;
        this.player2 = p2;
        this.table = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Init_game,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Init_game,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move:{
        from: string;
        to: string;
    }){
        //validation mouvement
        if (this.moveCount % 2 === 0 && socket !== this.player1){
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2){
            return;
        }

        try{
            this.table.move(move);
        }catch(e){
            console.log(e);
            return;
        }
        //en cas de victoire d'un des 2 joueurs
        if(this.table.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: Game_Over,
                payload: {
                    winner: this.table.turn() === 'w' ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: Game_Over,
                payload: {
                    winner: this.table.turn() === 'w' ? "black" : "white"
                }
            }));
            return;
        }

        //Notifier le joueur que le mouvement a été effectué
        if(this.table.moves.length % 2 === 0){
            this.player2.send(JSON.stringify({
                type: Move,
                payload: move
            }))
            }else{
                this.player1.send(JSON.stringify({
                    type: Move,
                    payload: move
                }))
             }
             this.moveCount++;
    }
}