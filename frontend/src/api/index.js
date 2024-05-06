import fetcher from "./fetcher";

export const postLogin = (username, password) => {
    return fetcher.post('/login', {
        username,
        password
    })
};

export const getCheckAuth = () => {
    return fetcher.get('/check');
}
