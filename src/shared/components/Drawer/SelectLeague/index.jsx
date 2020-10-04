import React from 'react';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import { SelectLeagueButton } from './Styles';

function SelectLeague(props) {
  const { leagues } = props;

  return (
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
                  <a href="#!" onClick={() => props.handleSelect(league)}>
                    {league.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </li>
  );
}

export default SelectLeague;
