import axios from "axios";

const API_URL = "http://127.0.0.1:8080";

const attemptRegister = async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response
};

const attemptLogin = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data
};

export default { attemptRegister, attemptLogin };