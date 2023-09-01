import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import plus from '../../assets/icons/icon-plus-line.svg';
import minus from '../../assets/icons/icon-minus-line.svg';

type ProductCountProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  stock: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ProductCount = ({
  count,
  setCount,
  handleInput,
  stock,
  setErrorMessage,
}: ProductCountProps) => {
  const inStock = stock > 0;

  const increaseCount = () => {
    if (count === stock) return;
    if (stock <= 0) {
      setErrorMessage('남은 재고가 없습니다');
      setCount(0);
    } else {
      setCount(count + 1);
      setErrorMessage('');
    }
  };

  const decreaseCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  console.log(stock);

  return (
    <CountStyle>
      {inStock ? (
        <>
          <button type='button' onClick={decreaseCount}></button>
          <input type='number' value={count} onChange={handleInput} />
          <button type='button' onClick={increaseCount}></button>
        </>
      ) : (
        <SoldOutMessage>해당 상품은 품절입니다.</SoldOutMessage>
      )}
    </CountStyle>
  );
};

const CountStyle = styled.div`
  display: flex;

  input,
  button {
    width: 50px;
    height: 50px;
    border: 1px solid var(--border);
  }

  input {
    text-align: center;
    font-size: 18px;
  }

  button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: url(${minus}) center center no-repeat;
  }

  button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: url(${plus}) center center no-repeat;
  }
`;

const SoldOutMessage = styled.span`
  font-size: 24px;
  font-weight: 700;
  padding: 30px 0;
`;

export default ProductCount;
