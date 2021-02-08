import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const getRange = (c, m) => {
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

  return rangeWithDots;
};

const Pagination = ({ Content, pageSize, items }) => {
  const [page, setPage] = useState(1);

  const pages =
    items.length > 0
      ? [...Array(Math.ceil(items.length / pageSize) - 1).keys()].map((x) => x + 1)
      : [];
  const curItems = items.slice(page * pageSize, (page + 1) * pageSize);
  const pagesWithDots = getRange(page, pages.length);

  return (
    <div>
      <div className="collection">
        {curItems.map((x, i) => (
          <Content key={i} item={x} />
        ))}
      </div>
      {pages !== null && (
        <ul className="pagination">
          <li className={page === 1 ? 'disabled' : 'waves-effect'}>
            <a href="#!" onClick={() => page !== 1 && setPage(page - 1)}>
              <ChevronLeft />
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
              <ChevronRight />
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
