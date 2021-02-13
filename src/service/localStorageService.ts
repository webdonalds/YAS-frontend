const userTokenKey = "userTokenKey";

function getUserTokenFromLocalStorage(): Tokens | null {
    const userToken = localStorage.getItem(userTokenKey);
    if(userToken == null){
        return null;
    }

    const ret:Tokens = JSON.parse(userToken);
    return ret as Tokens;
}

function setUserTokenToLocalStorage(data:Tokens): void{
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