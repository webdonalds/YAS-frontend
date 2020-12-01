type userData = {
  id: number,
  email: string,
  nickname: string,
  imagePath: string,
  aboutMe: string,
};

type userLoginInfo = {
  userInfo: userData,
  token: string
};

type tokenData = {
  yasToken: string,
  yasSecretKey: string,
  expireTime: number,
};

