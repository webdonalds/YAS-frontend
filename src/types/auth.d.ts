type UserData = {
  id: number,
  email: string,
  nickname: string,
  imageFile: string | null,
  aboutMe: string
};

type UserLoginInfo = {
  userInfo: UserData,
  tokens: Tokens
};

type Tokens = {
  yasAccessToken: string,
  yasRefreshToken: string
};

