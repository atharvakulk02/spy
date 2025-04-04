import React from "react";

function Lobby({ roomCode, players, onStartGame }) {
    return (
        <div>
            <h1>Lobby</h1>
            <p><strong>Room Code:</strong> {roomCode}</p>
            <h2>Players in lobby:</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
            <button onClick={onStartGame} disabled={players.length < 3}>Start Game</button>
        </div>
    );
}

export default Lobby;