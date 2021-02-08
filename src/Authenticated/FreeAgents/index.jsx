import React, { useState, useEffect, Fragment } from 'react';
import Pagination from 'shared/components/Pagination';
import { Linear } from 'shared/components/Spinner';

const Player = ({ item }) => (
  <a className="collection-item" href={`/players/${item.id}`}>
    {item.firstName} {item.lastName}, {item.position} - {item.team}
  </a>
);

const FreeAgents = ({ leagueId }) => {
  const [freeAgents, setFreeAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://localhost:44341/api/players/getfreeagents?leagueid=${leagueId}`)
      ).json();

      console.log(response);
      setFreeAgents(response);
      setLoading(false);
    })();
  }, [leagueId]);
  const pageSize = 25;

  return loading ? (
    <Linear />
  ) : (
    <Fragment>
      <h1 className="heading">Free Agents</h1>
      <Pagination items={freeAgents} pageSize={pageSize} Content={Player} />
    </Fragment>
  );
};

export default FreeAgents;
