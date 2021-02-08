import React from 'react';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import { SelectLeagueButton } from './Styles';

const SelectLeague = ({ leagues, handleSelect }) => (
  <li className="no-padding">
    <ul className="collapsible collapsible-accordion">
      <li>
        <SelectLeagueButton type="button" className="collapsible-header pulse cyan">
          Select your league
          <ArrowDropDownCircleOutlined />
        </SelectLeagueButton>
        <div className="collapsible-body">
          <ul>
            {leagues.map((league) => (
              <li key={league.id}>
                <button type="button" onClick={() => handleSelect(league.id)}>
                  {league.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  </li>
);

export default SelectLeague;
