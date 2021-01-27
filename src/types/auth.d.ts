type UserData = {
  id: number,
  email: string,
  nickname: string,
  imagePath: string,
  aboutMe: string
};

type userLoginInfo = {
  userInfo: UserData,
  tokens: tokens
};

type tokens = {
  yasAccessToken: string,
  yasRefreshToken: string
};

