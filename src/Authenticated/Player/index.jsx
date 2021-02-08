import React, { useState, useEffect } from 'react';
import { Linear } from 'shared/components/Spinner';

const Player = ({ playerId }) => {
  const [player, updatePlayer] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://localhost:44341/api/players/getbyid/${playerId}`)
      ).json();

      console.log(response);
      updatePlayer(response);
    })();
  }, []);

  return player === null ? (
    <Linear />
  ) : (
    <div>
      <img
        src={`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${player.espnId}.png`}
        alt={player.fullName}
      />
      {player.firstName} {player.lastName}
    </div>
  );
};

export default Player;
