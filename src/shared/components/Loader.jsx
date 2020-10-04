import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounceDelay = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const Spinner = styled.div`
  text-align: center;

  div {
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${(props) => props.color || 'var(--bg-color)'};
    margin: 0 0.125rem;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;

function Loader(props) {
  const { color } = props;

  return (
    <Spinner color={color}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </Spinner>
  );
}

export default Loader;
