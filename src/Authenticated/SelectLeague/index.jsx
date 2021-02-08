import React, { useState, useEffect } from 'react';
import Modal from 'shared/components/Modal';
import FieldSet from 'shared/components/Form/Fieldset';
import Submit from 'shared/components/Form/Submit';

const SelectLeague = ({ leagues, setLeagues, handleSelect }) => {
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchLeagues = async () => {
      const myleagues = await (await fetch('https://localhost:44341/api/leagues')).json();
      console.log(myleagues);

      setLeagues(myleagues);
    };

    if (localStorage.getItem('league') === null) {
      fetchLeagues();
    }
  }, [setLeagues]);

  useEffect(() => {
    const { M } = window;

    const dropdowns = document.querySelectorAll('select');
    M.FormSelect.init(dropdowns);
  }, [leagues]);

  const handleSubmit = (event) => {
    setLoading(true);
    const { league } = event.target.elements;
    const selectedLeague = leagues.find((x) => x.id === parseInt(league.value));

    localStorage.setItem('league', JSON.stringify(selectedLeague));
    handleSelect(selectedLeague);
  };

  return (
    <Modal isOpen>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <select id="league" defaultValue="">
            <option value="" disabled>
              Select your league
            </option>
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </FieldSet>
        <FieldSet>
          <Submit loading={loading} />
        </FieldSet>
      </form>
    </Modal>
  );
};

export default SelectLeague;
