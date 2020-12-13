type userData = {
  id: number,
  email: string,
  nickname: string,
  imagePath: string,
  aboutMe: string
};

type userLoginInfo = {
  userInfo: userData,
  tokens: tokens
};

type tokens = {
  yasAccessToken: string,
  yasRefreshToken: string
};

