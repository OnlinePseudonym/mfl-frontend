import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@material-ui/icons';

const TopNav = () => {
  return (
    <nav className="top-nav light-green lighten-3">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo grey-text text-darken-4">
            MFL
          </Link>
          <button
            type="button"
            data-target="slide-out"
            className="top-nav sidenav-trigger full hide-on-large-only"
          >
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
