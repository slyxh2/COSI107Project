import axios from "axios";
// import { refreshToken } from "./index";

let pendingRequestQueue = [];
let refreshFlag = false;

const fetcher = axios.create({
    baseURL: 'https://localhost:7070',
    withCredentials: true
});

fetcher.interceptors.response.use(
    (response) => response.data,
    (error) => error.response.data
);

// const errorHandler = async (error) => {
//     console.log(error);
//     const { config, status } = error.response;
//     if (refreshFlag) {
//         return new Promise((resolve) => {
//             pendingRequestQueue.push({ config, resolve });
//         })
//     }
//     if (status === 403 && !config.url.includes('/refresh')) {
//         refreshFlag = true;
//         const response = await refreshToken();
//         refreshFlag = false;
//         if (response && response.status === 200) {
//             while (pendingRequestQueue.length > 0) {
//                 const { config, resolve } = pendingRequestQueue.shift();
//                 resolve(fetcher(config));
//             }
//         }
//         return fetcher(config);
//     } else {
//         return Promise.reject(error);
//     }
// }

fetcher.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    let authHeader = "Bearer ";
    authHeader += access_token ? access_token : '';
    config.headers.Authorization = authHeader;
    return config;
});


export default fetcher;