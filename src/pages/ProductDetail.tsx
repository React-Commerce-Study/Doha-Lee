import React, { useState } from 'react';
import Nav from '../Components/common/Nav';
import Footer from '../Components/common/Footer';
import styled from 'styled-components';
import ProductDetailDesc from '../Components/Product/ProductDetailDesc';
import ProductDetailIndicator from '../Components/Product/ProductDetailIndicator';

const ProductDetail = () => {
  const [activeIndicator, setActiveIndicator] = useState('버튼');

  const indicators = [
    { label: '버튼', value: '버튼' },
    { label: '리뷰', value: '리뷰' },
    { label: 'Q&A', value: 'Q&A' },
    { label: '반품/교환정보', value: '반품/교환정보' },
  ];

  const handleClickIndicator = (indicator: string) => {
    setActiveIndicator(indicator);
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <ProductDescLayout>
        <ProductDetailDesc />
        <ProductDetailLayout>
          {indicators.map((indicator) => (
            <ProductDetailIndicator
              key={indicator.value}
              active={activeIndicator === indicator.value}
              onClick={() => handleClickIndicator(indicator.value)}
            >
              {indicator.value}
            </ProductDetailIndicator>
          ))}
        </ProductDetailLayout>
      </ProductDescLayout>
      <Footer />
    </>
  );
};

const ProductDescLayout = styled.main`
  max-width: 1280px;
  margin: 80px auto;
`;

const ProductDetailLayout = styled.section`
  max-width: 1280px;
  margin: 140px 0;
  display: flex;

  div {
    flex-grow: 1;
  }
`;

export default ProductDetail;
