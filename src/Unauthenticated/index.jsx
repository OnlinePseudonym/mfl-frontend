import React, { useState } from 'react';
import { useAuth } from 'context/auth-context';
import Input from 'shared/components/Form/Input';
import FieldSet from 'shared/components/Form/Fieldset';
import Modal from 'shared/components/Modal';
import Submit from 'shared/components/Form/Submit';

const Unauthenticated = () => {
  const { login, error } = useAuth();
  const [loading, setLoading] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    setLoading(true);
    login(username.value, password.value);
  };

  return (
    <Modal isOpen>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <Input id="username" label="Username" />
        </FieldSet>
        <FieldSet>
          <Input id="password" label="Password" type="password" />
        </FieldSet>
        <FieldSet>
          <Submit loading={loading} />
        </FieldSet>
        {error && <div className="error-text">{error}</div>}
      </form>
    </Modal>
  );
};

export default Unauthenticated;
