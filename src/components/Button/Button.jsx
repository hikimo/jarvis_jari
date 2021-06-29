import React from 'react';
import styled from 'styled-components';

const ButtonUI = styled.button`
  cursor: pointer;
  background-color: #FDAE73;
  color: #fff;
  margin: 0px 5px;
  padding: 12.5px 15px;
  min-width: 140px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  transition: .25s box-shadow ease;

  &.primary {
    background-color: #2385DE;
  }
  &.success {
    background-color: #4CAF4F;
  }

  &:hover {
    box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.15);
    -webkit-box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.15);
    -o-box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.15);
  }
`;

export const Button = ({
  label,
  type,
  onClick = undefined,
  className = '',
  submit = false
}) => {
  return (
    <ButtonUI className={`${type} ${className}`} onClick={onClick}>{label}</ButtonUI>
  );
}