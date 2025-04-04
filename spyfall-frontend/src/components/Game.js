import React from "react";

function Game({ role, location }) {
    return (
        <div>
            <h1>Game Started!</h1>
            <h2>Your Role: {role}</h2>
            <h2>Location: {location}</h2>
        </div>
    );
}

export default Game;
