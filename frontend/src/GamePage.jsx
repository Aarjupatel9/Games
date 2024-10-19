import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gamesConfig from './games.json';

function GamePage() {
  const [gameData, setGameData] = useState([]);
  const [GameComponent, setGameComponent] = useState(null);

  const { gameName } = useParams(); // Get the game name from the URL
  const navigate = useNavigate(); // Used to programmatically navigate

  // Load the JSON file and handle dynamic component loading
  useEffect(() => {
    setGameData(gamesConfig);

    if (gameName) {
      const game = gamesConfig.find(g => g.name === gameName);
      if (game) {
        const DynamicComponent = lazy(() => import(`./games/${game.name}/${game.component}`));
        setGameComponent(() => DynamicComponent);
      }
    }
  }, [gameName]);

  const handleGameSelect = (index) => {
    const game = gameData[index];
    // Navigate to /game/{gameName} when a game is selected
    navigate(`/game/${game.name}`);
  };

  return (
    <div className='flex flex-col p-4 h-full w-full'>
      {GameComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <GameComponent />
        </Suspense>
      ) : (
        <div className='flex flex-col jsutify-center mt-2'>
          <h1 className='p-2'>Games</h1>
          <div className='flex flex-row flex-wrap'>
            {gameData && gameData.map((game, index) => (
              <div
                key={index}
                className='flex p-3 h-48 w-48 bg-gray-200 justify-center items-center capitalize cursor-pointer rounded'
                onClick={() => handleGameSelect(index)}
              >
                {game.displayName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage ;
