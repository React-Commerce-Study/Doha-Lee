import React from 'react';
import styled from 'styled-components';
import facebook from '../../assets/icons/icon-fb.svg';
import insta from '../../assets/icons/icon-insta.svg';
import youtube from '../../assets/icons/icon-yt.svg';

const Footer = () => {
  const sns = {
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com',
    youtube: 'https://www.youtube.com',
  };

  return (
    <FooterWrap>
      <FooterStyle>
        <h2 className='a11y-hidden'>회사 정보 및 약관 정책</h2>
        <div className='footer-menu'>
          <h3 className='a11y-hidden'>약관 정책 정보</h3>
          <ul className='menu-titles'>
            <li>
              <a href='#none'>호두샵 소개</a>
            </li>
            <li>
              <a href='#none'>이용약관</a>
            </li>
            <li>
              <a href='#none'>개인정보처리방침</a>
            </li>
            <li>
              <a href='#none'>전자금융거래약관</a>
            </li>
            <li>
              <a href='#none'>청소년보호정책</a>
            </li>
            <li>
              <a href='#none'>제휴문의</a>
            </li>
          </ul>
          <div className='sns'>
            <a href={sns.instagram} target='_blank' rel='noreferrer'></a>
            <a href={sns.facebook} target='_blank' rel='noreferrer'></a>
            <a href={sns.youtube} target='_blank' rel='noreferrer'></a>
          </div>
        </div>
        <div className='corp-info'>
          <strong>(주)HODU SHOP</strong>
          <address>제주특별자치도 제주시 동광고 137 </address>
          <p>
            사업자 번호 : 000-0000-0000 <span>통신판매업</span>
          </p>
          <p>대표 : 김호두</p>
        </div>
      </FooterStyle>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  width: 100%;
  background-color: var(--footer-bg);
`;

const FooterStyle = styled.div`
  padding: 60px 0;
  max-width: 1280px;
  margin: 180px auto;

  .footer-menu {
    display: flex;
    justify-content: space-between;

    .menu-titles {
      display: flex;
      li a {
        padding: 0 14px;
        border-left: 1px solid black;
      }

      li:first-child a {
        padding: 0 14px 0 0;
        border-left: none;
      }

      li:nth-child(3) a {
        font-weight: 700;
      }

      li:last-child a {
        padding: 0 0 0 14px;
        border-right: none;
      }
    }

    .sns {
      display: flex;
      gap: 14px;

      a {
        width: 32px;
        height: 32px;
      }

      a:first-child {
        background-image: url(${insta});
      }

      a:nth-child(2) {
        background-image: url(${facebook});
      }

      a:last-child {
        background-image: url(${youtube});
      }
    }
  }

  .corp-info::before {
    content: '';
    margin: 30px 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: #c4c4c4;
  }

  .corp-info {
    display: flex;
    flex-direction: column;
    gap: 13px;
    color: var(--gray);

    strong {
      font-weight: 700;
    }

    p span {
      border-left: 1px solid var(--gray);
      padding-left: 3px;
    }
  }
`;

export default Footer;
