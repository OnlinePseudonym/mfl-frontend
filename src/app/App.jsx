import React, { useEffect, Fragment } from 'react';
import M from 'materialize-css';
import { Helmet } from 'react-helmet';
import { useAuth } from 'context/auth-context';
import UnauthenticatedApp from 'Unauthenticated';
import AutheticatedApp from 'Authenticated';

import 'materialize-css/dist/css/materialize.min.css';
import Normalize from './NormalizeStyles';
import BaseStyles from './BaseStyles';

function App() {
  const { user, getCurrentUser, validate } = useAuth();

  useEffect(() => {
    const slideOutNavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(slideOutNavs);
    const collapsibles = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibles);
  });

  const token = getCurrentUser();

  if (!user && token) {
    console.log('token exists');
    validate(token).then((res) => console.log(res));
  }

  return (
    <Fragment>
      <Helmet>
        <title>Some Page Title</title>
        <meta name="description" content="lorem ipsum" />
        <meta name="keywords" content="lorem ipsum" />
        <meta name="og:title" content="lorem ipsum" />
        <meta name="og:image" content="lorem ipsum" />
      </Helmet>
      <Normalize />
      <BaseStyles />
      {user ? <AutheticatedApp /> : <UnauthenticatedApp />}
    </Fragment>
  );
}

export default App;
