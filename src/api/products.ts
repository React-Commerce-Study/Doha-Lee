import URL from './URL';

const getProducts = async (page: number) => {
  try {
    const data = await fetch(`${URL}/products?page=${page}`);
    if (!data.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const productsData = await data.json();
    return productsData;
  } catch (error) {
    console.error('에러가 발생했습니다', error);
  }
};

export default getProducts;
