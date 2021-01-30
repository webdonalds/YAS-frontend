const userTokenKey = "userTokenKey";

function getUserTokenFromLocalStorage(): tokens | null {
    const userToken = localStorage.getItem(userTokenKey);
    if(userToken == null){
        return null;
    }

    const ret:tokens = JSON.parse(userToken);
    return ret as tokens;
}

function setUserTokenToLocalStorage(data:tokens): void{
    localStorage.setItem(userTokenKey, JSON.stringify(data));
}

function deleteUserTokenInLocalStorage(): void {
    localStorage.removeItem(userTokenKey);
}


export default {
    getUserTokenFromLocalStorage,
    setUserTokenToLocalStorage,
    deleteUserTokenInLocalStorage
};