import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useAuth } from 'context/auth-context';
import Input from 'shared/components/Form/Input';
import Loader from 'shared/components/Loader';
import { Forward } from '@material-ui/icons';

function Unauthenticated() {
  useEffect(() => {
    M.Modal.init(document.querySelectorAll('.modal'), { dismissible: false });
    const loginModal = M.Modal.getInstance(document.querySelector('.modal.login'));
    loginModal.open();
  }, []);
  const { login, error } = useAuth();
  const [loading, setLoading] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    setLoading(true);
    login(username.value, password.value);
  }

  return (
    <div className="container">
      <div className="modal login card">
        <form className="card-content" onSubmit={handleSubmit}>
          <Input id="username" label="Username" />
          <Input id="password" label="Password" type="password" />
          <div className="row">
            <div className="input-field col s12">
              <button disabled={loading} className="btn waves-effect waves-light" type="submit">
                {loading ? (
                  <Loader />
                ) : (
                  <span>
                    Login
                    <Forward />
                  </span>
                )}
              </button>
            </div>
          </div>
          {error && <div className="error-text">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Unauthenticated;
