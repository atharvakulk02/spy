import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Roomselection from "./components/Roomselection";
import Lobby from "./components/Lobby";
import Game from "./components/Game";

const WS_URL = "https://spy-hmvs.onrender.com"; // Update for deployment

function App() {
    const { sendMessage, lastMessage } = useWebSocket(WS_URL, { share: true });
    const [roomCode, setRoomCode] = useState(null);
    const [players, setPlayers] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [role, setRole] = useState(null);
    const [location, setLocation] = useState(null);
    const [username, setUsername] = useState(null); // Store the current player's username

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data);
                console.log("🔥 Received WebSocket Message:", data);
    
                if (data.type === "lobby_update" && data.room === roomCode) {
                    setPlayers(data.players);
                }
    
                if (data.type === "game_started" && data.room === roomCode) {
                    console.log("✅ Game started event received for room:", roomCode);
                    console.log("🔍 Checking username match:", username, "==", data.username);
    
                    if (!username) {
                        console.warn("⚠️ Username is undefined! Fixing...");
                        return;
                    }
    
                    if (data.username === username) {
                        console.log("🎭 Setting game state for:", username);
                        console.log("🃏 Role:", data.role);
                        console.log("📍 Location:", data.location);
                        
                        setGameStarted(true);
                        setRole(data.role);
                        setLocation(data.location);
                    } else {
                        console.log("🚫 Ignoring game start event (not for this user)");
                    }
                }
            } catch (error) {
                console.error("❌ Error parsing WebSocket message:", error);
            }
        }
    }, [lastMessage, roomCode, username]);
    
    

    function handleJoinRoom(user, room) {
        console.log("🚀 Setting username:", user);
        setUsername(user); // Store the username
        setRoomCode(room);
        sendMessage(JSON.stringify({ type: "join_lobby", username: user, room }));
    }
    

    function handleStartGame() {
        console.log("Sending start game request...");
        sendMessage(JSON.stringify({ type: "start_game", room: roomCode }));
    }

    return (
        <div>
            {!roomCode ? (
                <Roomselection onJoinRoom={handleJoinRoom} />
            ) : gameStarted ? (
                <Game role={role} location={location} />
            ) : (
                <Lobby roomCode={roomCode} players={players} onStartGame={handleStartGame} />
            )}
        </div>
    );
}

export default App;
