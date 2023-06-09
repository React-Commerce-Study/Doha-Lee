import React from 'react';
import styled from 'styled-components';

type LoginInputProps = React.HTMLAttributes<HTMLInputElement> & {
  type?: 'button' | 'submit' | 'reset' | 'text' | 'password' | undefined;
  name?: string;
  value?: string;
  autoComplete?: string;
};

const LoginInput = (props: LoginInputProps) => {
  const { type } = props;
  return <InputStyle type={type ? type : 'text'} {...props} />;
};

const InputStyle = styled.input`
  padding: 20px 10px;
  border-bottom: 1px solid var(--border);

  &::placeholder {
    font-size: 16px;
  }
`;

export default LoginInput;
