import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// TODO 제목 및 내용 길경우 고려

// interface Product {
//   product_id: number;
//   image: string;
//   product_name: string;
//   store_name: string;
//   price: number;
// }

type ProductItemProps = {
  products: Array<{
    product_id: number;
    image: string;
    product_name: string;
    store_name: string;
    price: number;
  }>;
};

const ProductItem = ({ products }: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <>
      {products &&
        products.map((item) => {
          return (
            <Card
              key={item.product_id}
              onClick={() => {
                return navigate(`/products/${item.product_id}`, {
                  state: { product: item },
                });
              }}
            >
              <div>
                <img src={item.image} alt={item.product_name} />
              </div>
              <p className='desc'>{item.store_name}</p>
              <p className='title'>{item.product_name}</p>
              <p className='price'>
                <strong>{item.price.toLocaleString()}</strong>원
              </p>
            </Card>
          );
        })}
    </>
  );
};

const Card = styled.li`
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
  }

  div {
    max-width: 380px;
    height: 380px;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .desc {
    color: var(--gray);
  }

  .title {
    font-size: 18px;
  }

  .price {
    strong {
      margin-right: 2px;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

export default ProductItem;
