import axios from 'axios';

export const API_DRIVER = axios.create({
    baseURL: "http://localhost:8080/",
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
});

export const setAuthToken = () => {
    API_DRIVER.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('token');
}
