// import {API_CONFIG} from "../config.ts";
// import {MenuData} from "./types/MenuData.ts";

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient