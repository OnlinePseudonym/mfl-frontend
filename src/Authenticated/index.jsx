import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import Nav from 'shared/components/TopNav';
import SideNav from 'shared/components/Drawer';
import Roster from 'Authenticated/Roster';
import FreeAgents from 'Authenticated/FreeAgents';
import { AuthenticatedContent } from 'Authenticated/Styles';

function AuthenticatedApp() {
  const [franchiseId, setFranchiseId] = useState(null);
  const [leagueId, setLeagueId] = useState(null);
  const [franchise, setFranchise] = useState({ roster: [] });
  const [leagues, setLeagues] = useState([]);
  const [freeAgents, setFreeAgents] = useState(null);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    console.log(leagueId);
    const fetchLeagues = async () => {
      const myleagues = await (await fetch('https://localhost:44341/api/leagues')).json();
      console.log(myleagues);

      setLeagues(myleagues);
    };

    const fetchLeague = async () => {
      const league = await (
        await fetch(`https://localhost:44341/api/leagues/getbyid/${leagueId}`)
      ).json();
      console.log(league);
    };

    const fetchFranchises = async () => {
      const leagueFranchises = await (
        await fetch(`https://localhost:44341/api/franchises?leagueid=${leagueId}`)
      ).json();
      console.log(leagueFranchises);
    };

    const fetchFreeAgents = async () => {
      const fetchedFreeAgents = await (
        await fetch(`https://localhost:44341/api/players/getfreeagents?leagueid=${leagueId}`)
      ).json();
      setFreeAgents(fetchedFreeAgents);
    };

    const fetchMyFranchise = async () => {
      const myFranchise = await (
        await fetch(
          `https://localhost:44341/api/franchises/getbyid/${franchiseId}/?leagueid=${leagueId}`,
        )
      ).json();
      console.log(myFranchise);
      const myStateFranchise = { ...franchise };
      myStateFranchise.roster = myFranchise.roster;
      setFranchise(myStateFranchise);
    };

    if (leagueId === null) {
      fetchLeagues();
    } else if (leagueId !== null) {
      fetchLeague();
      fetchFranchises();
      fetchFreeAgents();
    }
    if (franchiseId !== null) {
      fetchMyFranchise();
    }
  }, [franchise, franchiseId, leagueId]);

  function selectLeague(league) {
    const myFranchise = league.franchises.find((x) => x.name === league.myFranchiseName);
    const id = myFranchise?.id;
    setLeagueId(league.id);
    setFranchiseId(id);
    setFranchise(myFranchise);
  }

  return (
    <Router>
      <AuthenticatedContent className="authenticated-content offset-x11">
        <Nav />
        <SideNav
          franchise={franchise}
          leagueId={leagueId}
          leagues={leagues}
          handleSelect={selectLeague}
        />
        <div>
          <Route path="/roster">
            <h1 className="heading">My Roster</h1>
            {franchise.roster.length !== 0 && <Roster roster={franchise.roster} />}
          </Route>
          <Route path="/free-agents">
            <h1 className="heading">Free Agents</h1>
            {freeAgents !== null && <FreeAgents players={freeAgents} />}
          </Route>
          <button type="button" onClick={() => console.log(getCurrentUser())}>
            log current user
          </button>
        </div>
      </AuthenticatedContent>
    </Router>
  );
}

export default AuthenticatedApp;
