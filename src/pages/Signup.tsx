import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { SignLayout } from 'Components/style/SignLayout';
import UserButton from 'Components/common/UserButton';
import SignupForm from 'Components/Signup/SignupForm';

import Logo from '../assets/icons/Logo-hodu.png';

const Signup = () => {
  const [userType, setUserType] = useState('BUYER');

  const handleSingupType: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const targetText = target.textContent;

    if (targetText === '구매회원가입') {
      setUserType('BUYER');
    } else if (targetText === '판매회원가입') {
      setUserType('SELLER');
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
        <SUserTypeLayout>
          <li>
            <UserButton
              $bgColor={userType === 'BUYER'}
              onClick={handleSingupType}
              $borderRight={userType === 'BUYER'}
              $zIdx={userType === 'BUYER'}
            >
              구매회원가입
            </UserButton>
          </li>
          <li>
            <UserButton
              $bgColor={userType === 'SELLER'}
              onClick={handleSingupType}
              $borderLeft={userType === 'SELLER'}
              $zIdx={userType === 'SELLER'}
            >
              판매회원가입
            </UserButton>
          </li>
        </SUserTypeLayout>
        <h2 className='a11y-hidden'>회원가입</h2>
        <SignupForm $userType={userType} />
      </SignLayout>
    </>
  );
};

const SUserTypeLayout = styled.ul`
  li {
    display: inline-block;
  }
`;

export default Signup;
