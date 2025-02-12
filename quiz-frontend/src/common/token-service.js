const TOKEN_KEY = "token";

const getToken = () => {
    return window.localStorage.getItem(TOKEN_KEY);
};

const saveToken = token => {
    window.localStorage.setItem(TOKEN_KEY, token);
};

const destroyToken = () => {
    window.localStorage.removeItem(TOKEN_KEY);
};

export default {
    getToken,
    saveToken,
    destroyToken
};