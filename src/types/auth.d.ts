declare type UserData = {
  id: number,
  email: string,
  nickname: string,
  imagePath: string,
  aboutMe: string
};

declare type UserLoginInfo = {
  userInfo: UserData,
  tokens: Tokens
};

declare type Tokens = {
  yasAccessToken: string,
  yasRefreshToken: string
};

