import React from 'react';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
import { useAuth } from 'context/auth-context';
import SelectLeague from './SelectLeague';

function SideNav(props) {
  const { logout } = useAuth();
  const { franchise, leagues, leagueId, handleSelect } = props;

  return (
    <ul id="slide-out" className="sidenav sidenav-fixed">
      {franchise.id > -1 && (
        <li>
          <div className="user-view blue-grey">
            <img src={franchise.icon} alt={franchise.name} />
            <span className="white-text name">{franchise.name}</span>
            <span className="white-text name">{franchise.ownerName}</span>
            <span className="white-text email">{franchise.email}</span>
          </div>
        </li>
      )}
      {leagueId === null ? (
        <SelectLeague leagues={leagues} handleSelect={handleSelect} />
      ) : (
        <React.Fragment>
          <li>
            <button type="button" className="subheader">
              {leagues.find((x) => x.id === leagueId)?.name}
            </button>
          </li>
          <li>
            <Link to="/roster" className="waves-effect">
              My Roster
            </Link>
          </li>
          <li>
            <Link to="/free-agents" className="waves-effect">
              Free Agents
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
        </React.Fragment>
      )}
      <li>
        <button className="waves-effect btn-flat" type="button" onClick={() => logout()}>
          <ExitToApp />
          Logout
        </button>
      </li>
    </ul>
  );
}

export default SideNav;
