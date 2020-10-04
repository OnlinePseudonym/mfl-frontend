import React, { useState } from 'react';

function pagination(c, m) {
  const current = c;
  const last = m;
  const delta = 2;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  console.log(rangeWithDots);
  return rangeWithDots;
}

function FreeAgents(props) {
  const { players } = props;

  const pageSize = 25;
  const pages = [...Array(Math.ceil(players.length / pageSize) - 1).keys()].map((x) => x + 1);

  const [page, setPage] = useState(1);
  const pagePlayers = players.slice(page * pageSize, (page + 1) * pageSize);

  const pagesWithDots = pagination(page, pages.length);

  return (
    <div>
      <div className="collection">
        {pagePlayers.map((x) => (
          <a key={x.id} className="collection-item" href="/some/player/url">
            {x.firstName} {x.lastName}, {x.position} - {x.team}
          </a>
        ))}
      </div>
      {pages !== null && (
        <ul className="pagination">
          <li className={page === 1 ? 'disabled' : 'waves-effect'}>
            <a href="#!" onClick={() => page !== 1 && setPage(page - 1)}>
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {pagesWithDots.map((x, i) => (
            <li
              key={i}
              // eslint-disable-next-line no-nested-ternary
              className={x === page ? 'active' : x === '...' ? 'disabled' : 'waves-effect'}
            >
              <a href="#!" onClick={() => x !== '...' && setPage(x)}>
                {x}
              </a>
            </li>
          ))}
          <li className={page === pages.length + 1 ? 'disabled' : 'waves-effect'}>
            <a href="#!" onClick={() => page !== pages.length + 1 && setPage(page + 1)}>
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default FreeAgents;
