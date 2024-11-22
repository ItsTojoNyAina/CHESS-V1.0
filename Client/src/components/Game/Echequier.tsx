import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import Button from './../Landing Page/Button';
import { useSocket } from './../Hooks/useSocket';

export const Init_game = "init_game";
export const Move = "move";
export const Game_Over = "game_over";

interface ChessBoardProps {
    socket: WebSocket | null;
  }

const ChessBoard: React.FC<ChessBoardProps> = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const socket = useSocket();

  // Synchronisation des événements Socket
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case Init_game:
          setGame(new Chess());
          break;
        case Move:
          if (message.data) {
            const newGame = new Chess(game.fen());
            newGame.move(message.data);
            setGame(newGame);
          }
          break;
        case Game_Over:
          alert("Game Over!");
          break;
        default:
          break;
      }
    };
  }, [socket, game]);

  // Gestion des clics sur les cases
  const handleSquareClick = (square: string) => {
    if (selectedSquare) {
      const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });

      if (move) {
        setSelectedSquare(null);
        setGame(new Chess(game.fen()));

        // Envoyer le mouvement au serveur
        socket?.send(
          JSON.stringify({
            type: Move,
            data: move,
          })
        );
      } else {
        setSelectedSquare(null);
      }
    } else {
      setSelectedSquare(square);
    }
  };

  // Génération des cases de l'échiquier
  const renderSquare = (square: string, piece?: string) => {
    const isSelected = selectedSquare === square;
    return (
      <div
        key={square}
        className={`w-16 h-16 flex items-center justify-center ${
          (square.charCodeAt(0) + parseInt(square[1])) % 2 === 0
            ? 'bg-gray-700'
            : 'bg-gray-300'
        } ${isSelected ? 'ring-4 ring-yellow-500' : ''}`}
        onClick={() => handleSquareClick(square)}
      >
        {piece && (
          <span className="text-2xl">
            {piece.startsWith('w') ? '♙♖♘♗♕♔'.charAt('prnbqk'.indexOf(piece[1])) : '♟♜♞♝♛♚'.charAt('prnbqk'.indexOf(piece[1]))}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] flex flex-col items-center text-white">
      <h1 className="text-4xl mb-8">Chess Game</h1>
      <div className="grid grid-cols-8 border-2 border-white">
        {game.board().map((row, rowIndex) =>
          row.map((square, colIndex) =>
            renderSquare(
              String.fromCharCode(97 + colIndex) + (8 - rowIndex),
              square ? (square.color + square.type) : undefined
            )
          )
        )}
      </div>
      <div className="mt-8">
        <Button
          onClick={() => {
            socket?.send(
              JSON.stringify({
                type: Init_game,
              })
            );
          }}
        >
          Restart Game
        </Button>
      </div>
    </div>
  );
};

export default ChessBoard;

