
const userLoginInfoKey = "userLoginInfo";


function getUserLoginInfoFromLocalStorage(): userLoginInfo {
    const ret:userLoginInfo = JSON.parse(localStorage.getItem(userLoginInfoKey) || '{}');
    return ret as userLoginInfo;
}

function setUserLoginInfoToLocalStorage(data:userLoginInfo): void{
    localStorage.setItem(userLoginInfoKey, JSON.stringify(data));
}

function eraseUserLoginInfoInLocalStorage(): void {
    localStorage.removeItem(userLoginInfoKey);
}


export default {
    getUserLoginInfoFromLocalStorage,
    setUserLoginInfoToLocalStorage,
    eraseUserLoginInfoInLocalStorage
};