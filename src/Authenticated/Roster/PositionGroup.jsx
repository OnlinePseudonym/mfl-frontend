import React from 'react';

function PositionGroup(props) {
  const { players } = props;

  if (!players) {
    return null;
  }

  return (
    <div className="collection-item collection">
      {players.map((player) => (
        <div className="collection-item" key={player.id}>
          {player.firstName} {player.lastName}, {player.position} - {player.team}
        </div>
      ))}
    </div>
  );
}

export default PositionGroup;
