import React, { useState } from "react";

function Roomselection({ onJoinRoom }) {
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");

    return (
        <div>
            <h1>Spyfall Online</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
            />
            <button onClick={() => onJoinRoom(username, roomCode)}>Join Room</button>
            <button onClick={() => onJoinRoom(username, Math.random().toString(36).substr(2, 5))}>
                Create Room
            </button>
        </div>
    );
}

export default Roomselection;
