import React, { ReactNode, CSSProperties } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  width?: string;
  padding?: string;
  $bgColor?: string;
  border?: string;
  $mt?: string;
  noCursor?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

const Button = ({ type, children, ...rest }: ButtonProps) => {
  return (
    <BtnStyle {...rest} type={type ? type : 'button'}>
      {children}
    </BtnStyle>
  );
};

const BtnStyle = styled.button<ButtonProps>`
  display: inline-block;
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: ${(props) => props.padding || '20px'};
  color: ${(props) => props.color || 'white'};
  background: ${(props) => props.$bgColor || 'var(--primary)'};
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  border: ${(props) => props.border || 'none'};
  margin-top: ${(props) => (props.$mt ? props.$mt : '0px')};

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--border);
    `};

  ${(props) =>
    props.noCursor &&
    css`
      cursor: default;
    `}
`;

export default Button;
