import React from 'react';
import PositionGroup from './PositionGroup';

function Roster(props) {
  const { roster } = props;

  function groupBy(array, key) {
    return array.reduce((curr, acc) => {
      (curr[acc[key]] = curr[acc[key]] || []).push(acc);
      return curr;
    }, {});
  }

  const players = groupBy(roster, 'position');

  console.log(players);

  return (
    <div className="collection">
      <PositionGroup players={players.QB} />
      <PositionGroup players={players.WR} />
      <PositionGroup players={players.RB} />
      <PositionGroup players={players.TE} />
      <PositionGroup players={players.PK} />
      <PositionGroup players={players.LB} />
      <PositionGroup players={players.S} />
      <PositionGroup players={players.CB} />
      <PositionGroup players={players.DE} />
      <PositionGroup players={players.DT} />
    </div>
  );
}

export default Roster;
