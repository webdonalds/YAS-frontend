

function getUserLoginInfoFromLocalStorage(): userLoginInfo {
    const ret:userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
    return ret as userLoginInfo;
}

function setUserLoginInfoToLocalStorage(data:userLoginInfo): void{
    localStorage.setItem("userLoginInfo", JSON.stringify(data));
}


export default {
    getUserLoginInfoFromLocalStorage,
    setUserLoginInfoToLocalStorage
};