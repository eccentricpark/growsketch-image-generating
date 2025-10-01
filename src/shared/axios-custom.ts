import axios from 'axios';

// GPT
export const gptClient = axios.create({
  baseURL : process.env.API_BASE_URL,
  headers : {
    "Content-Type" : "application/json"
  },
  timeout : 20000,
});

gptClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);


// Gemini
export const geminiClient = axios.create({
  baseURL : process.env.API_BASE_URL,
  headers : {
    "Content-Type" : "application/json"
  },
  timeout : 20000,
});

geminiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);