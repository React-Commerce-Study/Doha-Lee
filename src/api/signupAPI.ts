import URL from './URL';

type UserInput = {
  username?: string;
  password?: string;
  password2?: string;
  phone_number?: string;
  name?: string;
  company_registration_number?: string;
  store_name?: string;
};

const signupAPI = async <T extends UserInput>(userInput: T, type: string) => {
  const userTypeUrl =
    type === 'BUYER' ? 'accounts/signup/' : 'accounts/signup_seller/';

  try {
    const response = await fetch(URL + userTypeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data;
    } else if (
      Array.isArray(data?.username) ||
      Array.isArray(data?.phone_number)
    ) {
      return Array.isArray(data.username) ? data.username : data.phone_number;
    }
  } catch (error) {
    console.error('회원가입 API 에러가 발생했습니다', error);
  }
};

export default signupAPI;
