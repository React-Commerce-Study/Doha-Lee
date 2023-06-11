import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import loginType from '../Recoil/loginTypeContext/loginTypeAtom.js';
import Logo from '../assets/icons/Logo-hodu.png';
import LoginForm from '../Components/SignForm/LoginForm';
import UserButton from '../Components/common/UserButton';
import { useRecoilState } from 'recoil';

const Login = () => {
  const [type, setType] = useRecoilState(loginType);
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    login_type: type,
  });

  const handleLoginType = (e) => {
    const target = e.target.textContent;
    if (target === '구매회원 로그인') {
      setType('BUYER');
      setUserInput({
        ...userInput,
        login_type: 'BUYER',
      });
    } else if (target === '판매회원 로그인') {
      setType('SELLER');
      setUserInput({
        ...userInput,
        login_type: 'SELLER',
      });
    }
  };

  console.log(type);

  return (
    <div>
      <LoginLayout>
        <h1>
          <Link to='/'>
            <img src={Logo} alt='HODU 로고' />
          </Link>
        </h1>
        <UserButtonStyle>
          <li>
            <UserButton
              bgColor={type === 'BUYER'}
              onClick={handleLoginType}
              borderRight={type === 'BUYER'}
              zIdx={type === 'BUYER'}
            >
              구매회원 로그인
            </UserButton>
          </li>
          <li>
            <UserButton
              bgColor={type === 'SELLER'}
              onClick={handleLoginType}
              borderLeft={type === 'SELLER'}
              zIdx={type === 'SELLER'}
            >
              판매회원 로그인
            </UserButton>
          </li>
        </UserButtonStyle>
        <LoginStyle>
          <h2 className='a11y-hidden'>로그인</h2>
          <LoginForm userInput={userInput} setUserInput={setUserInput} />
        </LoginStyle>
        <div>
          <LinkStyle to='/signup'>회원가입</LinkStyle>
          <Link to='/'>비밀번호 찾기</Link>
        </div>
      </LoginLayout>
    </div>
  );
};

const LoginLayout = styled.div`
  max-width: 550px;
  margin: 100px auto;
  text-align: center;

  h1 {
    margin-bottom: 70px;
  }
`;

const UserButtonStyle = styled.ul`
  li {
    display: inline-block;
  }
`;

const LoginStyle = styled.div`
  position: relative;
  margin-top: -8px;
  margin-bottom: 30px;
  padding: 35px;
  background-color: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
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
