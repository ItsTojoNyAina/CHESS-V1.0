"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(p1, p2) {
        this.player1 = p1;
        this.player2 = p2;
        this.table = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.Init_game,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.Init_game,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        //validation mouvement
        if (this.table.moves.length % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.table.moves.length % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.table.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        //en cas de victoire d'un des 2 joueurs
        if (this.table.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: message_1.Game_Over,
                payload: {
                    winner: this.table.turn() === 'w' ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: message_1.Game_Over,
                payload: {
                    winner: this.table.turn() === 'w' ? "black" : "white"
                }
            }));
            return;
        }
        //Notifier le joueur que le mouvement a été effectué
        if (this.table.moves.length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: message_1.Move,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.Move,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
