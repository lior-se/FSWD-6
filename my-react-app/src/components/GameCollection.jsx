import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GamePage from "./GamePage";

const gameData = {
    title: "Black Myth: Wukong",
    developer: "Game Science",
    releaseDate: "2024-08-20",
    description: "An action RPG rooted in Chinese mythology...",
    media: ["https://pbs.twimg.com/media/GVRo4VqXMAEI15_.jpg", "https://cdn.mos.cms.futurecdn.net/qmKnEXssAbNKDNq24KRnaM.jpg"],
    cover: "https://i.ytimg.com/vi/1xGiPUeevCM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCfIJcln2crOoZEWxlQiHOqoVpF8g",
    genres: ["Action", "Adventure", "RPG"],
    price: 249,
  };

function GameCollection(){
    console.log("rendering game collection");
    return (
        <>
        <div>
            <GamePage gameData={gameData} />
        </div>
        </>
    );
}

export default GameCollection;