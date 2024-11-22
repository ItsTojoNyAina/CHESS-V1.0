import React, { useEffect, useState } from 'react';
import Button from './../Landing Page/Button';
import { useSocket } from './../Hooks/useSocket';
import ChessBoard from './Echequier'; 
import Logo from '../../assets/Logo.png'

export const Init_game = "init_game";
export const Move = "move";
export const Game_Over = "game_over";

export const Game: React.FC = () => {
  const socket = useSocket();
  const [gameStarted, setGameStarted] = useState(false); // État pour savoir si le jeu est démarré

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
      switch (message.type) {
        case Init_game:
          console.log("Game initialized");
          setGameStarted(true); // Démarre le jeu
          break;
        case Move:
          console.log("Move received");
          break;
        case Game_Over:
          console.log("Game is over");
          break;
      }
    };
  }, [socket]);

  // Fonction pour démarrer le jeu
  const startGame = () => {
    if (!socket) return;
    
    socket.send(
      JSON.stringify({
        type: Init_game,
      })
    );
  };

 // if (!socket) return <div>Connecting...</div>;

  return (
    <div className="min-h-screen bg-[#1a0b2e] flex justify-center items-center text-white">
      <div className="flex flex-col items-center">
      <img 
        src={Logo}
        width={40} 
        height={40} 
        alt="Chess knight logo" 
        className="opacity-90 w-72 mb-10"
      />
        
        {/* Le bouton est affiché si le jeu n'est pas démarré */}
        {!gameStarted ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          // Lorsque le jeu commence, afficher ChessBoard
          <div className="mt-8">
            <ChessBoard socket={socket} />
          </div>
        )}
      </div>
    </div>
  );
};
