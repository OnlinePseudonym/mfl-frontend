import React from 'react';

const Form = (props) => {
  const { children } = props;
  return <form>{...children}</form>;
};

export default Form;
