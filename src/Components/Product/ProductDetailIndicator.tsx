import { ReactNode, useState } from 'react';
import { css, styled } from 'styled-components';

type IndicatorProps = {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const ProductDetailIndicator = (props: IndicatorProps) => {
  const { active, children, onClick, ...rest } = props;

  return (
    <IndicatorLayout active={active} onClick={onClick} {...rest}>
      {children}
    </IndicatorLayout>
  );
};

const IndicatorLayout = styled.div<{ active: boolean }>`
  max-width: 320px;
  padding: 18px 0;
  color: var(--gray);
  font-size: 18px;
  border-bottom: 3px solid var(--border);
  cursor: pointer;
  text-align: center;

  ${(props) =>
    props.active &&
    css`
      color: var(--primary);
      border-bottom: 3px solid var(--primary);
    `}
`;

export default ProductDetailIndicator;
