import React, { ReactNode } from 'react';
import styled from 'styled-components';

//NOTE
// Form의 type을 지정해주기
// ReactNode는 React에서 제공해주는 타입 중 하나로, 컴포넌트 자식 요소에 들어갈 수 있는 모든 유형들을 나타낸다. ReactNode는 기본적으로 JSX에서 사용되는 모든 유효한 값들을 포함한다.
type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  $gap?: string;
};

const Form = (props: FormProps) => {
  return <FormStyle {...props}>{props.children}</FormStyle>;
};

const FormStyle = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || '6px'};

  label {
    text-align: start;
  }
`;

export default Form;
