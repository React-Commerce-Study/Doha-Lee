import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import loginCheck from '../../Recoil/loginCheckContext/loginCheckAtom.ts';
import Form from '../common/Form.tsx';
import LoginInput from '../common/LoginInput.tsx';
import Button from '../common/Button.tsx';
import loginAPI from '../../api/loginAPI.ts';

// NOTE: interface와 type, 유니온 타입
/*
interface로 따로 빼고 type안에다가 userInput: User로 사용가능
interface User {
  username: string;
  password: string;
}
*/
// 대신에 TypeScript에서 제공하는 유니언 타입을 사용하여 타입을 합칠 수 있음. 유니언 타입은 type1 또는 type2 중 하나의 타입을 가질 수 있음을 의미한다.
// 유니언타입: userInput: User | Object | Array<any>;
// 아래와같이 객체로 표현할 수 있음.

type LoginForm = React.HTMLAttributes<HTMLFormElement> & {
  userInput: {
    username: string;
    password: string;
    login_type: string;
  };
  setUserInput: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      login_type: string;
    }>
  >;
};

const LoginForm = ({ userInput, setUserInput }: LoginForm) => {
  const navigate = useNavigate();

  const [loginChecked, setLoginChecked] = useRecoilState(loginCheck);
  const [errorMessage, setErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  // NOTE: e의 type
  // (e: ChangeEvent<HTMLInputElement>) GPT의 추천
  // (e: { target: { name: string; value: string } }) vscode fix 추천
  // 이상황에서는 GPT 추천이 적합하다고 함. ChangeEvent<HTMLInputElement>는 React의 이벤트 타입 중 하나로, input 요소의 변경 이벤트를 다루는 타입임. e.target이 HTMLInputElement로 추론되기에 TypeScript에서 더 정확하고 타입 안정성이 높은 접근 방식임. vscode fix 추천은 타입 자체는 더 명시적으로 타입을 지정하는 거지만 GPT추천보다는 덜 정확하고 범용적인 타입임.
  const handleTarget = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleLogin = async () => {
    try {
      const accountData = await loginAPI(userInput);
      const receivedToken = accountData.token;
      localStorage.setItem('token', receivedToken);
      setLoginChecked(true);
      return true;
    } catch (error) {
      // NOTE: error type
      // instanceof Error로 타입을 좁혀주면 타입 에러가 사라짐. 이렇게 타입을 좁혀주는 것을 타입가드라고 함. 유니온이거나 unknown 일 때 타입 가드를 쓰는게 좋은 것 같다고 함.
      if (error instanceof Error) {
        console.error('Account API 에러가 발생했습니다', error);
        setErrorMessage(error.message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loginSuccess = await handleLogin();
    if (loginSuccess) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (loginChecked) {
      navigate('/');
    }
  }, []);

  const handleError = () => {
    if (userInput.username === '' && userInput.password === '') {
      setUserErrorMessage('아이디를 입력해 주세요.');
    } else if (userInput.username && userInput.password === '') {
      setUserErrorMessage('비밀번호를 입력해 주세요.');
    } else {
      setUserErrorMessage('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LoginInput
        type='text'
        placeholder='아이디'
        name='username'
        value={userInput.username}
        onChange={handleTarget}
      />
      {userErrorMessage && userInput.username === '' && (
        <ErrorStyle>{userErrorMessage}</ErrorStyle>
      )}
      <LoginInput
        type='password'
        placeholder='비밀번호'
        name='password'
        value={userInput.password}
        onChange={handleTarget}
        autoComplete='on'
      />
      {userErrorMessage && userInput.username && userInput.password === '' && (
        <ErrorStyle>{userErrorMessage}</ErrorStyle>
      )}
      {errorMessage && userInput.username && userInput.password && (
        <ErrorStyle>{errorMessage}</ErrorStyle>
      )}
      <Button type='submit' $mt='36px' onClick={handleError}>
        로그인
      </Button>
    </Form>
  );
};

const ErrorStyle = styled.p`
  text-align: start;
  margin-top: 10px;
  color: var(--error);
`;

export default LoginForm;
