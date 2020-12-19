
const userLoginInfoKey = "userLoginInfo";


function getUserLoginInfoFromLocalStorage(): userLoginInfo | null {
    const userLoginInfoString = localStorage.getItem(userLoginInfoKey);
    if(userLoginInfoString == null) {
        return null;
    }
    const ret:userLoginInfo = JSON.parse(userLoginInfoString);
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