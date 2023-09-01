import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import loginType from '../Recoil/loginTypeContext/loginTypeAtom';
import Logo from '../assets/icons/Logo-hodu.png';
import LoginForm from '../Components/Login/LoginForm';
import UserButton from '../Components/common/UserButton';
import { useRecoilState } from 'recoil';
import { SignLayout, SignStyle } from '../Components/style/SignLayout';

const Login = () => {
  const [type, setType] = useRecoilState(loginType);
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    login_type: type,
  });

  // NOTE: button onClick 함수의 type
  // handleLoginType을 받는 컴포넌트 안에서 type을 명시해주지 않고도 핸들러 함수 자체에 타입을 명시해줄 수 있음. target의 오류는 as HTMLButtonElement를 사용해서 파라미터 타입을 명시해 줄 수 있음.
  const handleLoginType: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const targetText = target.textContent;

    if (targetText === '구매회원 로그인') {
      setType('BUYER');
      setUserInput({
        ...userInput,
        login_type: 'BUYER',
      });
    } else if (targetText === '판매회원 로그인') {
      setType('SELLER');
      setUserInput({
        ...userInput,
        login_type: 'SELLER',
      });
    }
  };

  return (
    <>
      <SignLayout>
        <h1>
          <Link to='/'>
            <img src={Logo} alt='HODU 로고' />
          </Link>
        </h1>
        <UserButtonStyle>
          <li>
            <UserButton
              $bgColor={type === 'BUYER'}
              onClick={handleLoginType}
              $borderRight={type === 'BUYER'}
              $zIdx={type === 'BUYER'}
            >
              구매회원 로그인
            </UserButton>
          </li>
          <li>
            <UserButton
              $bgColor={type === 'SELLER'}
              onClick={handleLoginType}
              $borderLeft={type === 'SELLER'}
              $zIdx={type === 'SELLER'}
            >
              판매회원 로그인
            </UserButton>
          </li>
        </UserButtonStyle>
        <SignStyle>
          <h2 className='a11y-hidden'>로그인</h2>
          <LoginForm userInput={userInput} setUserInput={setUserInput} />
        </SignStyle>
        <div>
          <LinkStyle to='/signup'>회원가입</LinkStyle>
          <Link to='/'>비밀번호 찾기</Link>
        </div>
      </SignLayout>
    </>
  );
};

const UserButtonStyle = styled.ul`
  li {
    display: inline-block;
  }
`;

const LinkStyle = styled(Link)`
  &::after {
    content: '';
    display: inline-block;
    margin: 0 10px -5px 10px;
    width: 1px;
    height: 20px;
    background-color: #000;
  }
`;

export default Login;
