import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SignStyle } from 'Components/style/SignLayout';
import Form from 'Components/common/Form';
import SignupInput from 'Components/common/SignupInput';
import TermsOfService from './TermsOfService';
import Button from 'Components/common/Button';
import signupAPI from 'api/signupAPI';

type SignupFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  $userType: string;
};

type signupParams = {
  userInput: {
    username?: string | undefined;
    password?: string | undefined;
    password2?: string | undefined;
    phone_number?: string | undefined;
    name?: string | undefined;
    company_registration_number?: string | undefined;
    store_name?: string | undefined;
  };
};

const SignupForm = ({ $userType, ...rest }: SignupFormProps) => {
  const navigate = useNavigate();

  const [selectBox, setSelectBox] = useState(false);
  const [selectedDigit, setSelectedDigit] = useState('010');
  const [middleDigit, setMiddleDigit] = useState('');
  const [lastDigit, setLastDigit] = useState('');
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const [errorRes, setErrorRes] = useState('');
  const [errorPW, setErrorPW] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [termCheck, setTermCheck] = useState(false);
  const hasEnglishAndNumbers = /^[a-zA-Z0-9]+$/;

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    password2: '',
    phone_number: selectedDigit + middleDigit + lastDigit,
    name: '',
  });

  const [sellerInput, setSellerInput] = useState({
    company_registration_number: '',
    store_name: '',
  });

  const fieldCheck =
    userInput.username === '' ||
    userInput.password === '' ||
    userInput.password2 === '' ||
    userInput.phone_number === '010' ||
    userInput.name === '';
  const pwCheck =
    userInput.password === userInput.password2 && userInput.password !== '';
  const companyCheck =
    sellerInput.company_registration_number !== '' ||
    sellerInput.store_name !== '';
  const disabledCheck =
    $userType === 'BUYER'
      ? !!errorRes || !pwCheck || !!errorPW || fieldCheck || !termCheck
      : !!errorRes ||
        !pwCheck ||
        !!errorPW ||
        fieldCheck ||
        !termCheck ||
        companyCheck;

  //TODO 이부분 테스트해야함!!!!
  let finalUserInput: signupParams['userInput'];

  if ($userType === 'BUYER') {
    finalUserInput = { ...userInput };
  } else if ($userType === 'SELLER') {
    finalUserInput = { ...userInput, ...sellerInput };
  }

  const handleSelectBox = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSelectBox(!selectBox);
  };

  const handleDigitClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selected: string | null = e.currentTarget.textContent;
    setSelectedDigit(selected || '');
    setSelectBox(false);
  };

  useEffect(() => {
    setUserInput((prev) => ({
      ...prev,
      phone_number: selectedDigit + middleDigit + lastDigit,
    }));
    setSellerInput((prev) => ({
      ...prev,
      phone_number: selectedDigit + middleDigit + lastDigit,
    }));
  }, [selectedDigit, middleDigit, lastDigit]);

  const handleDigitInput = (e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value;
    const name = e.target.name;
    if (name === 'middleDigit') {
      setMiddleDigit(digit);
    } else if (name === 'lastDigit') {
      setLastDigit(digit);
    }
  };

  // NOTE : select box 바깥 클릭시 false
  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectBoxRef.current &&
      !selectBoxRef.current.contains(e.target as Node)
    ) {
      setSelectBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if ($userType === 'BUYER') {
      setUserInput((prev) => ({
        ...prev,
        [name]: value.trim(),
      }));
    } else if ($userType === 'SELLER') {
      setSellerInput((prev) => ({
        ...prev,
        [name]: value.trim(),
      }));
    }
  };

  const handleSignupSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const signupRes = await signupAPI(finalUserInput, $userType);
    if (Array.isArray(signupRes)) {
      setErrorRes(signupRes.join());
    } else if (typeof signupRes === 'object') {
      navigate('/login');
      console.log(signupRes);
    }
  };

  // === 에러메세지 함수 모음
  const handleErrorPW = () => {
    if (
      userInput.password.length < 8 ||
      !hasEnglishAndNumbers.test(userInput.password)
    ) {
      setErrorPW(
        '비밀번호는 8자 이상, 한개 이상의 영소문자와 숫자가 포함되어야합니다.'
      );
    } else if (!pwCheck) {
      setErrorPW('비밀번호가 일치하지 않습니다.');
    } else {
      setErrorPW('');
    }
  };

  const handleErrorPhoneNumber = () => {
    if (middleDigit.length < 4 || lastDigit.length < 4) {
      setErrorPhoneNumber('올바른 휴대폰 번호를 작성해주세요');
    } else {
      setErrorPhoneNumber('');
    }
  };

  return (
    <>
      <SignStyle>
        <Form $gap='12px'>
          <IdPwLayout>
            <SignupInput
              id='sign-id'
              label='아이디'
              $star
              $warning={!!errorRes}
              name='username'
              value={userInput.username}
              onChange={handleUserInput}
              autoComplete='on'
            />
            {errorRes === '해당 사용자 아이디는 이미 존재합니다.' && (
              <p>{errorRes}</p>
            )}
            <SignupInput
              type='password'
              id='sign-pw'
              label='비밀번호'
              $checkIcon
              $checked={pwCheck}
              $star
              $warning={!!errorPW}
              name='password'
              value={userInput.password}
              onChange={handleUserInput}
              onBlur={handleErrorPW}
            />
            {(pwCheck || errorPW) &&
              errorPW !== '비밀번호가 일치하지 않습니다.' && <p>{errorPW}</p>}
            <SignupInput
              type='password'
              id='sign-reconfirm'
              label='비밀번호 재확인'
              $checkIcon
              $checked={pwCheck}
              $star
              name='password2'
              value={userInput.password2}
              onChange={handleUserInput}
              onBlur={handleErrorPW}
            />
            {(pwCheck || errorPW) &&
              errorPW === '비밀번호가 일치하지 않습니다.' && <p>{errorPW}</p>}
          </IdPwLayout>
          <SignupInput
            id='sign-username'
            label='이름'
            $star
            value={userInput.name}
            name='name'
            onChange={handleUserInput}
          />
          <PhoneNumberLayout ref={selectBoxRef}>
            <SignupInput
              type='button'
              onClick={handleSelectBox}
              label='휴대폰번호'
              $center
              $arrow
              $up={selectBox}
              $star
              $warning={
                !!errorRes &&
                errorRes !== '해당 사용자 아이디는 이미 존재합니다.'
              }
              name='phone_number'
              value={selectedDigit}
            />
            {selectBox && (
              <PhoneSelectBox>
                <li onClick={handleDigitClick}>010</li>
                <li onClick={handleDigitClick}>011</li>
                <li onClick={handleDigitClick}>016</li>
                <li onClick={handleDigitClick}>017</li>
                <li onClick={handleDigitClick}>018</li>
              </PhoneSelectBox>
            )}
            <SignupInput
              id='sign-middle_digit'
              type='number'
              $center
              $warning={
                (!!errorRes &&
                  errorRes !== '해당 사용자 아이디는 이미 존재합니다.') ||
                !!errorPhoneNumber
              }
              value={middleDigit}
              name='middleDigit'
              onChange={handleDigitInput}
              onBlur={handleErrorPhoneNumber}
            />
            <SignupInput
              id='sign-last_digit'
              $center
              $warning={
                (!!errorRes &&
                  errorRes !== '해당 사용자 아이디는 이미 존재합니다.') ||
                !!errorPhoneNumber
              }
              value={lastDigit}
              name='lastDigit'
              onChange={handleDigitInput}
              onBlur={handleErrorPhoneNumber}
            />
          </PhoneNumberLayout>
          {!!errorPhoneNumber && <p>{errorPhoneNumber}</p>}
          {errorRes && errorRes !== '해당 사용자 아이디는 이미 존재합니다.' && (
            <p>{errorRes}</p>
          )}
          <EmailLayout>
            <label htmlFor='sign-email_id'>이메일</label>
            <EmailInfoLayout>
              <SignupInput id='sign-email_id' />
              <span>@</span>
              <SignupInput id='sign-email' />
            </EmailInfoLayout>
          </EmailLayout>
          {$userType === 'SELLER' && (
            <CompanyLayout>
              <SignupInput
                id='sign-company'
                type='number'
                label='사업자 등록번호'
              />
              <SignupInput id='sign-store' label='스토어 이름' />
            </CompanyLayout>
          )}
        </Form>
      </SignStyle>
      <TermsOfService termCheck={termCheck} setTermCheck={setTermCheck} />
      <Button $disabled={disabledCheck} onClick={handleSignupSubmit}>
        가입하기
      </Button>
    </>
  );
};

const IdPwLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

const PhoneNumberLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
`;

const PhoneSelectBox = styled.ul`
  position: absolute;
  left: 0;
  width: 151px;
  height: 150px;
  margin-bottom: -160px;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 5px;
  background-color: #fff;

  li {
    padding: 10px;
    text-align: center;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: var(--footer-bg);
    }
  }
`;

const EmailLayout = styled.div`
  text-align: start;

  label:first-child {
    color: var(--gray);
  }
`;

const EmailInfoLayout = styled.div`
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
    color: var(--gray);
  }
`;

const CompanyLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  text-align: start;
`;

export default SignupForm;
