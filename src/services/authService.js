import axios from "axios";
import constants from "@/src/services/constants.js";

const attemptRegister = async (username, password) => {
    const response = await axios.post(`${constants.API_URL}/register`, { username, password });
    return response
};

const attemptLogin = async (username, password) => {
    const response = await axios.post(`${constants.API_URL}/login`, { username, password });
    return response.data
};

export default { attemptRegister, attemptLogin };