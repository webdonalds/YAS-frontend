// TODO: use google login api
const getCodeFromGoogleLogin = async () => {
  const temp = () => new Promise((resolve, _) => {
    setTimeout(()=>{
      resolve("1234")
    }, 2000)
  });
  const token: any = await temp();
  return token;
}

export {
  getCodeFromGoogleLogin,
};