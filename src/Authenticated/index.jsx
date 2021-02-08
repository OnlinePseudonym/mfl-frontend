import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import Nav from 'shared/components/TopNav';
import SideNav from 'shared/components/Drawer';
import Roster from 'Authenticated/Roster';
import FreeAgents from 'Authenticated/FreeAgents';
import SelectLeague from './SelectLeague';
import Player from './Player';
import { AuthenticatedContent } from './Styles';

function AuthenticatedApp() {
  const [franchise, setFranchise] = useState({ roster: [] });
  const [leagues, setLeagues] = useState([]);
  const [myLeague, setLeague] = useState(null);
  const { getCurrentUser } = useAuth();

  const getMyFranchise = (league) =>
    league.franchises.find((team) => team.name === league.myFranchiseName);

  useEffect(() => {
    // const fetchLeague = async () => {
    //   const league = await (
    //     await fetch(`https://localhost:44341/api/leagues/getbyid/${leagueId}`)
    //   ).json();
    //   console.log(league);
    // };

    // const fetchFranchises = async () => {
    //   const leagueFranchises = await (
    //     await fetch(`https://localhost:44341/api/franchises?leagueid=${leagueId}`)
    //   ).json();
    //   console.log(leagueFranchises);
    // };

    if (myLeague === null) {
      const league = localStorage.getItem('league');

      if (league) {
        console.log('found it');
        setLeague(JSON.parse(league));
      }
    }

    if (myLeague !== null) {
      (async () => {
        const myFranchise = getMyFranchise(myLeague);

        if (myFranchise !== null) {
          const franchiseId = myFranchise.id;

          const res = await (
            await fetch(
              `https://localhost:44341/api/franchises/getbyid/${franchiseId}/?leagueid=${myLeague.id}`,
            )
          ).json();

          myFranchise.roster = res.roster;
          setFranchise(myFranchise);
        }
      })();
    }
  }, [myLeague]);

  return (
    <Router>
      {myLeague === null ? (
        <SelectLeague leagues={leagues} setLeagues={setLeagues} handleSelect={setLeague} />
      ) : (
        <AuthenticatedContent className="authenticated-content offset-x11">
          <Nav />
          <SideNav
            franchise={franchise}
            leagueId={myLeague.id}
            leagues={leagues}
            handleSelect={setLeague}
          />
          <Switch>
            <Route path="/roster">
              <button type="button" onClick={() => console.log(getCurrentUser())}>
                log current user
              </button>
              <h1 className="heading">My Roster</h1>
              {franchise.roster && franchise.roster.length !== 0 && (
                <Roster roster={franchise.roster} />
              )}
            </Route>
            <Route path="/free-agents">
              <FreeAgents leagueId={myLeague.id} />
            </Route>
            <Route
              path="/players/:playerId"
              render={(routeProps) => {
                const { playerId } = routeProps.match.params;
                return <Player playerId={playerId} />;
              }}
            />
          </Switch>
        </AuthenticatedContent>
      )}
    </Router>
  );
}

export default AuthenticatedApp;
