import React from 'react';
import { css, styled } from 'styled-components';
import checkOff from '../../assets/icons/icon-check-off.svg';
import checkOn from '../../assets/icons/icon-check-on.svg';
import up from '../../assets/icons/icon-up-arrow.svg';
import down from '../../assets/icons/icon-down-arrow.svg';

type SignupInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'password' | 'tel' | 'button' | 'number' | undefined;
  value?: string | (readonly string[] & string) | undefined;
  label?: string;
  $checked?: boolean;
  $checkIcon?: boolean;
  $up?: boolean;
  $arrow?: boolean;
  $star?: boolean;
  $warning?: boolean;
  $center?: boolean;
};

const SignupInput = (props: SignupInputProps) => {
  const { type, label, $star, ...rest } = props;
  return (
    <>
      <SignupLabelStyle $star={$star}>
        {label}
        <SignupInputStyle type={type} {...rest} />
      </SignupLabelStyle>
    </>
  );
};

const SignupLabelStyle = styled.label<SignupInputProps>`
  width: 100%;
  font-size: 16px;
  color: var(--gray);

  ${(props) =>
    props.$star &&
    css`
      &::before {
        content: '*';
        display: inline-block;
        width: 5px;
        height: 5px;
        margin-right: 5px;
        color: red;
      }
    `}
`;

type StyledInputProps = {
  $checked?: boolean;
  $checkIcon?: boolean;
  $up?: boolean;
  $arrow?: boolean;
  $warning?: boolean;
  $center?: boolean;
};

const SignupInputStyle = styled.input<StyledInputProps>`
  display: block;
  margin-top: 10px;
  width: 100%;
  padding: 17px;
  padding-right: 29px;
  text-align: ${(props) => (props.$center ? 'center' : 'start')};
  border: ${(props) =>
    props.$warning ? '1px solid var(--error)' : '1px solid var(--border)'};
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;

  ${(props) =>
    props.$checkIcon &&
    css<StyledInputProps>`
      background-image: ${(props) =>
        props.$checked ? `url(${checkOn})` : `url(${checkOff})`};
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 28px;
    `}

  ${(props) =>
    props.$arrow &&
    css<StyledInputProps>`
      background-image: ${(props) =>
        props.$up ? `url(${up})` : `url(${down})`};
      background-repeat: no-repeat;
      background-position: right 14px center;
      background-size: 22px;
    `}
`;

export default SignupInput;
