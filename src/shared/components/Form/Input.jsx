import React, { Fragment } from 'react';

const Input = ({ id, label, type = 'text' }) => (
  <Fragment>
    <label htmlFor={id}>{label}</label>
    <input className="validate" id={id} type={type} />
  </Fragment>
);

export default Input;
