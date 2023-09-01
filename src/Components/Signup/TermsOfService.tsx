import { SetStateAction, useState } from 'react';
import { styled } from 'styled-components';

import checkbox from '../../assets/icons/check-box.svg';
import checkFillBox from '../../assets/icons/check-fill-box.svg';

type TermsOfServiceProps = {
  termCheck?: boolean;
  setTermCheck?: React.Dispatch<SetStateAction<boolean>>;
};

const TermsOfService = ({ termCheck, setTermCheck }: TermsOfServiceProps) => {
  const handleCheckboxChange = () => {
    if (setTermCheck) {
      setTermCheck(!termCheck);
    }
  };

  return (
    <>
      <TermsOfServiceLayout htmlFor='terms'>
        <input
          type='checkbox'
          id='terms'
          className='a11y-hidden'
          checked={termCheck}
          onChange={handleCheckboxChange}
        />
        <Checkbox $isChecked={termCheck} />
        모두의 마켓의 <strong>이용약관</strong> 및{' '}
        <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
      </TermsOfServiceLayout>
    </>
  );
};

type CheckboxProps = {
  $isChecked?: boolean;
};

const Checkbox = styled.span<CheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  text-align: start;
  background: url(${(props) => (props.$isChecked ? checkFillBox : checkbox)})
    no-repeat center center/cover;
`;

const TermsOfServiceLayout = styled.label`
  display: inline-block;
  margin-bottom: 34px;
  line-height: 1.7;
  cursor: pointer;

  strong {
    font-weight: bold;
    text-decoration: underline;
  }
`;

export default TermsOfService;
