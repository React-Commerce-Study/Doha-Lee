import URL from './URL';

const loginAPI = async (userInput: {
  username: string;
  password: string;
  login_type: string;
}) => {
  try {
    const response = await fetch(`${URL}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    });

    const accountData = await response.json();

    if (response.ok) {
      return accountData;
    } else {
      throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    console.error('Account API 에러가 발생했습니다', error);
    throw error;
  }
};

export default loginAPI;
