import React from 'react';

function Input(props) {
  const { id, label, type = 'text' } = props;

  return (
    <div className="row">
      <div className="input-field col s12">
        <label htmlFor={id}>{label}</label>
        <input className="validate" id={id} type={type} />
      </div>
    </div>
  );
}

export default Input;
